import SurveyLayout from "@/components/survey/SurveyLayout";
import QuestionForm from "@/components/survey/QuestionForm";
import { redirect } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { client } from "@/graphql/client";
import { QuestionRepository } from "@/services/questions/questions.repository";
import { QuestionService } from "@/services/questions/questions.service";
import { Suspense } from "react";
import { UserResponseRepository } from "@/services/user-responses/user_responses.repository";
import { UserResponseService } from "@/services/user-responses/user_responses.service";

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F12E2A]"></div>
    </div>
  );
}

const questionRepository = new QuestionRepository(client);
const questionService = new QuestionService(questionRepository);
const userResponseRepository = new UserResponseRepository(client);
const userResponseService = new UserResponseService(userResponseRepository);

type SearchParamsType = Promise<{ quiz_user_id?: string }>;

export default async function SurveyPage2({ searchParams }: { searchParams: SearchParamsType }) {
  const resolvedSearchParams = await searchParams;
  const quizUserId = resolvedSearchParams.quiz_user_id;
  const question = await questionService.getQuestionByQuestionNo("1");
  const choices = question?.choices;

  async function handleSubmit(formData: FormData) {
    "use server";
     console.log("function called");
    const selectedChoiceId = formData.get("choice") as string;
    console.log("selectedChoiceId",selectedChoiceId);
    if (question && selectedChoiceId) {
      try {
       
        await userResponseService.updateOrCreateUserResponse(
          quizUserId || "",
          question.id,
          selectedChoiceId
        );
      } catch (error) {
        console.error("Error processing user response:", error);
      }
    }

    redirect(`/survey/page3?quiz_user_id=${quizUserId}`);
  }

  const options = choices?.map(choice => ({
    value: choice.id,
    label: choice.choice_text,
  })) || [];

  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}></Suspense>
      <SurveyLayout
        isPersonalInfo={false}
        previousLink="/survey/page1"
        previousText="Previous Question"
        title=""
        description=""
      >
        <QuestionForm
          questionNumber={1}
          totalQuestions={7}
          question={question?.question_text}
          options={options}
          onSubmit={handleSubmit}
        />
      </SurveyLayout>
    </Layout>
  );
}
