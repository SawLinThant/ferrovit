import { NextResponse } from 'next/server';


interface ViberMessage {
  to: string;
  requestID?: string;
  scheduled?: string;
  templateId: string;
  useUnicode?: 0 | 1 | 2;
  templateData: Record<string, any>;
}

interface ViberRequest {
  from: string;
  type: 1 | 2; 
  serviceType: 2; 
  messages: ViberMessage[];
}

interface ViberResponseMessage {
  errorCode: string;
  errorMessage: string;
  referentId: string;
  to: string;
  requestId: string;
  scheduled: string;
  templateId: string;
  useUnicode: number;
  templateData: Record<string, any>;
}

interface ViberResponse {
  messages: ViberResponseMessage[];
  account: string;
  errorCode: string;
  errorMessage: string;
  referentId: string;
  from: string;
  type: number;
  serviceType: number;
}

interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
  referentId?: string | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_VIBER_OTT_BASE_URL || 'https://api-ott.vmgmyanmar.com/api/ott';
const TOKEN = process.env.NEXT_PUBLIC_VIBER_OTT_TOKEN || '';

const validateRequest = (body: Partial<ViberRequest>): string[] => {
  const errors: string[] = [];
  
  if (!body.from || typeof body.from !== 'string') {
    errors.push('Brandname (from) is required and must be a string');
  }
  
  if (![1, 2].includes(body.type || 0)) {
    errors.push('Type must be 1 (Customer care) or 2 (Ads)');
  }
  
  if (body.serviceType !== 2) {
    errors.push('serviceType must be 2 for Viber');
  }
  
  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    errors.push('Messages array is required and must not be empty');
  }
  
  body.messages?.forEach((msg, index) => {
    if (!msg.to || typeof msg.to !== 'string') {
      errors.push(`Message[${index}].to is required and must be a string`);
    }
    
    if (msg.requestID && (typeof msg.requestID !== 'string' || msg.requestID.length > 150)) {
      errors.push(`Message[${index}].requestID must be a string less than 150 characters`);
    }
    
    if (!msg.templateId || typeof msg.templateId !== 'string' || msg.templateId.length > 150) {
      errors.push(`Message[${index}].templateId is required and must be a string less than 150 characters`);
    }
    
    if (msg.useUnicode !== undefined && ![0, 1, 2].includes(msg.useUnicode)) {
      errors.push(`Message[${index}].useUnicode must be 0, 1, or 2`);
    }
    
    if (!msg.templateData || typeof msg.templateData !== 'object') {
      errors.push(`Message[${index}].templateData is required and must be an object`);
    }
    
    // Validate templateData based on templateId
    const templateParts = msg.templateId.split('_');
    const templateType = templateParts[0]; 
    const templateSubType = templateParts[1]; 
    
    if (!['1', '2'].includes(templateType) || !['1', '2', '3', '4'].includes(templateSubType)) {
      errors.push(`Message[${index}].templateId must be in format [1|2]_[1|2|3|4]`);
    }
    
    const requiredFields: Record<string, string[]> = {
      '1_1': ['img'],
      '1_2': ['txt'],
      '1_3': ['txt', 'caption', 'action'],
      '1_4': ['txt', 'caption', 'action', 'img'],
      '2_1': ['img'],
      '2_2': ['txt'],
      '2_3': ['txt', 'caption', 'action'],
      '2_4': ['txt', 'caption', 'action', 'img'],
    };
    
    const required = requiredFields[msg.templateId] || [];
    required.forEach(field => {
      if (!(field in msg.templateData)) {
        errors.push(`Message[${index}].templateData must include ${field} for templateId ${msg.templateId}`);
      }
    });
  });
  
  return errors;
};

export async function POST(request: Request): Promise<NextResponse<ViberResponse | ErrorResponse>> {
  try {
    const body = await request.json() as ViberRequest;

    const validationErrors = validateRequest(body);
    if (validationErrors.length > 0) {
      return NextResponse.json({
        errorCode: '400',
        errorMessage: validationErrors.join('; '),
      }, { status: 400 });
    }

    const payload: ViberRequest = {
      from: body.from,
      type: body.type,
      serviceType: 2,
      messages: body.messages.map(msg => ({
        to: msg.to,
        requestID: msg.requestID || '',
        scheduled: msg.scheduled || '',
        templateId: msg.templateId,
        useUnicode: msg.useUnicode ?? 0,
        templateData: msg.templateData,
      })),
    };

    const response = await fetch(`${BASE_URL}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'token': TOKEN,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Viber OTT API responded with status: ${response.status}`);
    }

    const data = await response.json() as ViberResponse;
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error sending Viber message:', error);
    return NextResponse.json({
      errorCode: '500',
      errorMessage: error instanceof Error ? `Internal server error: ${error.message}` : 'Internal server error',
      referentId: null,
    }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: 'This endpoint only supports POST requests for sending Viber OTT messages',
    documentation: 'See API documentation for request format',
  });
}