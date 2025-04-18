import { ChartAreaInteractive } from "@/components/dashboard/overview/chart-area";
import { SectionCards } from "@/components/dashboard/overview/section-card";
import Dashboard from "@/components/layout/Dashboard";
import { client } from "@/graphql/client";
import { QuizUserRepository } from "@/services/quiz-user/quiz_users.repository";
import { QuizUserService } from "@/services/quiz-user/quiz_users.service";

export default async function QuizUsers() {
   const quizUserRepository = new QuizUserRepository(client);
    const quizUserService = new QuizUserService(quizUserRepository);
    const quizUsers = await quizUserService.getAllQuizUsers();

  return (
    <Dashboard title="Blog" breadcrumb="blog list">
      <h2 className="text-2xl font-bold mb-6">overview</h2>
      <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards quizUsers={quizUsers}/>
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive quizUsers={quizUsers} />
              </div>
            </div>
          </div>
        </div>
    </Dashboard>
  );
}
