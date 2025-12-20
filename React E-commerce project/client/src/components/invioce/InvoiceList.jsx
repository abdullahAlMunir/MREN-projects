import React from 'react';
import CartStore from '../../store/CartStore';
import { useEffect } from 'react';
import CartSkeleton from '../../skeleton/CartSkeleton';
import NoData from '../layout/NoData';
import { Link } from 'react-router-dom';

const InvoiceList = () => {
    const { InvoiceList, InvoiceListRequest } = CartStore();

    useEffect(() => {
        (async () => {
            await InvoiceListRequest();
        })()
    }, [InvoiceListRequest])



    if (!Array.isArray(InvoiceList)) {
        return <CartSkeleton />
    } else if (InvoiceList.length === 0) {
        return (
            <NoData />
        )
    } else {
        return (
            <div className="container mt-3">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold fs-1">Your Orders</h2>
                        <p className="text-muted fs-5">
                            View your recent purchases and download invoices for your records.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            <ul className="list-group list-group-flush">
                                {
                                    InvoiceList.map((item) => {
                                        return (<li className="list-group-item d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <div className="">
                                                    <p className="m-1"><b>Invoice No::</b> {item['tansectionID']}</p>
                                                    <p className="m-1"><b>Customer:</b> {item['customerDetails']}</p>
                                                    <p className="m-1"><b>Shipping: </b>{item['shippingDetails']}</p>
                                                    <p className="m-1"><b>Payment: </b>{item['paymentStatus']}</p>
                                                    <p className="m-1"><b>Delivery: </b> {item['deliveryStatus']}</p>
                                                </div>
                                            </div>
                                            <Link className="btn btn-Success" to={`/invoice/${item['_id']}`}>Details</Link>
                                        </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

};

export default InvoiceList;