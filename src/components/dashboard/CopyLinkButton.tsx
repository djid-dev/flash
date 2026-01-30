import { CopyIcon } from "lucide-react";
import { type Link } from "@prisma/client";
import { toast } from "sonner";

export function CopyLinkButton({linkInfo}: {linkInfo: Link}) {
  const copyLink = () => {
    const baseUrl = process.env.VERCEL_URL ?? "http://localhost:3000";

    navigator.clipboard.writeText(baseUrl + "/links/" + linkInfo.shortCode);
    toast.success("Link copied to clipboard", {
      description: baseUrl + "/links/" + linkInfo.shortCode,
    });
  };
  return (
    <button onClick={copyLink} className="rounded-md p-1 cursor-pointer text-violet-500 dark:hover:text-violet-200 hover:text-violet-300">
      <CopyIcon width="18px" height="18px" />
    </button>
  );
}
