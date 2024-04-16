import Header from "@/components/Header";
import { DashboardHeaderInfo } from "@/constants/labels";

const Dashboard = () => {
  return (
    <div>
      <Header title={DashboardHeaderInfo.title} />
    </div>
  );
};

export default Dashboard;
