"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Home, Table2, Settings, LogOut } from "lucide-react";
import { logOutAction } from "@/server/actions";

export function UserAvatar() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>…</div>;
  if (!session?.user) return null;

  const { name, image, email } = session.user;

  const initials = name
    ? name
        .split(" ")
        .filter((x) => x)
        .map((n) => n[0].toUpperCase())
        .slice(0, 2)
        .join("")
    : session.user.email.slice(0, 2).toUpperCase();

  const logOut = async () => {
    logOutAction();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {image ? (
            <AvatarImage src={image} alt={name || session.user.email} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background dark:border-red-950 border-red-300 py-1">
        <DropdownMenuLabel>
          <h2 className="font-bold text-md">{name}</h2>
          <p className="text-muted">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-red-950 bg-red-300" />
        <DropdownMenuItem className="dark:hover:bg-neutral-700 hover:bg-neutral-300 ">
          <Link className="w-full h-full flex gap-2 items-center" href={"/"}>
            <Home className=" " />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="dark:hover:bg-neutral-700 hover:bg-neutral-300 ">
          <Link
            className="w-full h-full flex gap-2 items-center"
            href={"/dashboard"}
          >
            <Table2 />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="dark:hover:bg-neutral-700 hover:bg-neutral-300 ">
          <Link
            className="w-full h-full flex gap-2 items-center"
            href={"/settings"}
          >
            <Settings />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="dark:hover:bg-neutral-700 hover:bg-neutral-300 "
          onClick={logOut}
        >
          <LogOut />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
