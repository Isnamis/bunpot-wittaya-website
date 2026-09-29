"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Menu, ShieldCheck, X } from "lucide-react";
import { navItems } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

type NavItem = (typeof navItems)[number];
const hasChildren = (i: NavItem): i is Extract<NavItem, { children: unknown }> => "children" in i;

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  if (pathname.startsWith(item.href)) return true;
  return hasChildren(item) && item.children.some((c) => pathname.startsWith(c.href));
}

function DesktopItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const active = isActive(pathname, item);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const base = cn(
    "inline-flex min-h-11 items-center gap-0.5 whitespace-nowrap rounded-full px-1.5 text-[14.5px] font-medium transition-colors",
    active ? "bg-lavender-100 text-purple-700" : "text-ink hover:bg-lavender-100/70",
  );

  if (!hasChildren(item)) {
    return (
      <li>
        <Link href={item.href} className={base} aria-current={pathname === item.href ? "page" : undefined}>
          {item.label}
        </Link>
      </li>
    );
  }
  return (
    <li ref={ref} className="relative" onMouseLeave={() => setOpen(false)}>
      <button type="button" className={base} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)} onMouseEnter={() => setOpen(true)}>
        {item.label}
        <ChevronDown className={cn("size-3.5 opacity-60 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <ul className="min-w-60 rounded-[var(--radius-md)] border border-line bg-card p-2 shadow-lift">
            {item.children.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === c.href ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center rounded-xl px-3 text-[15px] hover:bg-lavender-100",
                    pathname === c.href && "font-semibold text-purple-700",
                  )}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-3 px-4 md:px-6">
        <Link href="/" className="flex min-h-11 items-center gap-3 rounded-full pr-2" aria-label="โรงเรียนบรรพตวิทยา — หน้าหลัก">
          <Logo size={44} />
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-[17px] font-bold">โรงเรียนบรรพตวิทยา</span>
            <span className="block whitespace-nowrap text-xs text-ink-muted">Bunpot Wittaya School</span>
          </span>
        </Link>

        <nav aria-label="เมนูหลัก" className="ml-auto hidden min-[1400px]:block">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <DesktopItem key={item.href} item={item} pathname={pathname} />
            ))}
          </ul>
        </nav>

        <Button asChild className="ml-auto hidden whitespace-nowrap sm:inline-flex min-[1400px]:ml-2">
          <Link href="/quality">
            <ShieldCheck aria-hidden /> ดูข้อมูลคุณภาพการศึกษา
          </Link>
        </Button>

        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild>
            <Button variant="soft" size="icon" className="ml-auto sm:ml-0 min-[1400px]:hidden" aria-label="เปิดเมนู">
              <Menu aria-hidden />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-page shadow-lift focus:outline-none">
              <div className="flex h-[72px] items-center justify-between border-b border-line px-4">
                <Dialog.Title className="text-lg font-bold">เมนู</Dialog.Title>
                <Dialog.Description className="sr-only">เมนูนำทางหลักของเว็บไซต์โรงเรียน</Dialog.Description>
                <Dialog.Close asChild>
                  <Button variant="soft" size="icon" aria-label="ปิดเมนู">
                    <X aria-hidden />
                  </Button>
                </Dialog.Close>
              </div>
              <nav aria-label="เมนูหลัก (มือถือ)" className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      {hasChildren(item) ? (
                        <>
                          <button
                            type="button"
                            className={cn(
                              "flex min-h-12 w-full items-center justify-between rounded-2xl px-4 text-left text-base font-medium",
                              isActive(pathname, item) ? "bg-lavender-100 text-purple-700" : "hover:bg-lavender-100/70",
                            )}
                            aria-expanded={expanded === item.href}
                            onClick={() => setExpanded((e) => (e === item.href ? null : item.href))}
                          >
                            {item.label}
                            <ChevronDown className={cn("size-5 transition-transform", expanded === item.href && "rotate-180")} aria-hidden />
                          </button>
                          {expanded === item.href && (
                            <ul className="mb-2 ml-4 mt-1 space-y-1 border-l-2 border-lavender-300 pl-3">
                              {item.children.map((c) => (
                                <li key={c.href}>
                                  <Link href={c.href} className="flex min-h-11 items-center rounded-xl px-3 text-[15px] hover:bg-lavender-100" aria-current={pathname === c.href ? "page" : undefined}>
                                    {c.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex min-h-12 items-center rounded-2xl px-4 text-base font-medium",
                            isActive(pathname, item) ? "bg-lavender-100 text-purple-700" : "hover:bg-lavender-100/70",
                          )}
                          aria-current={pathname === item.href ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-line p-4">
                <Button asChild size="lg" className="w-full">
                  <Link href="/quality">
                    <ShieldCheck aria-hidden /> ดูข้อมูลคุณภาพการศึกษา
                  </Link>
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
