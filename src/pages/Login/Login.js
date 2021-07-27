import React, { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { DASHBOARD, FORGOTPASSWORD, SIGNUP } from "../../navigation/CONSTANTS";

const Login = () => {
  let navigate = useNavigate();

  const goSignUpPage = () => {
    navigate(SIGNUP);
  };
  const goDashboard = () => {
    navigate(DASHBOARD);
  };
  const goForgotPassword = () => {
    navigate(FORGOTPASSWORD);
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(true);
      setSuccess(true);
      goDashboard();
    } catch (error) {
      setError("Failed to login< ");
      console.log(error);
      setSuccess(false);
    }
    setLoading(false);
  };

  return (
    <div className=" md:w-1/3 sm:2/3 m-auto" onSubmit={handleSubmit}>
      <p className="text-4xl text-center mt-10"> Log In</p>
      <form className="m-10" method="post">
        {error && (
          <Alert severity="error" className="text-center">
            {error}
          </Alert>
        )}
        {success && <Alert className="text-center">Login success</Alert>}

        <div key="mail">
          <p className="text-xl my-3"> E-Mail</p>
          <TextField
            required
            inputRef={emailRef}
            id="email"
            variant="outlined"
            type="email"
            fullWidth
          />
        </div>
        <div key="password">
          <p className="text-xl my-3">Password</p>
          <TextField
            required
            id="password"
            inputRef={passwordRef}
            type="password"
            variant="outlined"
            fullWidth
          />
        </div>

        <div key="button" className="text-center my-5">
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "#04151f", color: "white" }}
          >
            <p className="text-xl m-2"> Log In</p>
          </Button>
        </div>
      </form>
      <div className="text-center">
        <Button type="outlined" onClick={goForgotPassword}>
          Forgot password ?
        </Button>
      </div>
      <p className="text-center text-xl">
        Need an account ?
        {
          <Button type="outlined" onClick={goSignUpPage}>
            Sign Up
          </Button>
        }
      </p>
    </div>
  );
};

export default Login;
