import axios from "axios";

const api = axios.create({
    baseURL: 'https://notes-ipb00nmqs-nicollysantanna.vercel.app'
});

export default api;