import { useEffect, useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap'
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import { NotionRenderer } from "react-notion";

function PopupPage(props) {
    const [data, setData] = useState({});

    useEffect(() => {
        if(props.page === "")
            return;
        fetch("https://notion-api.splitbee.io/v1/page/" + props.page?.id)
        .then(res => res.json())
        .then(setData);
    }, [props.page])

    const loading = props.page.id !== "" && JSON.stringify(data) === JSON.stringify({})

    console.log(props.page)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {loading? "": props.page?.name}
                </Modal.Title>
            </Modal.Header>
            {loading? <LoadingBody/> : <Body data={data}/>}
            <Modal.Footer>
                <Button onClick={(e) => {
                    setData({})
                    props.onHide(e);
                    }}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

function Body({data}){
    console.log(data)
    return (
    <Modal.Body>
        <NotionRenderer blockMap={data}/>
    </Modal.Body>
    )
}

function LoadingBody(){
    return <Modal.Body>
        <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
             <Spinner padding={100} animation="border"/>
        </div>
        </Modal.Body>
}


export default PopupPage;