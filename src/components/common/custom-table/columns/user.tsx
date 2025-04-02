"use client"

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "../action-button";
import { QuizUser } from "@/entities/quiz_users.entity";

export const QuizUserColumns: ColumnDef<QuizUser>[] = [
  {
    accessorKey: "phone",
    header: () => <div className="text-left">Phone</div>,
    cell: ({ row }) => {
      return (
        <span className="">
          {row.original.phone}
        </span>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-left">Date</div>,
    cell: ({ row }) => {
      return (
        <span className="">{row.original.created_at.toLocaleString()}</span>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      return (
        <ActionButton
          route={`/dashboard/quiz-users`}
          id={row.getValue("id")}
        />
      );
    },
  },
];
