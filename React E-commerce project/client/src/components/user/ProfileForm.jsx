import React, { useEffect } from 'react';
import UserStore from '../../store/UserStore';
import toast from 'react-hot-toast';
import ProfileSkeleton from '../../skeleton/ProfileSkeleton';

const ProfileForm = () => {

    let { ProfileDetails, ProfileForm, ProfileFormOnChange, ProfileDetailsRequest, ProfileSaveRequest } = UserStore();

    useEffect(() => {
        (async () => {
            await (ProfileDetailsRequest());
        })()
    }, [ProfileDetailsRequest])

    const Save = async () => {
        let res = ProfileSaveRequest(ProfileForm);
        if (res) {
            toast.success("Profile updated Successfully.");
            await ProfileDetailsRequest();
        }
    }

    if (ProfileDetails === null) {
        return (
            <ProfileSkeleton />
        )
    } else {
        return (
            <div className="container mt-5">
                <div className="card p-5 rounded-3">
                    <h6>Customer Details</h6>
                    <hr />
                    <div className="row mb-4">
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Name </label>
                            <input value={ProfileForm.customerName} onChange={(e) => { ProfileFormOnChange("customerName", e.target.value) }} type="text" className="form-control" />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Phone </label>
                            <input value={ProfileForm.customerPhone} onChange={(e) => { ProfileFormOnChange("customerPhone", e.target.value) }} type="text" className="form-control" />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Fax </label>
                            <input value={ProfileForm.customerFax} onChange={(e) => { ProfileFormOnChange("customerFax", e.target.value) }} type="text" className="form-control" />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Country </label>
                            <input value={ProfileForm.customerCountry} onChange={(e) => { ProfileFormOnChange("customerCountry", e.target.value) }} type="text" className="form-control" />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer City </label>
                            <input value={ProfileForm.customerCity} onChange={(e) => { ProfileFormOnChange("customerCity", e.target.value) }} type="text" className="form-control" />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer State </label>
                            <input value={ProfileForm.customerState} onChange={(e) => { ProfileFormOnChange("customerState", e.target.value) }} type="text" className="form-control" />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Post Code </label>
                            <input value={ProfileForm.shipmentPostcode} onChange={(e) => { ProfileFormOnChange("shipmentPostcode", e.target.value) }} type="text" className="form-control" />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Address</label>
                            <input value={ProfileForm.customerAddress} onChange={(e) => { ProfileFormOnChange("customerAddress", e.target.value) }} type="text" className="form-control" />

                        </div>
                    </div>
                    <h6>Shipment Details</h6>
                    <hr />
                    <div className="row">
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipment Name </label>
                            <input value={ProfileForm.shipmentName} onChange={(e) => { ProfileFormOnChange("shipmentName", e.target.value) }} type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipping Phone </label>
                            <input value={ProfileForm.shipmentPhone} onChange={(e) => { ProfileFormOnChange("shipmentPhone", e.target.value) }} type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipment Country</label>
                            <input value={ProfileForm.shipmentCountry} onChange={(e) => { ProfileFormOnChange("shipmentCountry", e.target.value) }} type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipping City </label>
                            <input value={ProfileForm.shipmentCity} onChange={(e) => { ProfileFormOnChange("shipmentCity", e.target.value) }} type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipment State </label>
                            <input value={ProfileForm.shipmentState} onChange={(e) => { ProfileFormOnChange("shipmentState", e.target.value) }} type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipment Post Code</label>
                            <input value={ProfileForm.shipmentPostcode} onChange={(e) => { ProfileFormOnChange("shipmentPostcode", e.target.value) }} type="text" className="form-control " />
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Shipment Address</label>
                            <input value={ProfileForm.shipmentAddress} onChange={(e) => { ProfileFormOnChange("shipmentAddress", e.target.value) }} type="text" className="form-control " />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-3 p-2">
                            <button onClick={Save} className="btn btn-Success">Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default ProfileForm;