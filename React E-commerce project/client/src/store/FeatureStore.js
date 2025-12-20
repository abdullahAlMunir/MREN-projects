import { create } from "zustand";
import axios from 'axios';

const FeatureStore = create((set) => ({
    FeatureList: null,
    FeatureListRequest: async () => {
        let res = await axios.get(`/api/v1/FeaturesList`);
        if (res.data["status"] === "Success") {
            set({ FeatureList: res.data["data"] })
        }
    },

    legalDetails: null,
    legalDetailsRequest: async (type) => {
        set({ legalDetails: null })
        let res = await axios.get(`/api/v1/LegalDetails/${type}`);
        if (res.data["status"] === "Success") {
            set({ legalDetails: res.data["data"] })
        }
    },

}))
export default FeatureStore;