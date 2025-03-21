import SurveyLayout from '@/components/survey/SurveyLayout';
import QuestionForm from '@/components/survey/QuestionForm';
import { redirect } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { QuestionRepository } from '@/services/questions/questions.repository';
import { QuestionService } from '@/services/questions/questions.service';
import { client } from '@/graphql/client';
import { UserResponseRepository } from '@/services/user-responses/user_responses.repository';
import { UserResponseService } from '@/services/user-responses/user_responses.service';

const questionRepository = new QuestionRepository(client);
const questionService = new QuestionService(questionRepository);
const userResponseRepository = new UserResponseRepository(client);
const userResponseService = new UserResponseService(userResponseRepository);

type SearchParamsType = Promise<{ quiz_user_id?: string }>;

export default async function SurveyPage3({ searchParams }: { searchParams: SearchParamsType }) {
  const resolvedSearchParams = await searchParams;
  const quizUserId = resolvedSearchParams.quiz_user_id;
  const question = await questionService.getQuestionByQuestionNo("2");
  const choices = question?.choices;

  async function handleSubmit(formData: FormData) {
    'use server';
    
    const selectedChoiceId = formData.get("choice") as string;
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
    
    redirect(`/survey/page4?quiz_user_id=${quizUserId}`);
  }

  const options = choices?.map(choice => ({
    value: choice.id,
    label: choice.choice_text,
  })) || [];

  return (
    <Layout>
      <SurveyLayout
        isPersonalInfo={false}
        previousLink={`/survey/page2?quiz_user_id=${quizUserId}`}
        previousText="Previous Question"
        title=""
        description=""
        onSubmit={handleSubmit}
      >
        <QuestionForm
          questionNumber={2}
          totalQuestions={7}
          question={question?.question_text}
          options={options}
          onSubmit={handleSubmit}
        />
      </SurveyLayout>
    </Layout>
  );
} 