import { Spinner } from "react-bootstrap";

function Loading(){
    return <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
             <Spinner padding={100} animation="border"/>
        </div>
}

export default Loading;