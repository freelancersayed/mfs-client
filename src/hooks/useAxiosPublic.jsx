import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://mfs-server-xi.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;