"use client";
import AccountSideBar from "@/components/AccountSideBar";

export default function AccountLayout({ children }) {
  return (
    <div className="xl:container px-2 xl:px-4 mx-auto py-12">
      <div className="flex">
        <AccountSideBar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
