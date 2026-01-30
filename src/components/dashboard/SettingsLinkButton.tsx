"use client";

import { SettingsIcon } from "../icons/SettingsIcons";
import { Link } from "../../../prisma/generated/client";
import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CircleXIcon } from "lucide-react";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateLinkAction } from "../../server/actions";
import { ShortCodeChangeAlert } from "./ShortCodeChangeAlert";

export function SettingsLinkButton({ linkInfo }: { linkInfo: Link }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [isLocked, setIsLocked] = useState(true);

  const initialState = {
    errors: {},
    message: null,
    success: false,
    linkId: linkInfo.id,
    // Para poder mantener el shortCode si el input esta bloqueado/disabled
    link: {
      id: linkInfo.id,
      originalUrl: linkInfo.originalUrl,
      shortCode: linkInfo.shortCode,
    },
  };

  const [state, formAction] = useActionState(updateLinkAction, initialState);

  useEffect(() => {
    if (state.success) {
      setOpen(false);

      const form = document.getElementById(
        "create-link-form",
      ) as HTMLFormElement | null;
      form?.reset();
      toast.success("Link updated successfully");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          const form = document.getElementById(
            "create-link-form",
          ) as HTMLFormElement | null;
          form?.reset();
        }
      }}
    >
      <DialogTrigger className="rounded-md p-1 cursor-pointer text-violet-500 dark:hover:text-violet-500 hover:text-violet-500">
        <SettingsIcon width="18px" height="18px" />
      </DialogTrigger>
      <DialogContent>
        <form
          id="create-link-form"
          action={formAction}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription className="text-sm dark:text-gray-400 text-gray-600">
              /{linkInfo.shortCode}
            </DialogDescription>
          </DialogHeader>

          <div>
            <label htmlFor="destination" className="text-sm">
              Destination URL:
            </label>
            <Input
              name="destination"
              id="newUrl"
              defaultValue={linkInfo.originalUrl}
              placeholder="https://..."
              className="mt-2 ml-2"
            />
            {state.errors?.destination && (
              <span className="flex items-center ml-2  mt-3">
                <CircleXIcon className="w-5 h-5 mr-1 text-violet-500" />
                <p className="text-violet-500 text-[.9rem] ml-1 mt-1 font-semibold">
                  {state.errors.destination}
                </p>
              </span>
            )}
          </div>

          <div>
            <label htmlFor="short_code" className="text-sm">
              Short Code:
            </label>
            <InputGroup className="flex items-center ml-2 mt-2 ">
              <InputGroupAddon className="py-2">
                <ShortCodeChangeAlert
                  isLocked={isLocked}
                  setIsLocked={setIsLocked}
                />
              </InputGroupAddon>
              <InputGroupInput
                name="short_code"
                id="newShortCode"
                defaultValue={linkInfo.shortCode}
                placeholder="myLink"
                className="ml-2"
                disabled={isLocked}
              />
            </InputGroup>
            {state.errors?.shortCode && (
              <span className="flex items-center ml-2  mt-3">
                <CircleXIcon className="w-5 h-5 mr-1 text-violet-500" />
                <p className="text-violet-500 text-[.9rem] ml-1 mt-1 font-semibold">
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
              className="bg-violet-800 text-white font-semibold hover:bg-violet-500 cursor-pointer"
            >
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
