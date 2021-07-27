import React, { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../context/AuthContext";
import { DASHBOARD, LOGIN } from "../../navigation/CONSTANTS";
import { useNavigate } from "react-router";
const SignUp = () => {
  let navigate = useNavigate();

  const goLoginPage = () => {
    navigate(LOGIN);

  };


  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(emailRef.current.value);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      await signup(emailRef.current.value, passwordRef.current.value);
      setLoading(true);
      setSuccess(true);
      navigate(DASHBOARD)
    } catch (error) {
      setError("Failed to create an account ");
      console.log(error);
      setSuccess(false);
    }
    setLoading(false);
  };
  return (
    <div className=" md:w-1/3 sm:2/3 m-auto" onSubmit={handleSubmit}>
      <p className="text-4xl text-center"> Sign Up</p>
      <form className="m-10" method="post">
        {error && (
          <Alert severity="error" className="text-center">
            {error}
          </Alert>
        )}
        {success && (
          <Alert className="text-center">
            Login success User = {currentUser.email}
          </Alert>
        )}

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
        <div key="password-confirm">
          <p className="text-xl my-3"> Confirm Password</p>
          <TextField
            required
            inputRef={passwordConfirmRef}
            type="password"
            id="password-confirm"
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
            <p className="text-xl m-2"> Sign Up</p>
          </Button>
        </div>
      </form>
      <p className="text-center text-xl">
        Need an account ?{" "}
        {
          <Button onClick={goLoginPage}>
            {" "}
            Log In{" "}
          </Button>
        }
      </p>
    </div>
  );
};

export default SignUp;
