"use client"

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "../action-button";
import { ClinicAddress } from "@/entities/clinic_addresses.entity";

export const AddressColumns: ColumnDef<ClinicAddress>[] = [
  {
    accessorKey: "aurthor",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => {
      return (
        <span className="">
          {row.original.name}
        </span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-left">Phone</div>,
    cell: ({ row }) => {
      return (
        <span className="">{row.original.phone}</span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-left">Address</div>,
    cell: ({ row }) => {
      return (
        <span className="">{row.original.address}</span>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      return (
        <ActionButton
          route={`/dashboard/clinic`}
          id={row.getValue("id")}
        />
      );
    },
  },
];
