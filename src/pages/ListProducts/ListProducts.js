import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { db } from '../../firebase';
import { useNavigate } from 'react-router';
import { ADDPRODUCT, DASHBOARD } from '../../navigation/CONSTANTS';
import { Button } from '@material-ui/core';
const ListProducts = () => {
    let navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        db.collection("flowers")
            .get()
            .then((querySnapshot) => {
                let arr = [];
                querySnapshot.docs.map((doc) =>
                    arr.push({ id: doc.id, ...doc.data() })
                );
                setDocuments(arr);
            });
    }, []);

    //func
    const goDashboardPage = () => {
        navigate(DASHBOARD);
    };
    const goAddProductPage = () => {
        navigate(ADDPRODUCT);
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
            field: "detail",
            headerName: "Detail",
            width: 500
        },

    ];
    return (
        <>
            <div className="md:w-4/5  sm:w-full" style={{ height: 350 }} >
                <DataGrid rows={documents} columns={columns} />
            </div>
            <div className="p-5 text-center justify-center space-x-8 flex flex-row ">
                <Button
                    variant="contained"
                    onClick={goAddProductPage}

                    style={{ backgroundColor: "#04151f", color: "white" }}
                >
                    <p className="text-l">Go Add Product Page</p>
                </Button>
                <Button
                    variant="contained"
                    onClick={goDashboardPage}
                    style={{ backgroundColor: "#04151f", color: "white" }}
                >
                    <p className="text-l">Go Dashboard</p>
                </Button>
            </div>
        </>
    )
}

export default ListProducts
