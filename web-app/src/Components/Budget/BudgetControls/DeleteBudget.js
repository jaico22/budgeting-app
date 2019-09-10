import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'

class DeleteBudget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showDeleteConfirmation: false,
            budgetId: this.props.budgetId
        }
        this.handleClose = this.handleClose.bind(this);
        this.deleteBudget = this.deleteBudget.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen(){
        this.setState({
            showDeleteConfirmation: true
        })
    }

    handleClose(){
        this.setState({
            showDeleteConfirmation: false
        })
    }

    deleteBudget(){
        axios({
            method: 'delete',
            url: 'https://localhost:44300/api/Budget/Remove/'+this.state.budgetId,
        })
        .then(function (response) {
            window.location.reload();
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    render(){
        return(
        <div>
            <Button variant="danger" onClick={this.handleOpen}>Delete</Button>

            <Modal show={this.state.showDeleteConfirmation} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletion Confirmation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete this budget?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={this.handleClose}>No, go back!</Button>
                    <Button variant="danger" onClick={this.deleteBudget}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>);
    }
}

export default DeleteBudget;