"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathName = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            className="cursor-pointer sm:hidden"
            alt="hamburger-icon"
            src="/icons/hamburger.svg"
            width={36}
            height={36}
          ></Image>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href={"/"} className="flex items-center gap-1">
            <Image
              src="/icons/logo.png"
              width={32}
              height={32}
              alt="Logo"
              className="max-sm:size-10"
            ></Image>
            <p className="text-[26px] font-extrabold text-white">Stream Sync</p>
          </Link>
          <div className="flex h-[calc(100vh - 72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-1 h-full flex-col gap-6 pt-16 text-white">
                {SidebarLinks.map((link, index) => {
                  const isActive =
                    pathName == link.route;
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg justify-start",
                          {
                            "bg-blue-1": isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        ></Image>
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
