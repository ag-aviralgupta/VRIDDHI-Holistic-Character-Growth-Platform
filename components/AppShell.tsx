"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Sidebar />
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 pt-20 lg:pt-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
