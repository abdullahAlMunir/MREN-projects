import React from 'react';
// import SubmitButton from 
import UserSubmitButton from './UserSubmitButton';
import UserStore from '../../store/UserStore';
import ValidationHelper from '../../utility/ValidationHelper';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {

    let navigate = useNavigate();

    const { LoginFormData, LoginFormOnChange, UserOTPRequest } = UserStore();

    const onFormSubmit = async () => {
        if (!ValidationHelper.IsEmail(LoginFormData.email)) {
            toast.error("Valid Email Address Required.")
        } else {
            let res = await UserOTPRequest(LoginFormData.email);
            return res ? navigate("/verifyLogin") : toast.error("Something went Wrong!")
        }
    }

    return (
        <div className="container mt-5 d-flex align-items-center justify-content-center bg-light">
            <div className="col-md-6 col-lg-5 mt-3">
                <div className="card border-0 shadow-lg rounded-4 mt-5 p-5 bg-white">
                    <div className="text-center mb-4">
                        <h3 className="fw-bold text-dark">Welcome Back</h3>
                        <p className="text-muted small">Enter your email address to receive a verification code.</p>
                    </div>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label fw-semibold">Email Address</label>
                            <input
                                type="email"
                                value={LoginFormData.email}
                                onChange={(e) => { LoginFormOnChange("email", e.target.value) }}
                                id="emailInput"
                                className="form-control form-control-lg rounded-3"
                                placeholder="you@example.com"
                            />

                            <label htmlFor="emailInput" className="form-label fw-semibold">Password</label>
                            <input
                                type="password"
                                value={LoginFormData.password}
                                onChange={(e) => { LoginFormOnChange("password", e.target.value) }}
                                id="emailInput"
                                className="form-control form-control-lg rounded-3"
                                placeholder="password"
                            />
                        </div>

                        <UserSubmitButton
                            onClick={onFormSubmit}
                            className="btn btn-Success w-100 rounded-3 py-2 fw-semibold"
                            text="Next"
                        />
                    </form>

                    <div className="text-center mt-4">
                        <Link to="/register">
                            <p className="small text-muted">Don't have an account? <a href="/register" className="text-Success fw-semibold">Sign Up now.</a></p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        // <div className="card mb-3" style="max-width: 540px;">
        //     <div className="row g-0">
        //         <div className="col-md-4">
        //             <img src="" className="img-fluid rounded-start" alt="...">
        //         </div>
        //         <div className="col-md-8">
        //             <div className="card-body">
        //                 <h5 className="card-title">Card title</h5>
        //                 <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        //                 <p className="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        //             </div>
        //         </div>
        //     </div>
        // </div>

    );
};

export default LoginForm;