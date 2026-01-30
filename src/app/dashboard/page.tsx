import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { getLinks } from "@/server/db";
import { getUserSessionFromServer } from "@/server/utils";

export default async function DashboardPage() {
  const session = await getUserSessionFromServer();
  const user = session?.user;

  const links = await getLinks(user?.id || "");

  return <DashboardClient links={links} />;
}

