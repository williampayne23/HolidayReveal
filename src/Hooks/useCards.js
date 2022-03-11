import { useQuery } from "react-query";

function useCards(){
    return useQuery('cards', async () => {
          const res = await fetch("https://notion-api.splitbee.io/v1/table/32fcb112aae743eeab93ca6c9eb97143")
          const data = await res.json()
          return data;
    })
}

export default useCards;