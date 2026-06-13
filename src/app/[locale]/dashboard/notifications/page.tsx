"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Bell, AlertTriangle, ListChecks, ShieldCheck, Info, CheckCheck, Trash2 } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  issue: <AlertTriangle className="w-4 h-4 text-red-500" />,
  task: <ListChecks className="w-4 h-4 text-blue-500" />,
  inspection: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
  system: <Info className="w-4 h-4 text-violet-500" />,
  reminder: <Bell className="w-4 h-4 text-amber-500" />,
};

const typeBg: Record<string, string> = {
  issue: "bg-red-50",
  task: "bg-blue-50",
  inspection: "bg-emerald-50",
  system: "bg-violet-50",
  reminder: "bg-amber-50",
};

export default function NotificationsPage() {
  const supabase = createClient();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase.from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("sent_at", { ascending: false });
    if (data) setNotifications(data);
    setLoading(false);
  }

  async function markRead(id: string) {
    await supabase.from("notifications").update({ is_read: true, read_at: new Date().toISOString() }).eq("id", id);
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  }

  async function markAllRead() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("notifications").update({ is_read: true, read_at: new Date().toISOString() }).eq("user_id", user.id).eq("is_read", false);
    setNotifications(notifications.map((n) => ({ ...n, is_read: true })));
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Notifications</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : "No new notifications"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-brand-600 hover:bg-brand-50 transition-colors">
            <CheckCheck className="w-4 h-4" /> Mark All as Read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.length === 0 && (
          <div className="text-center py-12 text-zinc-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        )}
        {notifications.map((n) => (
          <button
            key={n.id}
            onClick={() => !n.is_read && markRead(n.id)}
            className={`w-full text-right bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 transition-colors hover:shadow-md ${
              !n.is_read ? "border-r-4 border-r-brand-500" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl ${typeBg[n.type] || "bg-zinc-50"} flex items-center justify-center shrink-0`}>
                {typeIcons[n.type] || <Bell className="w-4 h-4 text-zinc-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${n.is_read ? "text-zinc-600" : "text-zinc-900 font-semibold"}`}>{n.title}</p>
                {n.body && <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{n.body}</p>}
                <p className="text-xs text-zinc-400 mt-1">
                  {new Date(n.sent_at).toLocaleDateString("en-US", {
                    hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
              {!n.is_read && <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 shrink-0" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
