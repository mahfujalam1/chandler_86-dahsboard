import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";

// src/components/Status.jsx
export default function Status() {
  const { data } = useGetDashboardStatusQuery();
  const statsData = data?.data;

  const stats = [
    { label: "Total User", value: statsData?.totalPlayers || 0 },
    { label: "Total Sargent", value: statsData?.totalCaoches || 0 },
    {
      label: "Total Products",
      value: statsData?.totalEarnings || 0,
    },
    { label: "Total Category", value: statsData?.totalSessions || 0 },
  ];

  const format = (s) =>
    s.currency
      ? new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: s.currency,
          minimumFractionDigits: 0,
        }).format(s.value)
      : new Intl.NumberFormat().format(s.value);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border bg-gray-100 p-6 text-center shadow-sm py-10"
        >
          <div className="text-3xl text-gray-600 font-semibold tabular-nums">
            {format(s)}
          </div>
          <div className="mt-2 text-lg text-gray-600">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
