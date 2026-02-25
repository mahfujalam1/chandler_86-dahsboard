/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import SignIn from "../page/Auth/SignIn/SignIn";
import Otp from "../page/Auth/Otp/Otp";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import SettingsPage from "../page/Settings/SettingsPage";
import AboutUsPage from "../page/AboutUs/AboutUsPage";
import EditAboutUs from "../page/EditAboutUs/EditAboutUs";
import PrivacyPolicyPage from "../page/PrivacyPolicy/PrivacyPolicyPage";
import EditPrivacyPolicy from "../page/EditPrivacyPolicy/EditPrivacyPolicy";
import TermsConditions from "../page/TermsConditions/TermsConditions";
import EditTermsConditions from "../page/EditTermsConditions/EditTermsConditions";
import UsersPage from "../page/Users/UsersPage";
import PlayerManagement from "../component/Main/surgeryManage/SurgeryManage";
import ReportTable from "../component/Main/Report/Report";
import ProfilePage from "../component/Main/Profile/ProfilePage";
import CancelRequest from "../component/Main/CancelRequest/CancelRequest";
import AdminRoutes from "./AdminRoutes";
import ErrorElement from "../component/errorElement/ErrorElement";
import ProductsTable from "../component/Main/ProductManage/ProductManage";
import SurgeryManage from "../component/Main/surgeryManage/SurgeryManage";
import SargentManage from "../component/Main/sargentManage/SargentManage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoutes>
        <MainLayout />
      </AdminRoutes>
    ),
    errorElement: <ErrorElement/>, 
    children: [
      {
        index: true,  
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "product-manage",
        element: <ProductsTable />,
      },
      {
        path: "sargent-manage",
        element: <SargentManage />,
      },
      {
        path: "surgery-manage",
        element: <SurgeryManage />,
      },
      {
        path: "refund-request",
        element: <CancelRequest />,
      },
      {
        path: "report",
        element: <ReportTable />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "settings/profile",
        element: <ProfilePage />,
      },
      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/settings/edit-privacy-policy/:id",
        element: <EditPrivacyPolicy />,
      },
      {
        path: "settings/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "/settings/edit-terms-conditions/:id",
        element: <EditTermsConditions />,
      },
      {
        path: "settings/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/settings/edit-about-us/:id",
        element: <EditAboutUs />,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <ErrorElement/>,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp/:email",
        element: <Otp />,
      },
      {
        path: "new-password/:email",
        element: <NewPassword />,
      },
    ],
  },
]);

export default router;
