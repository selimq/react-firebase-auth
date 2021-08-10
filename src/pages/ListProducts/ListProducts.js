import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router";
import {
  ADDPRODUCT,
  DASHBOARD,
  UPDATEPRODUCT,
} from "../../navigation/CONSTANTS";
import { Button } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import { Alert } from "@material-ui/lab";
const ListProducts = () => {
  let navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [documents, setDocuments] = useState([]);
  let storageRef = storage.ref("images");

  //func
  //GETTİNG ITEMS FROM FIRESTORE
  const getItemsFromFirestore = () => {
    db.collection("flowers")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({ id: doc.id, ...doc.data() })
        );
        setDocuments(arr);
      });
  };
  useEffect(() => {
    getItemsFromFirestore();
  }, []);
  //DELETE FUNCTİON FOR PRODUCT FROMFIRESTORE
  function deleteProduct(id) {
    const promises = [];
    setError("");
    setSuccess(false);
    if (id !== null) {
      promises.push(deleteItemWithId(id));
      promises.push(deleteImageWithId(id));
    }
    Promise.all(promises)
      .then(() => {
        setSuccess(true);
        setDocuments(documents.filter((e) => e.id !== id));
      })
      .catch((err) => {
        setError("Failed to delete product", err);
        setSuccess(false);
      });
  }
  function deleteItemWithId(id) {
    db.collection("flowers").doc(id).delete();
  }
  //
  function deleteImageWithId(id) {
    storageRef.child(id).delete();
  }

  function setImageWhenClick(id) {
    // Create a reference to the file we want to download
    var starsRef = storageRef.child(id);
    // Get the download URL
    starsRef.getDownloadURL().then((url) => {
      setPhotoUrl(url);
    });
  }

  //NAVıGATE FUNC
  const goDashboardPage = () => {
    navigate(DASHBOARD);
  };
  const goAddProductPage = () => {
    navigate(ADDPRODUCT);
  };
  const goUpdateProductPage = (rowData) => {
    navigate(UPDATEPRODUCT, { state: rowData });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100, hide: true },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 120,
      valueFormatter: (params) => {
        const valueFormatted = params.value + "$";
        return `${valueFormatted} `;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 130,
    },
    {
      field: "image",
      headerName: "Image",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          setImageWhenClick(params.row.id);
        };
        return (
          <Button color="primary" onClick={onClick} variant="contained">
            <ImageIcon />
          </Button>
        );
      },
    },
    {
      field: "update",
      headerName: "Update",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          //sending params.row
          console.log(params.row);
          goUpdateProductPage(params.row);
        };
        return (
          <Button color="primary" onClick={onClick} variant="contained">
            Update{" "}
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          deleteProduct(params.row.id);
        };
        return (
          <Button color="secondary" onClick={onClick} variant="contained">
            Delete{" "}
          </Button>
        );
      },
    },
    {
      field: "detail",
      headerName: "Detail",
      width: 500,
    },
  ];

  return (
    <>
      {error && (
        <Alert severity="error" className="text-center">
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" className="text-center">
          Product completely deleted
        </Alert>
      )}
      <div className="flex flew-row space-x-5">
        <div className="w-4/6">
          <div style={{ height: 350 }}>
            <DataGrid rows={documents} columns={columns} />{" "}
          </div>{" "}
          <div className="p-5 text-center justify-center space-x-8 flex flex-row ">
            <Button
              variant="contained"
              onClick={goAddProductPage}
              style={{ backgroundColor: "#04151f", color: "white" }}
            >
              <p className="text-l"> Go Add Product Page </p>{" "}
            </Button>{" "}
            <Button
              variant="contained"
              onClick={goDashboardPage}
              style={{ backgroundColor: "#04151f", color: "white" }}
            >
              <p className="text-l"> Go Dashboard </p>{" "}
            </Button>{" "}
          </div>{" "}
        </div>{" "}
        {/* JUST SHOWING IMAGE OF PRODUCT */}{" "}
        <div className="flex-1">
          <img src={photoUrl} alt="" />
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default ListProducts;
