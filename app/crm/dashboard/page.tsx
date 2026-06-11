"use client";

import React, { useEffect, useState } from "react";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from "recharts";
import { Users, Building, TrendingUp, DollarSign, Loader2 } from "lucide-react";
import { crmTranslations } from "@/lib/crmTranslations";

type AnalyticsData = {
  statusCounts: { status: string; count: number }[];
  sourceCounts: { source: string; count: number }[];
  brokerPerformance: { name: string; totalLeads: number; wonLeads: number; totalSales: number }[];
  totalSold: number | null;
  bestBroker: string | null;
  propertyCount: number;
  propertyTotalValue: number | null;
};

export default function DashboardPage() {
  const { user, lang, theme } = useCrm();
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("month");
  const t = crmTranslations[lang];
  const isDark = theme === "dark";
  const en = lang === "en";

  // theme-aware chart palette
  const axisColor = isDark ? "#9c9488" : "#6b6357";
  const gridColor = isDark ? "rgba(200,161,90,0.10)" : "rgba(168,126,59,0.16)";
  const tooltipStyle = {
    backgroundColor: isDark ? "#101013" : "#ffffff",
    borderColor: "#c8a15a",
    borderRadius: 12,
    color: isDark ? "#f3ede1" : "#1c1812",
  };

  useEffect(() => {
    if (!user) return;
    if (user.role === "BROKER") { router.replace("/crm/leads"); return; }
    if (user.role === "DRIVER") { router.replace("/crm/tasks"); return; }
    (async () => {
      try {
        const res = await fetch(`/api/crm/analytics?period=${period}`);
        if (res.ok) setData(await res.json());
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, router, period]);

  if (loading || !data) {
    return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="w-8 h-8 crm-gold animate-spin" /></div>;
  }

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(val);

  const totalLeads = data.statusCounts.reduce((s, i) => s + i.count, 0);
  const wonLeads = data.statusCounts.find((i) => i.status === "WON")?.count || 0;
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
  const GOLD_COLORS = ["#c8a15a", "#a47e3b", "#e6c280", "#876222", "#f7dcab", "#523c13"];

  // Marketing Director does not see financial figures (portfolio value, broker $).
  const isMarketing = user?.role === "MARKETING_DIRECTOR";

  const periods = [
    { k: "week", l: en ? "Week" : "Неделя" }, { k: "month", l: en ? "Month" : "Месяц" },
    { k: "year", l: en ? "Year" : "Год" }, { k: "all", l: en ? "All" : "Всё" },
  ];

  const kpis = [
    { label: t.dashboard.totalLeads, value: totalLeads, sub: t.dashboard.activeLeadsSub, icon: Users },
    ...(!isMarketing && data.totalSold != null
      ? [{ label: en ? "Total Sold" : "Продано на", value: formatCurrency(data.totalSold), sub: data.bestBroker ? `${en ? "Top" : "Лучший"}: ${data.bestBroker}` : (en ? "Won deals" : "Сделки"), icon: DollarSign, small: true }]
      : []),
    { label: t.dashboard.propertiesCount, value: data.propertyCount, sub: t.dashboard.propertiesSub, icon: Building },
    { label: t.dashboard.conversionRate, value: `${conversionRate}%`, sub: t.dashboard.conversionSub, icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight crm-text">{t.dashboard.title}</h2>
          <p className="text-sm crm-muted mt-1">{t.dashboard.subtitle}</p>
        </div>
        <div className="crm-panel p-1.5 inline-flex gap-1 self-start">
          {periods.map((p) => (
            <button key={p.k} onClick={() => setPeriod(p.k)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${period === p.k ? "bg-[#c8a15a] text-[#08080a]" : "crm-muted hover:crm-text"}`}>{p.l}</button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className="crm-card crm-lift p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold crm-muted uppercase tracking-wider">{k.label}</span>
                <div className="w-9 h-9 rounded-xl bg-[#c8a15a]/12 flex items-center justify-center"><Icon className="w-4.5 h-4.5 crm-gold" /></div>
              </div>
              <div className="mt-4">
                <h3 className={`font-bold crm-text ${k.small ? "text-2xl truncate" : "text-3xl"}`}>{k.value}</h3>
                <span className="text-[10px] crm-gold font-medium uppercase tracking-wider">{k.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="crm-card p-6 flex flex-col">
          <h4 className="text-base font-semibold mb-6 crm-text">{t.dashboard.statusChartTitle}</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.statusCounts}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="status" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(200,161,90,0.08)" }} itemStyle={{ color: "#c8a15a" }} />
                <Bar dataKey="count" fill="#c8a15a" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="crm-card p-6 flex flex-col">
          <h4 className="text-base font-semibold mb-6 crm-text">{t.dashboard.sourceChartTitle}</h4>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.sourceCounts} dataKey="count" nameKey="source" cx="50%" cy="50%" outerRadius={80} innerRadius={42} paddingAngle={2}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                  {data.sourceCounts.map((e, i) => <Cell key={i} fill={GOLD_COLORS[i % GOLD_COLORS.length]} stroke="transparent" />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Leaderboard — hidden from Marketing (financial/broker performance) */}
      {!isMarketing && (
      <div className="crm-card p-6">
        <h4 className="text-base font-semibold mb-6 crm-text">{t.dashboard.leaderboardTitle}</h4>
        <div className="overflow-x-auto crm-scroll">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b crm-bd text-xs crm-muted uppercase font-semibold">
                <th className="pb-4">{t.dashboard.tblEmployee}</th>
                <th className="pb-4 text-center">{t.dashboard.tblLeads}</th>
                <th className="pb-4 text-center">{t.dashboard.tblWon}</th>
                <th className="pb-4 text-right">{t.dashboard.tblVolume}</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.brokerPerformance.map((b, idx) => (
                <tr key={idx} className="border-b crm-bd last:border-0 hover:bg-[var(--crm-surface-hover)] transition-colors">
                  <td className="py-4 font-medium crm-text">{b.name}</td>
                  <td className="py-4 text-center crm-text">{b.totalLeads}</td>
                  <td className="py-4 text-center text-emerald-500 font-semibold">{b.wonLeads}</td>
                  <td className="py-4 text-right crm-gold font-bold">{formatCurrency(b.totalSales)}</td>
                </tr>
              ))}
              {data.brokerPerformance.length === 0 && (
                <tr><td colSpan={4} className="py-8 text-center crm-muted">{t.dashboard.noBrokers}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
}
