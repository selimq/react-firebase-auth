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
  const { signup, currentUser, signupWithGoogle, signupWithFacebook } = useAuth();
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
      navigate(DASHBOARD);
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
            <p className="text-xl "> Sign Up</p>
          </Button>
          <div className="p-2"></div>

          <Button
            variant="contained"
            onClick={signupWithGoogle}
            disabled={loading}
            style={{ backgroundColor: "#04151f", color: "white" }}
          >
            <div className="flex flex-row space-x-2 m-1">
              {/* google icon */}
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path
                    fill="#4285F4"
                    d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                  />
                </g>
              </svg>{" "}
              <p className="text-xl"> Google Sign </p>
            </div>
          </Button>
          <div className="p-2"></div>

          <Button
            variant="contained"
            onClick={signupWithFacebook}
            disabled={loading}
            style={{ backgroundColor: "#04151f", color: "white" }}
          >
            <div className="flex flex-row space-x-2 ">
              {/* fb icon */}
              <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAADLElEQVRYhe2WTUhVQRTH/+e+50dJmgR9GZGgmIUUFKkQ6SKCdkGL4m1yEbitTbR0U5sWtWrjKsoEIwlaBW5CkQpapFCGmhkpz+LhRwiW781pcd+de2fuzLv3au3egcd9Z2bOmd+ZOWdmgLKUZXtCoZa+Pqd2vjXDLBoc2SgAYTIXyic8yO93fRX8LuaF5cHrAwBx0CKtT+HC8GMC4I5kgEnaEXv27DkuhsXFT7ifyNPJ7yegPtPPy08xUBIILJrksmnOjTCIgLGMd5m4WZ/e0Rt8sP8Mw8pOSQmvEIS7RQhMyFB0BHTSdIABwSCxCRYF6Y8cAsgBUUoFjwZSnSeGyefRfWwPei+exKnm/ahMp7Cxmcfa+m+033gCVOzwx4twpViASsOQpst+UcC1rkbc7z1fTGRX6lCFfbtr1GAtW2bJoS3AMFBXybjT06XAmN2bYQBLDpGWQyVh2Ns+gXPHD6CmukJ6mllcxtW7L/Bl6Zdr76SU5DatRgjIEQDbYCyV5uXSkb21iq+HL99jLvcHVFGtjPeDC+eQveyTwAAAC+ysUuP7ml2F3L/AeNWfKuakjn3GCLfP+2myWSgALAIwcAGT5pBrGuPAY8aZxl3oaDkIgNFxtEHxdPlsC043rQAAPn37iZHJLIDAOWS4H63nUNzTt7vtMG5f6TR66blwQv6/NzSOkckl3x97watizKGtXAVRMrOQK+aTfmSoEplDUTBvphbxYPgtAKCztQHtrYekm+ejH/H9xxoA4N3nbMCl5y8OkPBzKAoGRBidymF0KgewwK1LeQXo0asJjE/nAsE5flUmv8vcpVUcBO8x+a4h38QkgX7y/HqBUdjIenXEgom4l6JXOSwGIKHCcFwYyyQJi8FSZWbjyEeaPkkEjGN4foSAZMOWX4y6RAWnSqyy/5cw6rMmDpBW9jYY07bOZ1fw+sOcdLW6vlECJnHZJ4MBCENjs3g2NgtZlcSAkzbDMABK8IRNBOMdSal0QC+xMkmuDmbMhE7TSBj707Y0DE/r8xuuFKb6TH/GEWhz9cCyiqDutzueruyAvh3+SjpuUBNLwzcHjcd1WcqyDfkLVaBCOHch5QQAAAAASUVORK5CYII=" />
              <p className="text-xl"> Facebook Sign </p>

            </div>
          </Button>

        </div>
      </form>
      <p className="text-center text-xl">
        Need an account ? {<Button onClick={goLoginPage}> Log In </Button>}
      </p>
    </div>
  );
};

export default SignUp;
