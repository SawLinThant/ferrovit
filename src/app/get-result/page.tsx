// app/result/page.tsx (or wherever GetResult is located)
import { QuizUserRepository } from "@/services/quiz-user/quiz_users.repository";
import { QuizUserService } from "@/services/quiz-user/quiz_users.service";
import { client } from "@/graphql/client";
import ResultButtons from "@/components/common/custom-table/result-button";

type SearchParamsType = Promise<{ quiz_user_id?: string }>;

export default async function GetResult({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const resolvedSearchParams = await searchParams;
  const quizUserRepository = new QuizUserRepository(client);
  const quizUserService = new QuizUserService(quizUserRepository);
  const quizUser = await quizUserService.getQuizUserById(
    resolvedSearchParams.quiz_user_id || ""
  );
  const score = quizUser.results?.[0].total_points;
  const health_status = quizUser.results?.[0].health_status;
  const phone = quizUser.phone;
  const message = `Your score is ${score}. Your health is ${health_status}`;

  return (
    <main className="flex items-center justify-center min-h-screen w-screen">
      <div className="container flex flex-col items-center">
        <h1 className="text-3xl font-semibold">
          Thank You For Taking the Quiz.
        </h1>
        <h3 className="mt-8">Get your result here</h3>
        {phone ? (
          <ResultButtons
            phone={phone}
            message={message}
            quizUserId={resolvedSearchParams.quiz_user_id || "unknown"}
          />
        ) : (
          <p className="mt-4 text-red-500">
            No phone number available to send results.
          </p>
        )}
      </div>
    </main>
  );
}