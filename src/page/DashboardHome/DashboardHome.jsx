
import OrdersTable from "../../component/Main/Dashboard/OrderManage";
import Status from "../../component/Main/Dashboard/Status";
const DashboardHome = () => {
  return (
    <section>
      <div className="px-3 space-y-10">
        <Status />
        <OrdersTable />
      </div>
    </section>
  );
};

export default DashboardHome;
