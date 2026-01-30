import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { LockIcon, UnlockIcon } from "lucide-react";

export function ShortCodeChangeAlert({
  isLocked,
  setIsLocked,
}: {
  isLocked: boolean;
  setIsLocked: (isLocked: boolean) => void;
}) {
  return isLocked ? (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="cursor-pointer shadow-none  bg-transparent hover:bg-transparent hover:text-violet-600 text-neutral-500 flex items-center justify-center">
          <LockIcon size={17} />
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-violet-500">
              <UnlockIcon />
              Unlock short code
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm dark:text-gray-400 text-gray-600">
              Edit the short code of the link will remove access to the previous
              link. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-violet-500 text-white font-semibold hover:bg-violet-600 cursor-pointer"
              onClick={(e) => {
                setIsLocked(false);
                e.stopPropagation();
              }}
            >
              <UnlockIcon />
              Unlock
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ) : (
    <div>
      <div
        className="cursor-pointer shadow-none  bg-transparent hover:bg-transparent hover:text-neutral-600 text-violet-500 flex items-center justify-center"
        onClick={() => setIsLocked(true)}
      >
        <UnlockIcon size={17} />
      </div>
    </div>
  );
}
