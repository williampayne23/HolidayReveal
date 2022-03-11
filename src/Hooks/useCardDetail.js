import { useQuery } from "react-query";

function useCardDetail(id){
    return useQuery(['page', id], () => {
        if(id === undefined ){
            return null
        }
        return fetch("https://notion-api.splitbee.io/v1/page/" + id)
        .then(res => res.json());
    }, {keepPreviousData : true})
}

export default useCardDetail