import { notFound } from "next/navigation";
import Dashboard from "@/components/layout/Dashboard";
import { getServerApolloClient } from "@/graphql/client";
import { QuizUserRepository } from "@/services/quiz-user/quiz_users.repository";
import { QuizUserService } from "@/services/quiz-user/quiz_users.service";
import { getServerAuthToken } from "@/lib/server/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuizUserDetail({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const authToken = await getServerAuthToken();
    const client = await getServerApolloClient({ authToken });
    const quizUserRepository = new QuizUserRepository(client);
    const quizUserService = new QuizUserService(quizUserRepository);

    const quizUser = await quizUserService.getQuizUserById(resolvedParams.id);

    if (!quizUser) {
      notFound();
    }

    return (
      <Dashboard title="Quiz-Users" breadcrumb="Detail">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Quiz User Details</h2>
            <Link href="/dashboard/quiz-users">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to List
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                  <p className="text-lg">{quizUser.phone}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                  <p className="text-lg">{quizUser.address}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                  <p className="text-lg">
                    {format(new Date(quizUser.created_at), "PPP")}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                  <p className="text-lg">
                    {format(new Date(quizUser.created_at), "PPP")}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Points</h3>
                  <p className="text-lg">{quizUser.results[0]?.total_points || "not completed the quiz"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Health Status</h3>
                  <p className="text-lg">{quizUser.results[0]?.health_status || "not completed the quiz"}</p>
                </div>
              </div>

              {/* <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge variant={quizUser.is_active ? "default" : "destructive"}>
                  {quizUser.is_active ? "Active" : "Inactive"}
                </Badge>
              </div> */}
            </CardContent>
          </Card>

          {/* Additional sections can be added here */}
        </div>
      </Dashboard>
    );
  } catch (error) {
    console.error("Error fetching quiz user details:", error);
    throw new Error("Failed to load quiz user details");
  }
} 