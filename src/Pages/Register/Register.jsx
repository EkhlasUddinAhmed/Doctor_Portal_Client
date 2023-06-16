import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCreateToken from "../../hooks/useCreateToken";
import { useCreateNewUser } from "../../hooks/useNewUser";


const Register = () => {
  const {
    activeUser,
    userError,
    setUserError,
    setActiveUser,
    registrationHandler,
    updateProfileName,
  } = useAuthentication();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  

  const { isLoading: userloading, mutate, data } = useCreateNewUser();

  
  const email = data?.data.newUserEmail;

  const { isLoading: tokenLoading, data: Token } = useCreateToken(email);

  if (userloading || tokenLoading) {
    return <h1>Loading...</h1>;
  }

  const gotToken = Token?.data.token;
  if (gotToken) {
    console.log("From Registration Page, Token is:", gotToken);
    localStorage.setItem("Token", gotToken);
    navigate("/", { replace: true });
  }

  const registrationButtonHandler = (e) => {
    e.preventDefault();
    setUserError("");

    registrationHandler(userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        const email = user.email;

        updateProfileNameHandler({ displayName: userName }, email);
       

        toast("Your Registration is Successfull");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setUserError(error.message);
        console.log("Active User Error is:", errorMessage);
      });
  };

  const updateProfileNameHandler = (userObj, email) => {
    updateProfileName(userObj)
      .then(() => {
        // console.log("From Update Profile Name:Email is:", email);
        mutate({
          newUserName: userName,
          newUserEmail: userEmail,
        });
      })
      .catch((error) => {
        // console.log("Name Updated Error:",error);
        setUserError(error.message);
      });
  };

  return (
    <div className="login-div-parent  position-relative">
      <div className="login-div-child   px-5 position-absolute shadow-lg">
        <div className="row justify-content-center">
          <h3 className="mt-4 text-center text-secondary ">
            Create Your Account
          </h3>
          <div className="col-md-12 ">
            <form onSubmit={registrationButtonHandler}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <span className="fs-5">Your Name</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  name="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <span className="fs-5">Email address</span>
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  name="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <span className="fs-5">Password</span>
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  name="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-secondary btn-lg w-100 mt-3 mb-3"
              >
                Create Account
              </button>
              <p className="text-center text-danger">{userError}</p>
            </form>
            <span className="fs-5">Already Have an Account?</span>
            <Link to="/login">
              <span className="fs-5 ms-2 mb-5  text-info ">Go to LogIn</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
