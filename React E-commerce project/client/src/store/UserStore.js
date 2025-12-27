import { create } from "zustand";
import axios from 'axios';
import { setEmail } from "../utility/utility";
import Cookies from "js-cookie";
import { unauthorized } from '../utility/utility';
import RegisterForm from '../components/user/RegistrationForm';

const UserStore = create((set) => ({

    isLogin: () => {
        return !!Cookies.get("token");
    },

    LoginFormData: { email: "" },
    LoginFormOnChange: (name, value) => {
        set((state) => ({
            LoginFormData: {
                ...state.LoginFormData,
                [name]: value
            }
        }))
    },


    UserLogoutRequest: async () => {
        set({ isFormSubmitted: true })
        let res = await axios.get(`/api/v1/UserLogout`);
        Cookies.remove("token"); // Remove token on logout
        return res.data["status"] === "Success";
    },


    VerifyFormData: { otp: "" },
    VerifyFormOnChange: (name, value) => {
        set((state) => ({
            VerifyFormData: {
                ...state.VerifyFormData,
                [name]: value
            }
        }))
    },

    isFormSubmitted: false,
    UserOTPRequest: async (email) => {
        set({ isFormSubmitted: true })
        let res = await axios.get(`/api/v1/UserOTP/${email}`);
        setEmail(email);
        set({ isFormSubmitted: false })
        return res.data["status"] === "Success";
    },

    // VerifyRegistrationRequest: async (otp) => {
    //     set({ isFormSubmitted: true })
    //     let email = getEmail();
    //     let res = await axios.get(`/api/v1/VerifyRegistration/${email}/${otp}`);
    //     set({ isFormSubmitted: false })
    //     if (res.data["status"] === "Success" && res.data["token"]) {
    //         Cookies.set("token", res.data["token"], { expires: 1 }); // Store token in cookie for 1 day
    //         return true;
    //     }
    //     return false;
    // },

    RegistrationFormData: { name: "", email: "", password: "", role: "" },
    RegistrationFormOnChange: (name, value) => {
        set((state) => ({
            RegistrationFormData: {
                ...state.RegistrationFormData,
                [name]: value
            }
        }))
    },

    isRegistrationFormSubmitted: false,
    RegistrationFormRequest: async (PostBody) => {
        try {
            set({ isRegistrationFormSubmitted: true });
            let res = await axios.post(`/api/v1/register`, PostBody);
            return res.data["status"] === "Success";
        } catch (error) {
            unauthorized(error.response.status);
            return false;
        }
    },

    VerifyRegistrationFormData: { otp: "" },
    VerifyRegistrationFormOnChange: (name, value) => {
        set((state) => ({
            VerifyRegistrationFormData: {
                ...state.VerifyRegistrationFormData,
                [name]: value
            }
        }))
    },

    isVerifyRegistrationFormDataSubmitted: false,
    VerifyRegistrationFormRequest: async (PostBody) => {
        try {
            set({ isRegisterFormSubmitted: true });
            let res = await axios.post(`/api/v1/VerifyRegistration`, PostBody);
            return res.data["status"] === "Success";
        } catch (error) {
            unauthorized(error.response.status);

        }
    },

    ProfileForm: { customerAddress: "", customerCity: "", customerCountry: "", customerFax: "", customerName: "", customerPhone: "", customerPostCode: "", customerState: "", shippingAddress: "", shippingCity: "", shippingCountry: "", shippingName: "", shippingPhone: "", shippingPostCode: "", shippingState: "" },
    ProfileFormOnChange: (name, value) => {
        set((state) => ({
            ProfileForm: {
                ...state.ProfileForm,
                [name]: value
            }
        }))
    },

    ProfileDetails: null,
    ProfileDetailsRequest: async () => {
        try {
            let res = await axios.get(`/api/v1/ReadProfile`);
            if (res.data["data"].length > 0) {
                set({ ProfileDetails: res.data["data"][0] });
                set({ ProfileForm: res.data["data"][0] });
            } else {
                set({ ProfileDetails: [] });
                console.log(res)
            }
        } catch (error) {
            unauthorized(error.message);
        }
    },

    ProfileSaveRequest: async (PostBody) => {
        try {
            set({ ProfileDetails: null });
            let res = await axios.post(`/api/v1/UpdateProfile`, PostBody);
            return res.data["status"] === "Success";
        } catch (error) {
            unauthorized(error.response.status);

        }
    }

}))
export default UserStore;