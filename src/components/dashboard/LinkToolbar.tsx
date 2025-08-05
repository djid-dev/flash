"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus, CircleXIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createLinkAction } from "@/server/actions";
import { useActionState, useEffect } from "react";

export function LinkToolbar() {
  const initialState = {
    errors: {},
    message: null,
    success: false,
    link: null,
  };

  const [state, formAction] = useActionState(createLinkAction, initialState);

  useEffect(() => {
    if (state.success) {
      window.location.reload();
    }
  }, [state.success]);

  return (
    <nav className="w-full">
      <div className="flex justify-between items-center gap-4 max-w-[60%] mx-auto mt-4 mb-6">
        <div className="w-[25%]">
          <Input
            placeholder="Search"
            className="border-red-500  focus-visible:border-red-500"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-500 text-white hover:bg-red-400 transition-colors flex items-center gap-2 font-semibold cursor-pointer">
              <Plus className="stroke-2.5 size-6" />
              <span>Create link</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form action={formAction} className="flex flex-col gap-4">
              <DialogHeader>
                <DialogTitle>Create a new link</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new link.
                </DialogDescription>
              </DialogHeader>

              <div>
                <label htmlFor="destination" className="text-sm">
                  Destination URL:
                </label>
                <Input
                  name="destination"
                  id="destination"
                  placeholder="https://..."
                  className="mt-2 ml-2"
                />
                {state.errors?.destination && (
                  <span className="flex items-center ml-2  mt-3">
                    <CircleXIcon className="w-5 h-5 mr-1 text-red-500" />
                    <p className="text-red-500 text-[.9rem] ml-1 mt-1 font-semibold">
                      {state.errors.destination}
                    </p>
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="short_link" className="text-sm">
                  Short Code (Optional):
                </label>
                <Input
                  name="short_link"
                  id="short_link"
                  placeholder="myLink"
                  className="mt-2 ml-2"
                />
                {state.errors?.shortCode && (
                  <span className="flex items-center ml-2  mt-3">
                    <CircleXIcon className="w-5 h-5 mr-1 text-red-500" />
                    <p className="text-red-500 text-[.9rem] ml-1 mt-1 font-semibold">
                      {state.errors.shortCode}
                    </p>
                  </span>
                )}
              </div>

              

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-red-800 text-white font-semibold hover:bg-red-500 cursor-pointer"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
}
