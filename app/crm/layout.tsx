"use client";

import React, { useState, useEffect } from "react";
import { CrmSecurityWrapper, useCrm } from "@/components/CrmSecurityWrapper";
import { CrmNotificationsProvider, NotificationBell } from "@/components/CrmNotifications";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { crmTranslations } from "@/lib/crmTranslations";
import {
  LayoutDashboard,
  Users2,
  FolderKanban,
  ClipboardList,
  Home,
  FileSpreadsheet,
  LogOut,
  Menu,
  X,
  UserCheck2,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Globe,
} from "lucide-react";

function CrmLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, logout, theme, toggleTheme, lang, setLang } = useCrm();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const t = crmTranslations[lang];

  // Load sidebar state on mount
  useEffect(() => {
    const saved = localStorage.getItem("crm_sidebar_collapsed");
    if (saved === "true") {
      setCollapsed(true);
    }
  }, []);

  const toggleCollapse = () => {
    const newVal = !collapsed;
    setCollapsed(newVal);
    localStorage.setItem("crm_sidebar_collapsed", String(newVal));
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "ru" : "en");
  };

  // If on login page, render clean without sidebar
  if (pathname === "/crm/login") {
    return <div className="min-h-screen bg-[#08080a] text-[#f3ede1]">{children}</div>;
  }

  const role = user?.role || "";

  // Define Navigation items based on roles with translations
  const navItems = [
    {
      name: t.sidebar.dashboard,
      href: "/crm/dashboard",
      icon: LayoutDashboard,
      allowed: ["OWNER", "ADMIN", "SALES_DIRECTOR", "MARKETING_DIRECTOR"],
    },
    {
      name: t.sidebar.leads,
      href: "/crm/leads",
      icon: FolderKanban,
      allowed: ["OWNER", "ADMIN", "SALES_DIRECTOR", "MARKETING_DIRECTOR", "BROKER"],
    },
    {
      name: t.sidebar.tasks,
      href: "/crm/tasks",
      icon: ClipboardList,
      allowed: ["OWNER", "ADMIN", "SALES_DIRECTOR", "MARKETING_DIRECTOR", "BROKER", "DRIVER"],
    },
    {
      name: t.sidebar.inventory,
      href: "/crm/inventory",
      icon: Home,
      allowed: ["OWNER", "ADMIN", "SALES_DIRECTOR", "MARKETING_DIRECTOR", "BROKER"],
    },
    {
      name: t.sidebar.users,
      href: "/crm/users",
      icon: Users2,
      allowed: ["OWNER", "ADMIN"],
    },
    {
      name: t.sidebar.logs,
      href: "/crm/logs",
      icon: FileSpreadsheet,
      allowed: ["OWNER"],
    },
  ];

  const filteredNav = navItems.filter((item) => item.allowed.includes(role));

  const isDark = theme === "dark";

  // Class styles based on dark / light mode
  const layoutBg = isDark ? "bg-[#08080a] text-[#f3ede1]" : "bg-[#fbf8f2] text-[#15120d]";
  const sidebarBg = isDark ? "bg-[#0d0d10] border-[#c8a15a]/20" : "bg-[#ffffff] border-[#c8a15a]/30 shadow-xl";
  const textMuted = isDark ? "text-[#9c9488]" : "text-[#5c564c]";
  const borderCol = isDark ? "border-[#c8a15a]/10" : "border-[#c8a15a]/20";

  const sidebarContent = (
    <div className={`flex flex-col h-full border-r transition-all duration-300 ${sidebarBg} ${collapsed ? "p-4" : "p-6"}`}>
      {/* Brand logo & Switchers */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c8a15a] to-[#a47e3b] flex items-center justify-center font-bold text-[#08080a] shadow-lg shadow-[#c8a15a]/10 flex-shrink-0">
            BB
          </div>
          {!collapsed && (
            <div className="animate-in fade-in duration-300">
              <h1 className={`font-bold tracking-wider text-base leading-none ${isDark ? "text-[#f3ede1]" : "text-[#15120d]"}`}>
                BIZBUYUK
              </h1>
              <span className="text-[10px] text-[#c8a15a] uppercase tracking-widest font-medium">REAL ESTATE</span>
            </div>
          )}
        </div>

        {/* Desktop Controls inside sidebar when not collapsed */}
        {!collapsed && (
          <div className="flex items-center gap-2">
            <NotificationBell />
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDark ? "border-[#c8a15a]/20 text-[#c8a15a] hover:bg-[#c8a15a]/10" : "border-[#c8a15a]/30 text-[#a47e3b] hover:bg-[#c8a15a]/10"
              }`}
              title="Switch Language"
            >
              {lang.toUpperCase()}
            </button>
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark ? "border-[#c8a15a]/20 text-[#c8a15a] hover:bg-[#c8a15a]/10" : "border-[#c8a15a]/30 text-[#a47e3b] hover:bg-[#c8a15a]/10"
              }`}
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Collapse icon for desktop */}
      <div className="hidden lg:flex justify-end mb-4">
        <button
          onClick={toggleCollapse}
          className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
            isDark ? "border-[#c8a15a]/20 text-[#c8a15a] hover:bg-[#c8a15a]/10" : "border-[#c8a15a]/30 text-[#a47e3b] hover:bg-[#c8a15a]/10"
          }`}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.name : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? isDark
                    ? "bg-gradient-to-r from-[#c8a15a]/15 to-[#c8a15a]/5 text-[#c8a15a] border-l-2 border-[#c8a15a]"
                    : "bg-[#c8a15a]/10 text-[#a47e3b] border-l-2 border-[#c8a15a] font-semibold"
                  : isDark
                  ? "text-[#9c9488] hover:text-[#f3ede1] hover:bg-[#c8a15a]/5"
                  : "text-[#5c564c] hover:text-[#15120d] hover:bg-[#c8a15a]/5"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="animate-in fade-in duration-300">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Mobile/Collapsed Switchers placement */}
      {collapsed && (
        <div className="flex flex-col gap-2 mb-4 items-center">
          <NotificationBell />
          <button
            onClick={toggleLang}
            className={`w-full py-2 flex items-center justify-center rounded-xl border text-xs font-bold cursor-pointer ${
              isDark ? "border-[#c8a15a]/20 text-[#c8a15a]" : "border-[#c8a15a]/30 text-[#a47e3b]"
            }`}
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={toggleTheme}
            className={`w-full py-2.5 flex items-center justify-center rounded-xl border cursor-pointer ${
              isDark ? "border-[#c8a15a]/20 text-[#c8a15a]" : "border-[#c8a15a]/30 text-[#a47e3b]"
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* User profile & Logout */}
      {user && (
        <div className={`mt-auto pt-6 border-t ${borderCol}`}>
          {!collapsed ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[#c8a15a] bg-[#c8a15a]/10 border ${isDark ? "border-[#c8a15a]/30" : "border-[#c8a15a]/40"}`}>
                  <UserCheck2 className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className={`text-sm font-medium truncate ${isDark ? "text-[#f3ede1]" : "text-[#15120d]"}`}>
                    {user.fullName}
                  </p>
                  <span className="text-[10px] text-[#c8a15a] bg-[#c8a15a]/10 px-2 py-0.5 rounded-full uppercase font-semibold">
                    {user.role}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#c8a15a]/10 hover:bg-[#c8a15a] hover:text-[#08080a] text-[#c8a15a] border border-[#c8a15a]/30 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                {t.sidebar.logout}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={logout}
                className="p-3 bg-[#c8a15a]/10 hover:bg-[#c8a15a] hover:text-[#08080a] text-[#c8a15a] border border-[#c8a15a]/30 rounded-xl cursor-pointer"
                title={t.sidebar.logout}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 crm-shell ${layoutBg} flex`}>
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:block h-screen sticky top-0 flex-shrink-0 transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-sm">
          <div className="w-72 h-full relative">
            {sidebarContent}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-[-50px] p-2 bg-[#0d0d10] text-[#f3ede1] border border-[#c8a15a]/30 rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)}></div>
        </div>
      )}

      {/* Main container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className={`lg:hidden h-16 border-b px-6 flex items-center justify-between sticky top-0 z-40 ${
          isDark ? "bg-[#0d0d10] border-[#c8a15a]/20" : "bg-[#ffffff] border-[#c8a15a]/30 shadow-md"
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c8a15a] to-[#a47e3b] flex items-center justify-center font-bold text-[#08080a] text-sm">
              BB
            </div>
            <h1 className={`font-bold tracking-wider text-sm ${isDark ? "text-[#f3ede1]" : "text-[#15120d]"}`}>
              BIZBUYUK
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell compact />
            <button
              onClick={toggleLang}
              className={`px-2 py-1 text-xs font-bold rounded-lg border ${
                isDark ? "border-[#c8a15a]/20 text-[#c8a15a]" : "border-[#c8a15a]/30 text-[#a47e3b]"
              }`}
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border ${
                isDark ? "border-[#c8a15a]/20 text-[#c8a15a]" : "border-[#c8a15a]/30 text-[#a47e3b]"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className={`p-2 transition-colors ${isDark ? "text-[#f3ede1] hover:text-[#c8a15a]" : "text-[#15120d] hover:text-[#c8a15a]"}`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <CrmSecurityWrapper>
      <CrmNotificationsProvider>
        <CrmLayoutContent>{children}</CrmLayoutContent>
      </CrmNotificationsProvider>
    </CrmSecurityWrapper>
  );
}
