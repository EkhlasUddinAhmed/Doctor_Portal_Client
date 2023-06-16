import React, { useState } from "react";
import Header from "../../Pages/Shared/Header/Header";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import { Link, Outlet } from "react-router-dom";
import "./Dashboardlayout";
import { useCheckUserAdmin } from "../../hooks/useNewUser";
import useAuthentication from "../../hooks/useAuthentication";
const Dashboardlayout = () => {
  const {isLoading,activeUser } = useAuthentication();
  // const [holdingEmail, setHoldingEmail] = useState("");
  const {data} = useCheckUserAdmin(activeUser?.email);

  console.log("From Dashboardlayout: Data is:", data);

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  return (
    <div>
      <Header />
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 ">
              <div
                className=" offcanvas-md  offcanvas-start "
                data-bs-scroll="true"
                tabIndex="-2"
                id="dashboard"
                aria-labelledby="dashboardLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="dashboard">
                    Dashboard
                  </h5>
                </div>
                <div className="">
                  <h4>
                    <Link to="/dashboard" className="text-secondary">
                      My Appointment
                    </Link>
                  </h4>
                 { data?.data.isAdmin && <>
                  <h4>
                  <Link to="/dashboard/allusers" className="text-secondary">
                    All Users
                  </Link>
                </h4>
                <h4>
                  <Link to="/dashboard/addDoctor" className="text-secondary">
                    Add New Doctor
                  </Link>
                </h4>
                <h4>
                  <Link to="/dashboard/managedoctor" className="text-secondary">
                    Manage Doctor
                  </Link>
                </h4>
                 </>}
                </div>
              </div>
            </div>
            <div className="col-md-10  px-5 bg-body-secondary">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
