import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";

import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { LOGIN, UPDATEPROFILE } from "../../navigation/CONSTANTS";
const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  let navigate = useNavigate();

  async function handleUpdateProfile() {
    navigate(UPDATEPROFILE);
  }
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate(LOGIN);
    } catch (e) {
      console.log(e);
      setError("Failed to log out");
    }
  }
  return (
    <div className="justify-center text-center  ">
      {error && (
        <Alert severity="error" className="text-center">
          {error}
        </Alert>
      )}
      <div className="flex flex-row justify-center p-10 space-x-4">
        <strong>Email: </strong>
        {currentUser && <p>{currentUser.email}</p>}
      </div>
      <div className="space-x-5">
        <Button
          style={{ backgroundColor: "#e63946", color: "" }}
          variant="contained"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </Button>
        <Button
          style={{ backgroundColor: "#04151f", color: "white" }}
          variant="contained"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>{" "}
    </div>
  );
};

export default Dashboard;
