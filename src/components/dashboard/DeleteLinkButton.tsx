'use client';

import { Link } from "../../../generated/prisma/client";
import { TrashIcon } from "../icons/TrashIcon";
import { deleteLinkAction } from "@/server/actions";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { redirect } from "next/navigation";

export const DeleteLinkButton = ({linkInfo}: {linkInfo: Link}) => {

  const [inputState, setInputState] = useState('');

  const handleClick = () => {
    
    
    if (inputState.trim() == linkInfo.shortCode) {
      deleteLinkAction(linkInfo.shortCode);
      toast.success("Link deleted successfully");
      redirect("/dashboard");
    }
    toast.error("The shortcode does not match the one entered");
    
  } 


  console.log(linkInfo.id);
    return (
        <Dialog>
          <DialogTrigger asChild>
            <button className="rounded-md p-1 cursor-pointer text-violet-500 dark:hover:text-violet-200 hover:text-violet-300">
              <TrashIcon width="18px" height="18px" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>This action cannot be undone.</DialogTitle>
              <DialogDescription>
                 Write <strong className="text-red-600 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-md ">{linkInfo.shortCode}</strong> to delete the link.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Input
                placeholder=""
                className="border border-red-500 
                 focus-visible:border-red-500 active:border-red-500 round ed-md  px-2 py-1 max-w-[400px]  focus-visible:ring-0"
                value={inputState}
                onChange={(e) => setInputState(e.target.value)}
              />
             <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>    
              <Button onClick={handleClick} className="bg-red-500 hover:bg-red-700 text-white">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}