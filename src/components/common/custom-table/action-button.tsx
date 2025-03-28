"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ActionButtonProps {
    id: string
    route: string
}

const ActionButton = ({id,route}:ActionButtonProps) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`${route}/${id}`);
  };

  return (
    <div className="flex items-center justify-center">
      <Button
      variant="outline"
        onClick={handleEdit}
        className="bg-transparent border-none shadow-none text-blue-500 underline hover:text-blue-400 hover:cursor-pointer hover:bg-transparent"
      >
        Details
      </Button>
    </div>
  );
};

export default ActionButton
