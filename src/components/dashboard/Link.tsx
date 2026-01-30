
'use client';
import ExternalLink from "next/link";
import { type Link } from "../../../generated/prisma/client";
import { CopyIcon } from "../icons/CopyIcons";
import { SettingsIcon } from "../icons/SettingsIcons";
import { ClickIcon } from "../icons/ClickIcon";
import { DeleteLinkButton } from "./DeleteLinkButton";


type LinkComponentProps = {
  linkInfo: Link;
};

export function LinkComponent({ linkInfo }: LinkComponentProps) {


  return (
    <li className="flex w-full flex-col gap-2 border-b border-violet-600 px-3 py-2">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="max-w-full truncate dark:text-gray-200 text-gray-800 font-bold">/{linkInfo.shortCode}</span>

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 sm:justify-end">
          <span className="flex items-center gap-x-1 text-sm dark:text-gray-300 text-gray-700">
            <span>{linkInfo.clicks}</span>
            <ClickIcon width="16px" height="16px" />
          </span>

          <span className="hidden dark:text-gray-400 text-gray-600 sm:inline">|</span>

          <ul className="flex items-center gap-x-1">
            <button className="rounded-md p-1 cursor-pointer text-violet-500 dark:hover:text-violet-200 hover:text-violet-300">
              <CopyIcon width="18px" height="18px" />
            </button>
            <button className="rounded-md p-1 cursor-pointer text-violet-500 dark:hover:text-violet-200 hover:text-violet-300">
              <SettingsIcon width="18px" height="18px" />
            </button>
            <DeleteLinkButton linkInfo={linkInfo} />
          </ul>
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-x-3">
        <ExternalLink
          href={linkInfo.originalUrl}
          target="_blank"
          className="min-w-0 flex-1 transition underline-offset-4 truncate text-sm dark:text-gray-200 text-gray-400 hover:underline"
        >
          {linkInfo.originalUrl}
        </ExternalLink>

        <span className="text-sm dark:text-gray-200 text-gray-400 dark:hover:text-gray-400 hover:text-gray-400">
          {linkInfo.createdAt.toUTCString().split(" ")[1] +
            " " +
            linkInfo.createdAt.toUTCString().split(" ")[2] +
            " " +
            linkInfo.createdAt.toUTCString().split(" ")[3]}
        </span>
      </div>
    </li>
  );
}
