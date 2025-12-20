import React from 'react';
import { create } from 'zustand';
import { unauthorized } from '../utility/utility';
import axios from 'axios';

const WishStore = create((set) => ({
    
    isWishSubmit: false,
    WishSaveRequest: async (productID) => {
        try {
            set({ isWishSubmit: true })
            let res = await axios.post(`/api/v1/SaveWishList`, { productID: productID });
            return res.data["status"] === "Success";
        } catch (error) {
            unauthorized(error.message)
        } finally {
            set({ isWishSubmit: false })
        }
    },

    WishList: null,
    WishCount: 0,
    WishListRequest: async () => {
        try {
            const res = await axios.get(`/api/v1/WishList`);
            set({ WishList: res.data["data"] });
            set({ WishCount: (res.data["data"]).length });
        } catch (error) {
            unauthorized(error.message)
        }
    },

    // RemoveWishListRequest: async (_id) => {
    //     try {
    //         set({WishList: null})
    //         await axios.delete(`api/v1/RemoveWishList`, {"_id": _id})
    //     } catch (error) {
    //         unauthorized(error.message)
    //     }
    // }

    RemoveWishListRequest: async(_id) => {
        try {
            set({WishList: null})
            await axios.delete(`/api/v1/RemoveWishList`, { data: { productID: _id } })
        } catch (error) {
            unauthorized(error.response.status)
        }
    }

}));
export default WishStore;