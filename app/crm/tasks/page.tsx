"use client";

import React, { useEffect, useState } from "react";
import { useCrm } from "@/components/CrmSecurityWrapper";
import { useNotifications } from "@/components/CrmNotifications";
import { crmTranslations } from "@/lib/crmTranslations";
import {
  Plus,
  Calendar,
  CheckCircle2,
  Circle,
  CircleDot,
  User,
  AlertCircle,
  Loader2,
  X,
  ClipboardList,
  MailWarning,
  BellPlus,
  Pencil,
  Trash2,
  Repeat,
} from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string | null;
  type: "DAILY" | "WEEKLY" | "MONTHLY" | "LOGISTICS";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  recurring?: boolean;
  deadline: string | null;
  assignedToId: string;
  assignedTo: { fullName: string; role: string };
  creator: { fullName: string };
};

type UserType = { id: string; fullName: string; role: string };

export default function TasksPage() {
  const { user, lang } = useCrm();
  const { refresh: refreshNotifs } = useNotifications();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const t = crmTranslations[lang];

  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<string>("DAILY");
  const [deadline, setDeadline] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [savingTask, setSavingTask] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isManager = user && user.role !== "BROKER" && user.role !== "DRIVER";

  // per-task reminder
  const [remindTask, setRemindTask] = useState<Task | null>(null);
  const [remDays, setRemDays] = useState<number | null>(1);
  const [remDate, setRemDate] = useState("");
  const [remNote, setRemNote] = useState("");
  const [savingRem, setSavingRem] = useState(false);

  useEffect(() => { fetchData(true); }, []);

  const fetchData = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const [tasksRes, usersRes] = await Promise.all([fetch("/api/crm/tasks"), fetch("/api/crm/users")]);
      if (tasksRes.ok) setTasks((await tasksRes.json()).tasks);
      if (usersRes.ok) setUsers((await usersRes.json()).users);
    } catch (err) {
      console.error("Error loading tasks page data:", err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/crm/tasks");
      if (res.ok) setTasks((await res.json()).tasks);
    } catch (err) {
      console.error("Error refreshing tasks:", err);
    }
  };

  const setStatus = async (taskId: string, newStatus: Task["status"]) => {
    const prev = [...tasks];
    // Optimistic — the card updates instantly; we reconcile quietly afterwards.
    setTasks((p) => p.map((x) => (x.id === taskId ? { ...x, status: newStatus } : x)));
    try {
      const res = await fetch(`/api/crm/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) fetchTasks();
      else setTasks(prev);
    } catch {
      setTasks(prev);
    }
  };

  const resetTaskForm = () => {
    setEditId(null); setTitle(""); setDescription(""); setType("DAILY"); setDeadline(""); setAssignedToId(""); setRecurring(false); setErrorMsg("");
  };
  const openCreate = () => { resetTaskForm(); setIsNewTaskOpen(true); };
  const openEdit = (task: Task) => {
    setEditId(task.id); setTitle(task.title); setDescription(task.description || ""); setType(task.type);
    setDeadline(task.deadline ? new Date(task.deadline).toISOString().slice(0, 10) : "");
    setAssignedToId(task.assignedToId); setRecurring(!!task.recurring); setErrorMsg(""); setIsNewTaskOpen(true);
  };

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSavingTask(true);
    try {
      const res = await fetch(editId ? `/api/crm/tasks/${editId}` : "/api/crm/tasks", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, type, deadline: deadline || null, assignedToId, recurring }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error saving task");
      setIsNewTaskOpen(false);
      resetTaskForm();
      fetchData(false);
    } catch (err: any) {
      setErrorMsg(err.message || "Error");
    } finally {
      setSavingTask(false);
    }
  };

  const handleDeleteTask = async (task: Task) => {
    if (!confirm(lang === "en" ? `Delete task "${task.title}"?` : `Удалить задачу «${task.title}»?`)) return;
    try {
      const res = await fetch(`/api/crm/tasks/${task.id}`, { method: "DELETE" });
      if (res.ok) fetchTasks();
      else alert((await res.json()).error || "Error");
    } catch (err) { console.error(err); }
  };

  const saveReminder = async () => {
    if (!remindTask) return;
    let remindAt: string | undefined;
    if (remDays) remindAt = new Date(Date.now() + remDays * 86400000).toISOString();
    else if (remDate) remindAt = new Date(remDate).toISOString();
    if (!remindAt) return;
    setSavingRem(true);
    try {
      const res = await fetch("/api/crm/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: remNote.trim() || remindTask.title,
          remindAt,
          taskId: remindTask.id,
        }),
      });
      if (res.ok) {
        refreshNotifs();
        setRemindTask(null);
        setRemDays(1); setRemDate(""); setRemNote("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingRem(false);
    }
  };

  const typeLabel = (tp: Task["type"]) =>
    tp === "DAILY" ? t.tasks.daily : tp === "WEEKLY" ? t.tasks.weekly : tp === "MONTHLY" ? t.tasks.monthly : t.tasks.logistics;

  const todoTasks = tasks.filter((x) => x.status !== "DONE");
  const doneTasks = tasks.filter((x) => x.status === "DONE");
  const canCreate = user && user.role !== "BROKER" && user.role !== "DRIVER";

  const isOverdue = (task: Task) => task.deadline && new Date(task.deadline).getTime() < Date.now() && task.status !== "DONE";

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight crm-text">{t.tasks.title}</h2>
          <p className="text-sm crm-muted mt-1">{t.tasks.subtitle}</p>
        </div>
        {canCreate && (
          <button onClick={openCreate} className="crm-btn-primary">
            <Plus className="w-4 h-4" /> {t.tasks.btnCreateTask}
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-24 flex items-center justify-center"><Loader2 className="w-8 h-8 crm-gold animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 crm-text">
              <ClipboardList className="w-5 h-5 crm-gold" /> {t.tasks.todoHeader} ({todoTasks.length})
            </h3>
            <div className="space-y-3">
              {todoTasks.map((task) => {
                const overdue = isOverdue(task);
                return (
                  <div key={task.id} className={`crm-card crm-lift p-4 flex gap-3.5 items-start ${overdue ? "ring-1 ring-red-500/40" : ""}`}>
                    <button onClick={() => setStatus(task.id, "DONE")} className="mt-0.5 crm-muted hover:crm-gold transition-colors cursor-pointer" title={t.tasks.markDone}>
                      {task.status === "IN_PROGRESS" ? <CircleDot className="w-5 h-5 crm-gold" /> : <Circle className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 space-y-1 min-w-0">
                      <h4 className="font-semibold text-sm crm-text">{task.title}</h4>
                      {task.description && <p className="text-xs crm-muted">{task.description}</p>}
                      <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px]">
                        <span className="crm-chip">{typeLabel(task.type)}</span>
                        {task.recurring && (
                          <span className="crm-chip flex items-center gap-1"><Repeat className="w-3 h-3" />{lang === "en" ? "Recurring" : "Повтор"}</span>
                        )}
                        {task.deadline && (
                          <span className={`flex items-center gap-1 font-semibold ${overdue ? "text-red-500" : "crm-gold"}`}>
                            <Calendar className="w-3 h-3" />
                            {new Date(task.deadline).toLocaleDateString()}{overdue ? ` · ${t.tasks.overdue}` : ""}
                          </span>
                        )}
                        {user?.role !== "BROKER" && user?.role !== "DRIVER" && (
                          <span className="flex items-center gap-1 crm-muted"><User className="w-3 h-3 crm-gold" />{task.assignedTo.fullName}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {task.status === "TODO" && (
                          <button onClick={() => setStatus(task.id, "IN_PROGRESS")} className="text-[11px] crm-btn-ghost py-1 px-2">{t.tasks.markInProgress}</button>
                        )}
                        <button onClick={() => setStatus(task.id, "DONE")} className="text-[11px] crm-btn-ghost py-1 px-2">{t.tasks.markDone}</button>
                        <button onClick={() => { setRemindTask(task); setRemDays(1); setRemDate(""); setRemNote(""); }} className="text-[11px] crm-btn-ghost py-1 px-2 flex items-center gap-1">
                          <BellPlus className="w-3 h-3" /> {t.tasks.btnRemindMe}
                        </button>
                        {isManager && (
                          <>
                            <button onClick={() => openEdit(task)} className="text-[11px] crm-btn-ghost py-1 px-2 flex items-center gap-1"><Pencil className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteTask(task)} className="text-[11px] py-1 px-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 flex items-center gap-1"><Trash2 className="w-3 h-3" /></button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {todoTasks.length === 0 && (
                <div className="py-12 border border-dashed crm-bd rounded-xl text-center crm-muted text-sm">{t.tasks.noTodo}</div>
              )}
            </div>
          </div>

          {/* Done */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 crm-muted">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {t.tasks.doneHeader} ({doneTasks.length})
            </h3>
            <div className="space-y-3">
              {doneTasks.map((task) => (
                <div key={task.id} className="crm-card p-4 flex gap-3.5 items-start opacity-65">
                  <button onClick={() => setStatus(task.id, "TODO")} className="mt-0.5 text-emerald-500 hover:crm-muted transition-colors cursor-pointer">
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <div className="flex-1 space-y-1 min-w-0">
                    <h4 className="font-semibold text-sm line-through crm-muted">{task.title}</h4>
                    {task.description && <p className="text-xs line-through crm-faint">{task.description}</p>}
                    <div className="flex flex-wrap gap-2 pt-2 text-[10px]">
                      <span className="crm-chip opacity-70">{typeLabel(task.type)}</span>
                      {task.deadline && <span className="crm-faint">{new Date(task.deadline).toLocaleDateString()}</span>}
                    </div>
                  </div>
                </div>
              ))}
              {doneTasks.length === 0 && (
                <div className="py-12 border border-dashed crm-bd rounded-xl text-center crm-faint text-sm">{t.tasks.noDone}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {isNewTaskOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-backdrop">
          <div className="crm-card w-full max-w-lg p-6 relative animate-modal">
            <button onClick={() => { setIsNewTaskOpen(false); resetTaskForm(); }} className="absolute top-4 right-4 crm-muted hover:crm-text"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-bold border-b crm-bd pb-4 mb-4 crm-text">{editId ? (lang === "en" ? "Edit Task" : "Изменить задачу") : t.tasks.modalTitle}</h3>
            {errorMsg && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs flex items-center gap-2"><AlertCircle className="w-4 h-4" />{errorMsg}</div>}
            <form onSubmit={handleSaveTask} className="space-y-4">
              <FieldT label={t.tasks.taskLabel}><input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder={lang === "en" ? "Task title..." : "Тема задачи..."} className="crm-input" /></FieldT>
              <FieldT label={t.tasks.taskDesc}><textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={lang === "en" ? "Details..." : "Детали..."} className="crm-input" /></FieldT>
              <div className="grid grid-cols-2 gap-4">
                <FieldT label={t.tasks.taskType}>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="crm-input crm-select">
                    <option value="DAILY">{t.tasks.daily}</option><option value="WEEKLY">{t.tasks.weekly}</option>
                    <option value="MONTHLY">{t.tasks.monthly}</option><option value="LOGISTICS">{t.tasks.logistics}</option>
                  </select>
                </FieldT>
                <FieldT label={t.tasks.taskDeadline}><input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="crm-input" /></FieldT>
              </div>
              <FieldT label={t.tasks.taskAssignee}>
                <select required value={assignedToId} onChange={(e) => setAssignedToId(e.target.value)} className="crm-input crm-select">
                  <option value="">{t.tasks.selectAssigneeOpt}</option>
                  {users.map((u) => <option key={u.id} value={u.id}>{u.fullName} ({u.role})</option>)}
                </select>
              </FieldT>
              <label className="flex items-center gap-2 text-xs crm-text cursor-pointer">
                <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} className="accent-[#c8a15a]" />
                <Repeat className="w-3.5 h-3.5 crm-gold" />
                {lang === "en" ? "Recurring — auto-create the next one when done" : "Повторяющаяся — создавать следующую при завершении"}
              </label>
              <div className="p-3 border crm-bd rounded-xl text-[11px] flex items-center gap-2 crm-gold" style={{ background: "var(--crm-surface-2)" }}>
                <MailWarning className="w-4 h-4 flex-shrink-0" /> {t.tasks.emailAlertNote}
              </div>
              <button type="submit" disabled={savingTask} className="crm-btn-primary w-full py-3">
                {savingTask ? <Loader2 className="w-5 h-5 animate-spin" /> : t.tasks.btnSaveTask}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {remindTask && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-backdrop">
          <div className="crm-card w-full max-w-sm p-6 relative animate-modal">
            <button onClick={() => setRemindTask(null)} className="absolute top-4 right-4 crm-muted hover:crm-text"><X className="w-5 h-5" /></button>
            <h3 className="text-lg font-bold border-b crm-bd pb-3 mb-4 flex items-center gap-2 crm-text"><BellPlus className="w-5 h-5 crm-gold" />{t.tasks.btnRemindMe}</h3>
            <p className="text-xs crm-muted mb-3">{remindTask.title}</p>
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <span className="text-[11px] crm-muted">{t.leads.remindIn}:</span>
              {[1, 3, 7, 14].map((d) => (
                <button key={d} onClick={() => { setRemDays(d); setRemDate(""); }} className={`text-[11px] px-2 py-1 rounded-lg border ${remDays === d ? "bg-[#c8a15a] text-[#08080a] border-transparent" : "crm-bd crm-muted"}`}>{d} {t.leads.days}</button>
              ))}
              <input type="date" value={remDate} onChange={(e) => { setRemDate(e.target.value); setRemDays(null); }} className="crm-input w-auto py-1 text-[11px]" />
            </div>
            <input value={remNote} onChange={(e) => setRemNote(e.target.value)} placeholder={t.leads.reminderNote} className="crm-input text-xs mb-4" />
            <button onClick={saveReminder} disabled={savingRem} className="crm-btn-primary w-full">
              {savingRem ? <Loader2 className="w-4 h-4 animate-spin" /> : t.tasks.btnRemindMe}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldT({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold uppercase crm-muted">{label}</label>
      {children}
    </div>
  );
}
