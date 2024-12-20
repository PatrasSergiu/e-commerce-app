import { auth } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import Navbar from "@/components/Navbar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = await auth();
  const { storeId } = await params;
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: { id: storeId, userId: userId },
  });

  if (!store) {
    redirect("/");
  } else {
    return (
      <>
    <Navbar />

        {children}
      </>
    );
  }
}
