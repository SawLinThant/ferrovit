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

const BASE_URL = process.env.VIBER_BASE_URL || 'http://api.vmgmyanmar.com/api';
const TOKEN = process.env.NEXT_PUBLIC_VIBER_SMS_TOKEN || '';

const validateRequest = (body: Partial<SMSRequest>): string[] => {
  const errors: string[] = [];

  console.log("Validating SMS request body:", JSON.stringify(body, null, 2));

  if (!body.to || typeof body.to !== 'string') {
    errors.push('Receiver phone number (to) is required and must be a string');
  } else if (!/^09[0-9]{8}$/.test(body.to)) {
    errors.push('Phone number (to) must be in format 09xxxxxxxx');
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

  if (body.scheduled && !/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}( \+\d{2}:\d{2})?$/.test(body.scheduled)) {
    errors.push('Scheduled must be in format dd-MM-yyyy HH:mm or dd-MM-yyyy HH:mm +HH:mm');
  }

  if (body.requestId && (typeof body.requestId !== 'string' || body.requestId.length > 150)) {
    errors.push('requestId must be a string less than 150 characters');
  }

  if (body.useUnicode !== undefined && ![0, 1, 2].includes(body.useUnicode)) {
    errors.push('useUnicode must be 0, 1, or 2');
  }

  return errors;
};

export async function POST(request: Request): Promise<NextResponse<SMSResponse | ErrorResponse>> {
  try {
    const body = await request.json() as SMSRequest;

    // const validationErrors = validateRequest(body);
    // if (validationErrors.length > 0) {
    //   console.log("Validation errors:", validationErrors);
    //   return NextResponse.json({
    //     errorCode: '400',
    //     errorMessage: validationErrors.join('; '),
    //   }, { status: 400 });
    // }
    // if(!validationErrors){
    //   console.log("No validation errors found.");
    // }

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

    console.log('SMS external payload:', JSON.stringify(payload, null, 2));
    const response = await fetch(`${BASE_URL}/SMSBrandname/SendSMS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'token': TOKEN,
      },
      body: JSON.stringify(payload),
    });
    console.log("response",response)
    const responseData = await response.json();
    console.log('SMS external API response:', JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      console.error('SMS API error:', responseData);
      return NextResponse.json({
        errorCode: responseData.errorCode || '500',
        errorMessage: responseData.errorMessage || `SMS Brandname API responded with status: ${response.status}`,
        referentId: responseData.referentId || null,
      }, { status: response.status });
    }

    const data = responseData as SMSResponse;
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