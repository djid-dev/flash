import  ExternalLink  from "next/link"
import { type Link } from "../../../generated/prisma/client" 

type LinkComponentProps = {
  linkInfo: Link
}

export function LinkComponent({ linkInfo }: LinkComponentProps) {
  return (
    //TODO: Add styles to the link component
    <li className="flex items-center justify-between p-2 border-b">
      <ExternalLink
        href={linkInfo.originalUrl}
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        {linkInfo.originalUrl} — {linkInfo.shortCode}
      </ExternalLink>
    </li>
  )
}

