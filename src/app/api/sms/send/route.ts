import { NextResponse } from 'next/server';

interface SMSRequest {
  to: string;
  type: 1; 
  from: string;
  message: string;
  scheduled?: string;
  requestId?: string;
  useUnicode?: 0 | 1 | 2;
  ext?: Record<string, any>;
}

interface SMSResponse {
  sendMessage: {
    to: string;
    telco: string;
    type: number;
    from: string;
    message: string;
    scheduled: string;
    requestId: string;
    useUnicode: number;
    ext: Record<string, any>;
  };
  msgLength: number;
  mtCount: number;
  account: string;
  errorCode: string;
  errorMessage: string;
  referentId: string;
}

interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
  referentId?: string | null;
}


const BASE_URL = process.env.VIBER_BASE_URL || '{URL Base}';
const TOKEN = process.env.VIBER_API_TOKEN || '';

const validateRequest = (body: Partial<SMSRequest>): string[] => {
  const errors: string[] = [];
  
  if (!body.to || typeof body.to !== 'string') {
    errors.push('Receiver phone number (to) is required and must be a string');
  }
  
  if (!body.from || typeof body.from !== 'string' || body.from.length > 150) {
    errors.push('Sender (from) is required and must be a string less than 150 characters');
  }
  
  if (!body.message || typeof body.message !== 'string') {
    errors.push('Message content is required and must be a string');
  }
  
  if (body.type !== 1) {
    errors.push('Type must be 1 for customer care messages');
  }
  
  if (body.useUnicode !== undefined && ![0, 1, 2].includes(body.useUnicode)) {
    errors.push('useUnicode must be 0, 1, or 2');
  }
  
  if (body.requestId && (typeof body.requestId !== 'string' || body.requestId.length > 150)) {
    errors.push('requestId must be a string less than 150 characters');
  }

  return errors;
};

export async function POST(request: Request): Promise<NextResponse<SMSResponse | ErrorResponse>> {
  try {
    const body = await request.json() as SMSRequest;

    const validationErrors = validateRequest(body);
    if (validationErrors.length > 0) {
      return NextResponse.json({
        errorCode: '400',
        errorMessage: validationErrors.join('; '),
      }, { status: 400 });
    }

    const payload: SMSRequest = {
      to: body.to,
      type: 1,
      from: body.from,
      message: body.message,
      scheduled: body.scheduled || '',
      requestId: body.requestId || '',
      useUnicode: body.useUnicode ?? 0,
      ext: body.ext || {},
    };

    const response = await fetch(`${BASE_URL}/SMSBrandname/SendSMS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'token': TOKEN,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Viber API responded with status: ${response.status}`);
    }

    const data = await response.json() as SMSResponse;
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error sending SMS:', error);
    return NextResponse.json({
      errorCode: '500',
      errorMessage: error instanceof Error ? `Internal server error: ${error.message}` : 'Internal server error',
      referentId: null,
    }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: 'This endpoint only supports POST requests for sending SMS',
    documentation: 'See API documentation for request format',
  });
}