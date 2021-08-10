import React, { useRef, useState } from "react";
import { Button, Typography, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { db, storage } from "../../firebase";
import { useNavigate, useLocation } from "react-router";
import { DASHBOARD, LISTPRODUCTS } from "../../navigation/CONSTANTS";
const UpdateProduct = () => {
  let location = useLocation();
  const currentProduct = location.state;

  const productName = useRef({ value: currentProduct.name });
  const productQuantity = useRef({ value: currentProduct.quantity });
  const productPrice = useRef({ value: currentProduct.price });
  const productDetail = useRef({ value: currentProduct.detail });
  /*   const productPhotoPath = useRef(); */

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //image
  const [selectedFile, setSelectedFile] = useState();
  let navigate = useNavigate();

  //funcs
  const goDashboardPage = () => {
    navigate(DASHBOARD);
  };
  const goListProductsPage = () => {
    navigate(LISTPRODUCTS);
  };

  const changeHandler = async (event) => {
    let image = event.target.files[0];
    setSelectedFile(image);
  };
  //image func
  const sendPhoto = async (docId) => {
    let storageRef = storage.ref("images");

    try {
      await storageRef.child(docId).put(selectedFile);
    } catch (error) {
      console.log("error", error);
    }
  };
  const updateValue = async () => {
    setLoading(true);
    db.collection("flowers")
      .doc(currentProduct.id)
      .set({
        name: productName.current.value,
        quantity: productQuantity.current.value,
        price: productPrice.current.value,
        detail: productDetail.current.value,
      })
      .then(() => {
        setError("");

        //!send photo
        sendPhoto(currentProduct.id);
        setSuccess(true);
      })
      .catch((error) => {
        console.error(error);
        setError("Error writing value : ", error);
        setSuccess(false);
      });
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateValue();

    goListProductsPage();
  };
  return (
    <>
      {" "}
      <Typography variant="h4" color="initial" className="p-5 text-center ">
        Update Product{" "}
      </Typography>{" "}
      <div className="md:w-2/3 sm:2/3 m-auto">
        {" "}
        <form className="m-10 " method="post" onSubmit={handleSubmit}>
          {" "}
          {error && (
            <Alert severity="error" className="text-center">
              {" "}
              {error}{" "}
            </Alert>
          )}{" "}
          {success && <Alert className="text-center"> Product updated </Alert>}{" "}
          <div>
            <p className="text-xl my-3"> Product Name </p>{" "}
            <TextField
              required
              inputRef={productName}
              id="name"
              variant="outlined"
              type="text"
              fullWidth
              size="small"
              defaultValue={productName.current.value}
            />{" "}
          </div>{" "}
          <div>
            <p className="text-xl my-3"> Product Quantity </p>{" "}
            <TextField
              required
              type="number"
              id="quantity"
              inputRef={productQuantity}
              variant="outlined"
              fullWidth
              size="small"
              defaultValue={productQuantity.current.value}
              onChange={(event) =>
                event.target.value < 0
                  ? (event.target.value = 0)
                  : event.target.value
              }
            />{" "}
          </div>{" "}
          <div>
            <p className="text-xl my-3"> Product Price </p>{" "}
            <TextField
              required
              inputRef={productPrice}
              id="price"
              variant="outlined"
              type="number"
              fullWidth
              size="small"
              defaultValue={productPrice.current.value}
              onChange={(event) =>
                event.target.value < 0
                  ? (event.target.value = 0)
                  : event.target.value
              }
            />{" "}
          </div>{" "}
          <div>
            <p className="text-xl my-3"> Product Detail </p>{" "}
            <TextField
              required
              type="text"
              id="quantity"
              inputRef={productDetail}
              defaultValue={productDetail.current.value}
              variant="outlined"
              multiline
              fullWidth
              inputProps={{
                maxLength: 500,
              }}
            />{" "}
          </div>{" "}
          <div>
            <p className="text-xl my-3"> Product Image </p>{" "}
            <input
              type="file"
              onChange={(e) => changeHandler(e)}
              accept="image/*"
            ></input>{" "}
          </div>{" "}
          <div className="p-5 text-center justify-center  md:space-x-5">
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#04151f", color: "white" }}
            >
              <p className="text-l"> Update Product </p>{" "}
            </Button>{" "}
            <Button
              variant="contained"
              onClick={goDashboardPage}
              style={{ backgroundColor: "#04151f", color: "white" }}
            >
              <p className="text-l"> Go Dashboard </p>{" "}
            </Button>{" "}
            <Button
              variant="contained"
              onClick={goListProductsPage}
              style={{ backgroundColor: "#04151f", color: "white" }}
            >
              <p className="text-l"> Go List of Products </p>{" "}
            </Button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </>
  );
};
export default UpdateProduct;
