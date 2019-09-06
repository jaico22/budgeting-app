import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class EditCategory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showTransactions: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

    }

    handleClose(){
        this.setState({
            showTransactions: false
        })
    }

    handleShow(){
        this.setState({
            showTransactions: true
        })
    }
  

    render(){
        return(
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Edit
                </Button>
                <Modal show={this.state.showTransactions} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Woohoo, you're reading this text in a modal!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EditCategory;