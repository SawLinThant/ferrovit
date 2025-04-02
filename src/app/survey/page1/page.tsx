import SurveyLayout from "@/components/survey/SurveyLayout";
import PersonalInfoForm from "@/components/survey/PersonalInfoForm";
import { redirect } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { QuizUserRepository } from "@/services/quiz-user/quiz_users.repository";
import { client } from "@/graphql/client";
import { QuizUserService } from "@/services/quiz-user/quiz_users.service";
import { Suspense } from "react";


function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F12E2A]"></div>
    </div>
  );
}

const quizUserRepository = new QuizUserRepository(client);
const quizUserService = new QuizUserService(quizUserRepository);

export default function SurveyPage1() {
  async function handleSubmit(formData: FormData) {
    "use server";

    console.log(Object.fromEntries(formData));
    const phone = formData.get("phone") as string;
    const township = formData.get("township") as string;
    const quizUser = await quizUserService.createQuizUser({
      phone,
      address: township,
    });
    console.log(quizUser);
    redirect(`/survey/page2?quiz_user_id=${quizUser.id}`);
  }

  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}></Suspense>
      <SurveyLayout
        isPersonalInfo={true}
        previousLink="/"
        previousText=""
        title="Anemia Test"
        description="အမျိုးသမီးတို့သတိထားသင့်တဲ့ သံဓာတ်အားနည်းခြင်းရှိ၊ မရှိကို သိရှိနိုင်ဖို့ ဒီစစ်တမ်းလေးကို ဖြေဆိုကြည့်ပါ။ သင့်ရမှတ်ပေါ်မူတည်ပြီး လက်တွေ့စစ်ဆေးမှုပြုလုပ်ရန် လို၊ မလို အကြံပြုချက်တွေကို ရယူနိုင်ပါတယ်။"
      >
        <PersonalInfoForm onSubmit={handleSubmit} />
      </SurveyLayout>
    </Layout>
  );
}
