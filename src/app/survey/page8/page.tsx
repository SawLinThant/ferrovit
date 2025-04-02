import SurveyLayout from "@/components/survey/SurveyLayout";
import QuestionForm from "@/components/survey/QuestionForm";
import { redirect } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { client } from "@/graphql/client";
import { QuestionRepository } from "@/services/questions/questions.repository";
import { QuestionService } from "@/services/questions/questions.service";
import { UserResponseRepository } from "@/services/user-responses/user_responses.repository";
import { UserResponseService } from "@/services/user-responses/user_responses.service";

const questionRepository = new QuestionRepository(client);
const questionService = new QuestionService(questionRepository);
const userResponseRepository = new UserResponseRepository(client);
const userResponseService = new UserResponseService(userResponseRepository);

type SearchParamsType = Promise<{ quiz_user_id?: string }>;

export default async function SurveyPage8({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const resolvedSearchParams = await searchParams;
  const quizUserId = resolvedSearchParams.quiz_user_id;
  const question = await questionService.getQuestionByQuestionNo("7");
  const choices = question?.choices;

  async function handleSubmit(formData: FormData) {
    "use server";
    const selectedChoiceId = formData.get("choice") as string;
    if (question && selectedChoiceId) {
      try {
       const response = await userResponseService.updateOrCreateUserResponse(
          quizUserId || "",
          question.id,
          selectedChoiceId
        );
        console.log("response",response);
      } catch (error) {
        console.error("Error processing user response:", error);
      }
    }
    
   // redirect(`/survey/results?quiz_user_id=${quizUserId}`);
  }

  const options =
    choices?.map((choice) => ({
      value: choice.id,
      label: choice.choice_text,
    })) || [];

  return (
    <Layout>
      <SurveyLayout
        isPersonalInfo={false}
        previousLink={`/survey/page7?quiz_user_id=${quizUserId}`}
        previousText="Previous Question"
        title=""
        description=""
        onSubmit={handleSubmit}
      >
        <QuestionForm
          questionNumber={7}
          totalQuestions={7}
          question={question?.question_text}
          options={options}
          onSubmit={handleSubmit}
        />
      </SurveyLayout>
    </Layout>
  );
}
