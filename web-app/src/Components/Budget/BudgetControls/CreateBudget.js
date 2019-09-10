import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import BudgetForm from '../../Forms/BudgetForm'
import BudgetFormData from '../../Forms/BudgetFormData'

class CreateBudget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showCreateModal: false,
            budgetFormData: new BudgetFormData(),
            formDataValid: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }   

    handleClose(){
        this.setState({
            showCreateModal: false
        })
    }

    handleShow(){
        this.setState({
            showCreateModal: true
        })
    }

    handleCreate(){
        const {budgetFormData} = this.state;
        var bodyFormData = new FormData();
        bodyFormData.set('Name',budgetFormData.budgetName);
        bodyFormData.set('Description', budgetFormData.description);
        bodyFormData.set('StartDate',budgetFormData.startDate);
        bodyFormData.set('EndDate',budgetFormData.endDate);
        bodyFormData.set('TotalToBeBudgeted',budgetFormData.amountToBeBudgeted);
        axios({
            method: 'post',
            url: 'https://localhost:44300/api/Budget',
            data: bodyFormData,
            config: {headers: {'Content-Type:':'multipart/form-data'}},
        })
        .then(function (response) {
            window.location.reload();
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
        this.handleClose();
    }

    budgetFormCallback(budgetFormData){
        this.setState({
            budgetFormData: budgetFormData,
            formDataValid: budgetFormData.determineValidity()
        });
    }

    render(){
        return(
            <div>
                <Button onClick={this.handleShow}>Add New Budget</Button>

                <Modal size="lg" show={this.state.showCreateModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Budget</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BudgetForm parentCallback={data => {this.budgetFormCallback(data)}} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button disabled={!this.state.formDataValid}
                                variant="primary"
                                onClick={this.handleCreate}>
                        Create Budge
                        </Button>
                    </Modal.Footer>
                </Modal>              
            </div>
        )
    }
}

export default CreateBudget;