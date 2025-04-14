// "use client";

// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// interface ApiResponse {
//   errorCode: string;
//   errorMessage: string;
// }

// interface ResultButtonsProps {
//   phone: string;
//   message: string;
//   quizUserId: string;
// }

// export default function ResultButtons({
//   phone,
//   message,
//   quizUserId,
// }: ResultButtonsProps) {
//   const [smsStatus, setSmsStatus] = useState<string | null>(null);
//   const [viberStatus, setViberStatus] = useState<string | null>(null);

//   const sendSMS = async () => {
//     try {
//       const response = await fetch("/api/sms/send", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           to: phone,
//           from: "Ferrovit Myanmar", 
//           message: message,
//           type: 1, 
//           scheduled: "",
//           requestId: `quiz-${quizUserId}`,
//           useUnicode: 0,
//           ext: {},
//         }),
//       });

//       const result: ApiResponse = await response.json();
//       if (response.ok && result.errorCode === "000") {
//         setSmsStatus("SMS sent successfully!");
//       } else {
//         setSmsStatus(`SMS failed: ${result.errorMessage}`);
//       }
//     } catch (error) {
//       setSmsStatus(
//         `SMS error: ${error instanceof Error ? error.message : "Unknown error"}`
//       );
//     }
//   };

//   const sendViber = async () => {
//     try {
//       const response = await fetch("/api/viber/send", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           from: "Ferrovit Myanmar", 
//           type: 1, 
//           serviceType: 2, 
//           messages: [
//             {
//               to: phone,
//               requestID: `quiz-${quizUserId}`,
//               scheduled: "",
//               templateId: "1_2", 
//               useUnicode: 0,
//               templateData: {
//                 txt: message,
//               },
//             },
//           ],
//         }),
//       });

//       const result: ApiResponse = await response.json();
//       if (response.ok && result.errorCode === "000") {
//         setViberStatus("Viber message sent successfully!");
//       } else {
//         setViberStatus(`Viber failed: ${result.errorMessage}`);
//       }
//     } catch (error) {
//       setViberStatus(
//         `Viber error: ${error instanceof Error ? error.message : "Unknown error"}`
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 mt-4">
//       <Button className="bg-[#F12E2A]" onClick={sendViber}>
//         Receive with Viber
//       </Button>
//       {viberStatus && <p className="text-sm">{viberStatus}</p>}
//       <Button className="bg-[#F12E2A]" onClick={sendSMS}>
//         Receive with SMS
//       </Button>
//       {smsStatus && <p className="text-sm">{smsStatus}</p>}
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

// Define types for API responses
interface ApiResponse {
  errorCode: string;
  errorMessage: string;
  messages?: Array<{
    errorCode: string;
    errorMessage: string;
  }>;
}

interface ResultButtonsProps {
  phone: string;
  message: string;
  quizUserId: string;
}

export default function ResultButtons({
  phone,
  message,
  quizUserId,
}: ResultButtonsProps) {
  const [smsStatus, setSmsStatus] = useState<string | null>(null);
  const [viberStatus, setViberStatus] = useState<string | null>(null);

  // Validate message
  const validateMessage = (msg: string): boolean => {
    return !!msg && msg.length > 0 && msg.length <= 1000;
  };

  // Generate unique requestID
  const generateRequestId = (prefix: string): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}-${quizUserId}-${timestamp}-${random}`;
  };

  const sendSMS = async () => {
    try {
      if (!validateMessage(message)) {
        setSmsStatus("Message is empty or too long");
        return;
      }

      // Normalize phone for SMS: +959xxxxxxxx → 09xxxxxxxx
      let normalizedPhone = phone;
      if (phone.startsWith('+959')) {
        normalizedPhone = '0' + phone.slice(3);
      } else if (phone.startsWith('959')) {
        normalizedPhone = '0' + phone.slice(2);
      }

      const payload = {
        to: normalizedPhone,
        from: "peachsms",
        message: message,
        type: 1,
        scheduled: "",
        requestId: generateRequestId("quiz"),
        useUnicode: 0,
        ext: {},
      };

      console.log("SMS payload:", JSON.stringify(payload, null, 2));

      const response = await fetch("/api/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: ApiResponse = await response.json();
      if (response.ok && result.errorCode === "000") {
        setSmsStatus("SMS sent successfully!");
      } else {
        setSmsStatus(`SMS failed: ${result.errorMessage}`);
      }
    } catch (error) {
      setSmsStatus(
        `SMS error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const sendViber = async () => {
    try {
      if (!validateMessage(message)) {
        setViberStatus("Message is empty or too long");
        return;
      }

      let normalizedPhone = phone;
      if (phone.startsWith('09')) {
        normalizedPhone = '+95' + phone.slice(1);
      } else if (!phone.startsWith('+')) {
        normalizedPhone = '+' + phone;
      }

      const payload = {
        from: "peach",
        type: 1,
        serviceType: 2,
        messages: [
          {
            to: normalizedPhone,
            requestID: generateRequestId("quiz"),
            scheduled: "",
            templateId: "1_2",
            useUnicode: 0,
            templateData: {
              txt: message,
            },
          },
        ],
      };

      console.log("Viber payload:", JSON.stringify(payload, null, 2));

      const response = await fetch("/api/viber/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: ApiResponse = await response.json();
      if (response.ok && result.errorCode === "000") {
        setViberStatus("Viber message sent successfully!");
      } else {
        const messageError = result.messages?.[0]?.errorMessage || result.errorMessage;
        if (result.messages?.[0]?.errorCode === "304") {
          setViberStatus(
            "Viber message was not sent: A similar message was recently sent. Please try again later."
          );
        } else {
          setViberStatus(`Viber failed: ${messageError}`);
        }
      }
    } catch (error) {
      setViberStatus(
        `Viber error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <Button className="bg-[#F12E2A]" onClick={sendViber}>
        Receive with Viber
      </Button>
      {viberStatus && <p className="text-sm">{viberStatus}</p>}
      <Button className="bg-[#F12E2A]" onClick={sendSMS}>
        Receive with SMS
      </Button>
      {smsStatus && <p className="text-sm">{smsStatus}</p>}
      <Link href="/" className="text-blue-500 underline text-sm">Back to home</Link>
    </div>
  );
}