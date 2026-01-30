import {
  getLinkByShortCodeAction,
  updateLinkClicksAction,
} from "@/server/actions";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ shortcode: string }>;
}) {
  const { shortcode } = await params;
  const link = await getLinkByShortCodeAction(shortcode);
  if ("message" in link) {
    redirect("/not-found");
  }
  await updateLinkClicksAction(shortcode);

  const { originalUrl } = link;

  console.log(originalUrl);
  redirect(originalUrl);
}
