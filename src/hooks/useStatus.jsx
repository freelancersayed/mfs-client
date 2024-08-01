import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useStatus = () => {
    const axiosPublic = useAxiosPublic();



    const {data: status = [], isLoading, error, refetch}= useQuery({
        queryKey: [ 'all-session', user?.email],
        queryFn: async () =>{
            const res = await axiosPublic.get(`/status/${user?.email}`)
            return res.data
        }
    })
    return [status, isLoading, refetch, error]
}

export default useStatus;