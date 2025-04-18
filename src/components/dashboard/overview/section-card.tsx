import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { QuizUser } from "@/entities/quiz_users.entity"
import { getLastMonthDateRange } from "@/lib/utils"

interface SectionCardsProps {
  quizUsers: QuizUser[]
}

export function SectionCards(quizUsers: SectionCardsProps) {
  const usersWithResults = quizUsers.quizUsers.filter(user => user.results && user.results.length > 0);
  const usersWithoutResults = quizUsers.quizUsers.filter(user => !user.results || user.results.length === 0);

  const totalUsers = quizUsers.quizUsers.length;
  const percentageWithResults = totalUsers > 0 ? ((usersWithResults.length / totalUsers) * 100).toFixed(1) : 0;
  const percentageWithoutResults = totalUsers > 0 ? ((usersWithoutResults.length / totalUsers) * 100).toFixed(1) : 0;

  const { start, end } = getLastMonthDateRange();
  const lastMonthParticipants = quizUsers.quizUsers.filter(user => {
    const createdAt = new Date(user.created_at);
    return createdAt >= start && createdAt < end;
  }).length;

  const isTrendingUp = quizUsers.quizUsers.length > lastMonthParticipants;
  const trendPercentage = lastMonthParticipants > 0 
    ? ((quizUsers.quizUsers.length - lastMonthParticipants) / lastMonthParticipants * 100).toFixed(1) 
    : quizUsers.quizUsers.length > 0 ? 100 : 0;
  
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total participants</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {totalUsers}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {isTrendingUp ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
              {trendPercentage}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {isTrendingUp ? "Trending up this month" : "Trending down this month"}
            {isTrendingUp ? <TrendingUpIcon className="size-4" /> : <TrendingDownIcon className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            Visitors of all times
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Complete quiz participants</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {usersWithResults.length}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {percentageWithResults}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div> */}
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Incomplete quiz participants</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {usersWithoutResults.length}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {percentageWithoutResults}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div> */}
        </CardFooter>
      </Card>
    </div>
  )
}
