import { useMutation, useQueryClient } from "react-query";


function useCardFlip(id){
    const queryClient = useQueryClient()
    return useMutation('flipCard', {
        mutationFn: (id) => {
          fetch("https://hooks.zapier.com/hooks/catch/5708500/bifr05e?id=" + id)
            .catch((err) => console.error(err));
        },
        onSuccess: (result, id, context) => {
          queryClient.setQueryData('cards', (data) => {
            const index = data.findIndex((i) => i.id === id)
            if (index < 0)
              return data;
            data[index].visible = true;
            return data
          })
        }
      })
}

export default useCardFlip;