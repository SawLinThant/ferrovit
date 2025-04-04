"use client"

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "../action-button";
import { Blog } from "@/entities/blogs.entity";

export const BlogColumns: ColumnDef<Blog>[] = [
  {
    accessorKey: "aurthor",
    header: () => <div className="text-left">Aurthor</div>,
    cell: ({ row }) => {
      return (
        <span className="">
          {row.original.author}
        </span>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
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
          route={`/dashboard/blog`}
          id={row.getValue("id")}
        />
      );
    },
  },
];
