import React, { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../context/AuthContext";
import { DASHBOARD } from "../../navigation/CONSTANTS";
import { useNavigate } from "react-router";
const UpdateProfile = () => {
    let navigate = useNavigate();

    const goDashboard = () => {
        navigate(DASHBOARD);
    };

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser, updateEmail, updatePassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(emailRef.current.value);
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate(DASHBOARD)
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => { setLoading(false) })
    };
    return (
        <div className=" md:w-1/3 sm:2/3 m-auto" onSubmit={handleSubmit}>
            <p className="text-4xl text-center">Update Profile</p>
            <form className="m-10" method="post">
                {error && (
                    <Alert severity="error" className="text-center">
                        {error}
                    </Alert>
                )}


                <div key="mail">
                    <p className="text-xl my-3"> E-Mail</p>
                    <TextField
                        required
                        defaultValue={currentUser.email}
                        inputRef={emailRef}
                        id="email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        onChange={() => { }}
                    />
                </div>
                <div key="password">
                    <p className="text-xl my-3">Password</p>
                    <TextField
                        placeholder="Leave blank to keep the same"
                        id="password"
                        inputRef={passwordRef}
                        type="password"
                        variant="outlined"
                        fullWidth
                        onChange={() => { }}
                    />
                </div>
                <div key="password-confirm">
                    <p className="text-xl my-3"> Confirm Password</p>
                    <TextField
                        placeholder="Leave blank to keep the same"
                        inputRef={passwordConfirmRef}
                        type="password"
                        id="password-confirm"
                        variant="outlined"
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
                        <p className="text-xl m-2"> Update</p>
                    </Button>
                </div>
            </form>
            <p className="text-center text-xl">
                {
                    <Button onClick={goDashboard}>
                        Cancel
                    </Button>
                }
            </p>
        </div>
    );
};

export default UpdateProfile;
