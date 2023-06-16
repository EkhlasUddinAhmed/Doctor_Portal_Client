import React from "react";
import { Link } from "react-router-dom";
import useAuthentication from "../../../hooks/useAuthentication";

const Header = () => {
  const { activeUser, setActiveUser, signOutHandler } = useAuthentication();

  const signOutClickHandler = () => {
    signOutHandler()
      .then(() => {
        console.log("Sign Out SuccessFul");
        setActiveUser({});
        localStorage.clear();
      })
      .catch((error) => {
        console.log("Sign Out Error:",error.message);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            DOCTORS PORTAL
          </Link>
          <h4 className="text-danger">
            {activeUser?.email && activeUser.email}
          </h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-2 text-primary"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active fs-2 text-primary"
                  aria-current="page"
                  to="/appointment"
                >
                  Appointment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active fs-2 text-primary"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active fs-2 text-primary"
                  aria-current="page"
                  to="/payment"
                >
                  Payment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active fs-2 text-primary"
                  aria-current="page"
                  to="/reviews"
                >
                  Reviews
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active fs-2 text-primary"
                  aria-current="page"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              {activeUser?.email ? (
                <li className="nav-item">
                  <Link
                    onClick={signOutClickHandler}
                    className="nav-link active fs-2 text-primary"
                    aria-current="page"
                    to="/"
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-2 text-primary"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-2 text-primary"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <button
          className="navbar-toggler m-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#dashboard"
          aria-controls="dashboard"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
    </div>
  );
};

export default Header;
