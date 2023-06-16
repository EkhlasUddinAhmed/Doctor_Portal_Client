import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home/Home";
import Appointment from "../../Pages/Appointment/Appointment";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import About from "../../Pages/About/About";
import Reviews from "../../Pages/Reviews/Reviews";
import NotFound from "../../Pages/NotFound/NotFound";
import Protected from "../../Protected/Protected";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Dashboardlayout from "../../Layout/Dashboardlayout/Dashboardlayout";
import AllUsers from "../../Pages/AllUsers/AllUsers";
import AdminProtectedRoute from "../../Pages/AdminProtectedRoute/AdminProtectedRoute";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctor from "../../Pages/Dashboard/AddDoctor/ManageDoctor";
import Payment from "../../Payment/Payment";
import PaymentSuccess from "../../PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../../Pages/AdminProtectedRoute/PaymentFailed/PaymentFailed";
import PaymentCancel from "../../PaymentCancel/PaymentCancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/appointment",
        element: (
          <Protected>
            <Appointment />
          </Protected>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/payment",
        element: <Payment/>,
      },
      {
        path: "/payment/success",
        element: <PaymentSuccess/>,
      },
      {
        path: "/payment/fail",
        element: <PaymentFailed/>,
      },
      {
        path: "/payment/cancel",
        element: <PaymentCancel/>,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <Dashboardlayout />
      </Protected>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminProtectedRoute>
            <AllUsers />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/dashboard/adddoctor",
        element: (
          <AdminProtectedRoute>
            <AddDoctor />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/dashboard/managedoctor",
        element: <ManageDoctor/>
      },
    ],
  },
]);

export default router;
