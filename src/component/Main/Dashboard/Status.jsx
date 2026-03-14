import { useGetAllOrdersQuery } from "../../../redux/features/order/orderApi";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";


export default function Status() {
  const { data: ordersRes } = useGetAllOrdersQuery({ page: 1, limit: 1 });
  const { data: usersRes } = useGetAllUsersQuery({ page: 1, limit: 10000, query:'' });
  console.log(usersRes)

  const totalOrders = ordersRes?.data?.totalOrders ?? ordersRes?.total ?? 0;
  const totalUsers = usersRes?.data?.total ?? usersRes?.total ?? 0;

  const stats = [
    { label: "Total Orders", value: totalOrders },
    { label: "Total Users", value: totalUsers },
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
