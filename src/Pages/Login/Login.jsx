import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import useAuthentication from "../../hooks/useAuthentication";
import useCreateToken from "../../hooks/useCreateToken";
import { useCreateNewUser } from "../../hooks/useNewUser";

const Login = () => {
  const {
    activeUser,
    setActiveUser,
    signInWithGoogleHandler,
    userError,
    setUserError,
    customSignInHandler,
  } = useAuthentication();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isLoading,data:newUser,mutate}=useCreateNewUser()

  const REDIRECT_URL = location.state?.from?.pathname || "/";

  const { isLoading: tokenLoading, data: Token } = useCreateToken(
    activeUser?.email
  );

  if (Token?.data.token) {
    console.log("From Registration Page, Token is:", Token?.data.token);
    localStorage.setItem("Token", Token?.data.token);
    navigate("/", { replace: true });
  }

  if (tokenLoading) {
    return <h1>Loading...</h1>;
  }

  const customSignInButtonHandler = (e) => {
    e.preventDefault();
    setUserError("");

    customSignInHandler(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setActiveUser(user);
        console.log("Custom User is:", user);
        console.log("Custom User Email is:", user.email);
        // setHoldEmail(user?.email)
      })
      .catch((error) => {
        const errorMessage = error.message;
        // console.log("Custom Log In Error is:", errorMessage);
        // toast(errorMessage);
        setUserError(errorMessage);
      });
    e.target.reset();
  };

  //   Sign in Google...............................
  const signInWithGoogleButtonHandler = () => {
    setUserError("");
    signInWithGoogleHandler()
      .then((result) => {
        const user = result.user;
        setActiveUser(user);
        // console.log("FRom GoogleLogin Button Handler, User is:", user);
        mutate({
          newUserName:user.displayName,
          newUserEmail:user.email
        })
      })
      .catch((error) => {
        const errorMessage = error.message;
        // console.log("Error in Google Sign In:", errorMessage);
        setUserError(errorMessage);
      });
  };

  return (
    <div className="login-div-parent  position-relative">
      <div className="login-div-child   px-5  position-absolute shadow-lg">
        <div className="row justify-content-center">
          <h3 className="mt-4 text-center text-secondary ">LOGIN</h3>

          <div className="col-md-12 ">
            <form onSubmit={customSignInButtonHandler}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <span className="fs-5">Email address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <span className="fs-5">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="fs-6">Forget Password?</span>
              </div>

              <button
                type="submit"
                className="btn btn-secondary btn-lg w-100 mt-3 mb-3"
              >
                LOGIN
              </button>
              <p className="text-danger text-center">{userError}</p>
            </form>
            <span className="fs-5">New to Doctors Portal?</span>
            <Link to="/register">
              <span className="fs-5 ms-2 mb-5 text-info">
                Create New Account
              </span>
            </Link>
          </div>
          <div className="mt-5 container">
            <div className="row align-items-center justify-content-around">
              <div className="col-5">
                <div className="border border-top-1 border-dark "></div>
              </div>
              <div className="col-1 fs-5 text-dark">OR</div>
              <div className="col-5">
                <div className="border border-top-1 border-dark"></div>
              </div>
            </div>
            <button
              onClick={signInWithGoogleButtonHandler}
              className="btn btn-outline-secondary w-100 my-4 btn-lg"
            >
              CONTINUE WITH GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
