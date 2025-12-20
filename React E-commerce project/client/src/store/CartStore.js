import { create } from "zustand";
import axios from 'axios';
import { unauthorized } from '../utility/utility';

const CartStore = create((set) => ({

    isCartSubmit: false,
    CartForm: {productID: "", color: "", price: "", qty: "1", size: ""},
    CartFromOnChange: (name, value) => {
        set((state) => ({
            CartForm: {
                ...state.CartForm,
                [name] : value
            }
        }))
    },

    CartSaveRequest: async(PostBody = {}, productID, Quantity) => {
        try {
            set({isCartSubmit: true});
            PostBody.productID = productID;
            PostBody.qty= Quantity;
            let res = await axios.post(`/api/v1/SaveCartList`, PostBody);
            return res.data["status"] === "Success";
        } catch (error) {
            unauthorized(error.message)
        } finally {
            set({isCartSubmit: false})
        }
    },

    CartList: null,
    CartCount: 0,
    CartTotal: 0,
    CartVatTotal: 0,
    CartPayableTotal: 0,
    CartListRequest: async () => {
        try {
            let res = await axios.get(`/api/v1/CartList`);
            set({CartList: res.data["data"]})
            set({CartCount: (res.data["data"]).length});
            let total = 0
            let vat = 0
            let payable = 0
            res.data["data"].forEach((item, ) => {
             if (item["product"]["discount"] === true) {
                total = total + parseInt(item["qty"]) * parseInt(item["product"]["discountPrice"])
             } else {
                total = total + parseInt(item["qty"]) * parseInt(item["product"]["price"])
             }   
            });

            vat = total * .05
            payable = vat + total
            set({CartTotal : total})
            set({CartVatTotal : vat})
            set({CartPayableTotal : payable})
            
        } catch (error) {
            unauthorized(error.message);
        }
    },

    RemoveCartListRequest: async(_id) => {
        try {
            set({WishList: null})
            await axios.delete(`/api/v1/RemoveCartList`, { data: { productID: _id } })
        } catch (error) {
            unauthorized(error.response.status)
        }
    },

    CreateInvoiceRequest: async () => {
        try {
            set({isCartSubmit : true})
            let res = await axios.get(`/api/v1/CreateInvoice`);
            window.location.href = res.data["data"]["GatewayPageURL"];
        } catch (error) {
            unauthorized(error.message)
        } finally {
            set({isCartSubmit : false})
        }
    },

    InvoiceList: null,
    InvoiceListRequest: async () => {
        try {
            let res = await axios.get(`/api/v1/InvoiceList`);
            set({InvoiceList : res.data["data"]})
        } catch (error) {
            unauthorized(error.message)
        }
    },

    InvoiceDetails: null,
    InvoiceDetailsRequest: async (id) => {
        try {
            let res = await axios.get(`/api/v1/InvoiceProductList/${id}`);
            set({InvoiceDetails: res.data["data"]})
        } catch (error) {
            unauthorized(error.message)
        }
    },


}))
export default CartStore;