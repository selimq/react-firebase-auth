import React, { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { LOGIN, SIGNUP } from "../../navigation/CONSTANTS";



const ForgotPassword = () => {
    let navigate = useNavigate();

    const goLogin = () => {
        navigate(LOGIN);
    };
    const goSignUpPage = () => {
        navigate(SIGNUP);
    };
    const emailRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            await resetPassword(emailRef.current.value);
            setLoading(true);
            setSuccess(true);
        } catch (error) {
            setError("Failed to reset ");
            console.log(error);
            setSuccess(false);
        }
        setLoading(false);
    };

    return (
        <div className=" md:w-1/3 sm:2/3 m-auto" onSubmit={handleSubmit}>
            <p className="text-4xl text-center mt-10"> Password Reset</p>
            <form className="m-10" method="post">
                {error && (
                    <Alert severity="error" className="text-center">
                        {error}
                    </Alert>
                )}
                {success && <Alert className="text-center">Password reset success. Please check your email for further instructions.</Alert>}

                <div key="mail">
                    <p className="text-xl my-3"> E-Mail</p>
                    <TextField
                        required
                        inputRef={emailRef}
                        id="email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        onChange={() => { }}
                    />
                </div>


                <div key="button" className="text-center my-5">
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        style={{ backgroundColor: "#04151f", color: "white" }}
                    >
                        <p className="text-l m-2"> Reset Password</p>
                    </Button>
                </div>
            </form>
            <div className="text-center">
                <Button type="outlined" onClick={goLogin}>
                    Login
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

export default ForgotPassword
