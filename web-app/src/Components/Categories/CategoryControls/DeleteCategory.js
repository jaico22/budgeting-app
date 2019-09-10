import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class DeleteCategory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showDeleteConfirmation: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
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

    deleteCategory(){
        axios({
            method: 'delete',
            url: 'https://localhost:44300/api/Category/Remove/?budgetId='
                + this.props.budgetId + '&categoryId=' + this.props.categoryId,
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
                        <p>Are you sure you want to delete this category?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={this.handleClose}>No, go back!</Button>
                        <Button variant="danger" onClick={this.deleteCategory}>Delete</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default DeleteCategory;