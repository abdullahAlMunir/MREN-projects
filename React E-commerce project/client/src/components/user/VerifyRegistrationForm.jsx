import React from 'react';
import UserSubmitButton from './UserSubmitButton';
import UserStore from '../../store/UserStore';
import ValidationHelper from '../../utility/ValidationHelper';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const OtpForm = () => {

    let navigate = useNavigate();

    const { VerifyRegistrationFormData, VerifyRegistrationFormOnChange, VerifyRegistrationFormRequest } = UserStore();

    const onFormSubmit = async () => {
        if (ValidationHelper.IsEmpty(VerifyRegistrationFormData.otp)) {
            toast.error("Valid Email Address Required.")
        } else {
            let res = await VerifyRegistrationFormRequest(VerifyRegistrationFormData.otp);
            return res ? navigate("/") : toast.error("Something went Wrong!")
        }
    }

    return (
        <div className="container mt-5 d-flex align-items-center justify-content-center bg-light">
            <div className="col-md-6 col-lg-5 mt-5">
                <div className="card border-0 shadow-lg rounded-4 p-5 bg-white">
                    <div className="text-center mb-4">
                        <h3 className="fw-bold text-dark">Login Verification</h3>
                        <p className="text-muted small">A 6-digit verification code has been sent to your registered email address.</p>
                    </div>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="verifyCode" className="form-label fw-semibold">Verification Code</label>
                            <input
                                type="password"
                                value={VerifyRegistrationFormData.otp}
                                onChange={(e) => { VerifyRegistrationFormOnChange("otp", e.target.value) }}
                                id="verifyCode"
                                className="form-control form-control-lg text-center rounded-3"
                                placeholder="Enter code"
                            />
                        </div>

                        <UserSubmitButton
                            onClick={ onFormSubmit }
                            className="btn btn-Success w-100 rounded-3 py-2 fw-semibold"
                            text="Verify"
                        />
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-muted small mb-1">Didn't receive the code?</p>
                        <button className="btn btn-link text-Success fw-semibold p-0">Resend Code</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default OtpForm;