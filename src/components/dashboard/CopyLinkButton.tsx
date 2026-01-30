import { CopyIcon } from "lucide-react";
import { type Link } from "../../../generated/prisma/client";
import { toast } from "sonner";

export function CopyLinkButton({linkInfo}: {linkInfo: Link}) {
  const copyLink = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_BASE_URL + "/" + linkInfo.shortCode);
    toast.success("Link copied to clipboard", {
      description: process.env.NEXT_PUBLIC_BASE_URL + "/" + linkInfo.shortCode,
    });
  };
  return (
    <button onClick={copyLink} className="rounded-md p-1 cursor-pointer text-violet-500 dark:hover:text-violet-200 hover:text-violet-300">
      <CopyIcon width="18px" height="18px" />
    </button>
  );
}
