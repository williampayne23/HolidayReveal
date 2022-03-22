import { useCookies } from "react-cookie";

function useLogin(){
    const [cookies, setCookie] = useCookies(["loggedIn"]);

    function setLoggedIn(loggedIn){
        setCookie("loggedIn", loggedIn, {
            path:"/"
        })
    }

    return [cookies.loggedIn, setLoggedIn]
}

export default useLogin