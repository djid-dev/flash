import { LinkComponent } from "@/components/dashboard/LinkComponent";
import { LinkToolbar } from "@/components/dashboard/LinksToolbar";
import { getLinks } from "@/server/db";
import { getUserSessionFromServer } from "@/server/utils";

export default async function DashboardPage() {
  const session = await getUserSessionFromServer();
  const user = session?.user;

  const links = await getLinks(user?.id || "");

  return (
    <section className="">
      <LinkToolbar />
      <main className="max-w-[60%] mx-auto py-8">
        {links.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            {links.map((link) => (
              <LinkComponent
                key={link.id}
                linkInfo={link}
              />
            ))}
          </ul>
        ) : (
          <h1 className="text-center text-2xl font-bold">No links found</h1>
        )}
      </main>
    </section>
  );
}
