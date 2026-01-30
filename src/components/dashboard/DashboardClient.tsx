"use client";

import { useMemo, useState } from "react";
import type { Link } from "../../../prisma/generated/client";
import { LinkComponent } from "@/components/dashboard/LinkComponent";
import {
  LinkToolbar,
  type LinkSortOption,
} from "@/components/dashboard/LinksToolbar";

type DashboardClientProps = {
  links: Link[];
};

export function DashboardClient({ links }: DashboardClientProps) {
  const [sort, setSort] = useState<LinkSortOption>("newest");
  const [query, setQuery] = useState("");

  const visibleLinks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered =
      normalizedQuery.length === 0
        ? links
        : links.filter((l) => {
            const shortCode = (l.shortCode ?? "").toLowerCase();
            const originalUrl = (l.originalUrl ?? "").toLowerCase();
            return (
              shortCode.includes(normalizedQuery) ||
              originalUrl.includes(normalizedQuery)
            );
          });

    const next = [...filtered];

    switch (sort) {
      case "newest":
        next.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "oldest":
        next.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "az":
        next.sort((a, b) => a.shortCode.localeCompare(b.shortCode));
        break;
      case "clicks":
        next.sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0));
        break;
      default:
        break;
    }

    return next;
  }, [links, query, sort]);

  return (
    <section>
      <LinkToolbar
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
      />

      <main className="max-w-[60%] mx-auto py-8">
        {visibleLinks.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            {visibleLinks.map((link) => (
              <LinkComponent key={link.id} linkInfo={link} />
            ))}
          </ul>
        ) : (
          <h1 className="text-center text-2xl font-bold">No links found</h1>
        )}
      </main>
    </section>
  );
}
