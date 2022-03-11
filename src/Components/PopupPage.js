import { Modal, Button } from 'react-bootstrap'
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import Loading from './Loading'

import { NotionRenderer } from "react-notion";
import useCardDetail from '../Hooks/useCardDetail';

function PopupPage(props) {
    const {isLoading, data} = useCardDetail(props.page?.id)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {isLoading || data == null? "": props.page?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading || data == null? <Loading/> : <NotionRenderer blockMap={data}/>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => {
                    props.onHide(e);
                    }}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PopupPage;