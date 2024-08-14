import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import RegistrationForm from "./pages/AgRegistrationForm";
import UserDashboard from "./component/user/UserDashboard";
import SendMony from "./component/user/SendMony";
import CashOut from "./component/user/CashOut";
import UserTransHistory from "./component/user/UserTransHistory";
import AgentDashboard from "./component/agent/AgentDashboard";
import MainDashboard from "./component/agent/MainDashboard";
import RegisterForm from "./pages/UsRegisterForm";
import LoginForm from "./pages/Login";
// import Dashboard from "./component/Dashboard";
import RagisterDashboard from "./pages/RagisterDashboard";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./component/Admin/AdminDashboard";
import AllUser from "./component/Admin/AllUser";
import AllAgent from "./component/Admin/AllAgent";
import PendingUser from "./component/Admin/PendingUser";
import CashInPage from "./component/user/CashIn";
import PendingCashInRequests from "./component/agent/PendingCashInRequests";
import AgentTransHistory from "./component/agent/AgentTransectionHistory";
import PendingAgent from "./component/Admin/PendingAgent";
import AllTransection from "./component/Admin/AllTransection";
import BlockUser from "./component/Admin/Block";
import PrivetRout from "./provider/PrivetRout";
import AdminPrivetRout from "./provider/AdminPrivetRout";
import AgentPriverRout from "./provider/AgentPrivetRout";
import UserPrivetRout from "./provider/UserPrivetRout";
import AdminMainDashboard from "./component/Admin/AdminMainDashboard";
import UserWel from "./component/user/UserWel";
import WaitingPage from "./pages/WaitingPage";
import ErrorPage from "./pages/ErrorPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <LandingPage></LandingPage>
      },
      {
        path: "/error",
        element: <ErrorPage></ErrorPage>
      },
      {
        path: "/reg-dashboard",
        element: <RagisterDashboard></RagisterDashboard>,
        children: [
          {
            path: "/reg-dashboard/ag-register",
            element:<RegistrationForm></RegistrationForm>,
          },
          {
            path: "/reg-dashboard/us-register",
            element: <RegisterForm></RegisterForm>
          },
           ]
      },
      {
        path: "/login",
        element: <LoginForm></LoginForm>
      },

      {
        path: "/admin-dashboard",
        element: <AdminPrivetRout><AdminMainDashboard></AdminMainDashboard></AdminPrivetRout>,
        children: [
          {
            path: "/admin-dashboard/admin",
            element: <AdminPrivetRout> <AdminDashboard></AdminDashboard></AdminPrivetRout>,
          },
          {
            path: "/admin-dashboard/admin/all-users",
            element: <AllUser></AllUser>
          },
          {
            path: "/admin-dashboard/admin/all-agent",
            element: <AllAgent></AllAgent>
          },
          {
            path: "/admin-dashboard/admin/pending-users",
            element: <PendingUser></PendingUser>
          },
          {
            path: "/admin-dashboard/admin/pending-agent",
            element: <PendingAgent></PendingAgent>
          },
          {
            path: "/admin-dashboard/admin/transection",
            element: <AllTransection></AllTransection>
          },
          {
            path: "/admin-dashboard/admin/block",
            element: <BlockUser></BlockUser>
          },
        ],
      },
      {
        path: "/user-dashboard",
        element: <UserPrivetRout><UserDashboard></UserDashboard></UserPrivetRout>,
        children: [
          {
            path: "/user-dashboard/user-well",
            element: <UserWel></UserWel>
          },
            {
                path: "/user-dashboard/user-wellcome",
                element: <CashInPage></CashInPage>
            },
            {
                path:"/user-dashboard/send-money",
                element: <SendMony></SendMony>
            },
            {
                path:"/user-dashboard/cash-Out",
                element: <CashOut></CashOut>
            },
            {
                path:"/user-dashboard/history",
                element: <UserTransHistory></UserTransHistory>
            },
        ]
      },
      {
        path:"/waiting",
        element: <WaitingPage></WaitingPage>
      },
      {
        path: "/agent-dashboard",
        element: <AgentPriverRout><AgentDashboard></AgentDashboard></AgentPriverRout>,
        children: [
            {
                path:"/agent-dashboard/main-dashboard",
                element: <MainDashboard></MainDashboard>
            },
            {
                path:"/agent-dashboard/cashin",
                element: <PendingCashInRequests></PendingCashInRequests>
            },
            {
                path:"/agent-dashboard/history",
                element: <AgentTransHistory></AgentTransHistory>
            }
        ]
      }
    ],
  },
]);