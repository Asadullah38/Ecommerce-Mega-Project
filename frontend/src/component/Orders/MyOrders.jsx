import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { myOrderItems } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader.jsx/Loader';
import { ReactNotifications } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import { Launch } from "@mui/icons-material"

const MyOrders = () => {
    let rows = []

    const columns = [
        { field: "id", headerName: "Order No.", minWidth: 250, hideable: false },
        { field: "orderID", headerName: "Order ID", minWidth: 250, hideable: false },
        { field: "Status", headerName: "Status", minWidth: 250, hideable: false },
        { field: "Amount", headerName: "Amount", minWidth: 250, hideable: false },
        {
            field: "Details",
            flex: 0.3,
            headerName: "Details",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/MyOrders/${params.row.orderID}`}>
                        <Launch />
                    </Link>
                );
            },
        },
    ];

    const dispatch = useDispatch()
    const { loading, error, myOrders } = useSelector((state) => state.myOrders);

    myOrders && myOrders.forEach((item, ind) => {
        rows.push({
            id: ind,
            orderID: item._id,
            Status: item.orderStatus,
            Amount: item.totalPrice,
        })
    })
    useEffect(() => {
        dispatch(myOrderItems());
    }, [])

    if (error) {
        Notification("Error", error, "danger");
    }

    return (<div>
        {loading ? <Loader /> :
            <div style={{ "marginTop": "100px", marginLeft: "50px", marginRight: "50px" }}>
                <ReactNotifications />
                <DataGrid rows={rows} pageSize={10} rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    className="myOrdersTable"
                    autoHeight
                    columns={columns} />
            </div>
        }
    </div>
    )
}

export default MyOrders
