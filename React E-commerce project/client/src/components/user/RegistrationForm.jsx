import React from 'react';
import UserSubmitButton from './UserSubmitButton';
import UserStore from '../../store/UserStore';
import ValidationHelper from '../../utility/ValidationHelper';
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const RegisterForm = () => {

    let navigate = useNavigate();

    const {
        RegistrationFormData, RegistrationFormRequest, RegistrationFormOnChange } = UserStore();

    const onFormSubmit = async (e) => {

        e?.preventDefault();

        if (!RegistrationFormData.name) {
            toast.error("Name is required.");
        }
        else if (!ValidationHelper.IsEmail(RegistrationFormData.email)) {
            toast.error("Valid Email Address Required.");
        }
        else if (!RegistrationFormData.password) {
            toast.error("Password is required.");
        }
        else if (!RegistrationFormData.role) {
            toast.error("Role is required.");
        }
        else {
            let res = await RegistrationFormRequest(RegistrationFormData);
            return res ? navigate("/verifyRegistration") : toast.error("Registration failed!");
        }
    };

    return (
        <div className="container mt-5 d-flex align-items-center justify-content-center bg-light">
            <div className="col-md-6 col-lg-5 mt-3">
                <div className="card border-0 shadow-lg rounded-4 mt-5 p-5 bg-white">

                    <div className="text-center mb-4">
                        <h3 className="fw-bold text-dark">Create Account</h3>
                        <p className="text-muted small">
                            Fill in the details to register and receive an OTP.
                        </p>
                    </div>

                    <form>

                        {/* Name */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Full Name</label>
                            <input
                                type="text"
                                value={RegistrationFormData.name}
                                onChange={(e) =>
                                    RegistrationFormOnChange("name", e.target.value)
                                }
                                className="form-control form-control-lg rounded-3"
                                placeholder="Your full name"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email Address</label>
                            <input
                                type="email"
                                value={RegistrationFormData.email}
                                onChange={(e) =>
                                    RegistrationFormOnChange("email", e.target.value)
                                }
                                className="form-control form-control-lg rounded-3"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Password</label>
                            <input
                                type="password"
                                value={RegistrationFormData.password}
                                onChange={(e) =>
                                    RegistrationFormOnChange("password", e.target.value)
                                }
                                className="form-control form-control-lg rounded-3"
                                placeholder="Password"
                            />
                        </div>

                        {/* Role */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Role</label>
                            <select
                                value={RegistrationFormData.role}
                                onChange={(e) =>
                                    RegistrationFormOnChange("role", e.target.value)
                                }
                                className="form-select form-select-lg rounded-3"
                            >
                                <option value="">Select role</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <UserSubmitButton
                            onClick={onFormSubmit}
                            className="btn btn-Success w-100 rounded-3 py-2 fw-semibold"
                            text="Register"
                        />
                    </form>

                    <div className="text-center mt-4">
                        <Link to="/login" className="text-decoration-none">
                            <p className="small text-muted">
                                Already have an account?{" "}
                                <span className="text-success fw-semibold">
                                    Login here
                                </span>
                            </p>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
