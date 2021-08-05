import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  ADDPRODUCT,
  LISTPRODUCTS,
  LOGIN,
  UPDATEPROFILE,
} from "../../navigation/CONSTANTS";
const Dashboard = () => {
  //vars
  const { currentUser, logout, sendEmailVerify, deleteAccount } = useAuth();
  const [error, setError] = useState("");
  let navigate = useNavigate();

  //func
  function goAddProductPage() {
    navigate(ADDPRODUCT);
  }
  function goListProductsPage() {
    navigate(LISTPRODUCTS);
  }

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
      <div className="space-x-5 flex flex-row justify-center">
        <div>
          <Button
            variant="contained"
            style={{ backgroundColor: "black", color: "white" }}
            onClick={goAddProductPage}
          >
            Add Product
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            style={{ backgroundColor: "black", color: "white" }}
            onClick={goListProductsPage}
          >
            List Product
          </Button>
        </div>
      </div>
      <div className=" space-y-4 p-5">
        {currentUser && currentUser.emailVerified ? (
          <p></p>
        ) : (
          <div>
            <p>Email is not verified</p>
            <Button
              style={{ backgroundColor: "black", color: "white" }}
              variant="contained"
              onClick={sendEmailVerify}
            >
              Verify Email
            </Button>
          </div>
        )}
        <Button
          style={{ backgroundColor: "black", color: "white" }}
          variant="contained"
          onClick={deleteAccount}
        >
          Delete Account
        </Button>
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
