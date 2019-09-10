import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import BudgetForm from '../../Forms/BudgetForm'
import BudgetFormData from '../../Forms/BudgetFormData'

class EditBudget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showEditForm: false,
            budgetFormData: this.props.budgetFormData,
            editFormData: new BudgetFormData()
        }
        this.openEditWindow = this.openEditWindow.bind(this);
        this.closeEditWindow = this.closeEditWindow.bind(this);
        this.updateEditData = this.updateEditData.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
    }

    openEditWindow(){
        this.setState({showEditForm: true})
    }

    closeEditWindow(){
        this.setState({showEditForm: false})
    }

    updateEditData(budgetFormData){
        this.setState({
            editFormData: budgetFormData
        })
    }
 
    submitEdit(){
        var bodyFormData = this.state.editFormData.convertToFormData();
        axios({
            method: 'post',
            url: 'https://localhost:44300/api/Budget/Edit/',
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

    render(){
        return(
            <div>
                <Button variant={this.props.variant} onClick={this.openEditWindow}>Edit Budget</Button>

                <Modal show={this.state.showEditForm} onHide={this.closeEditWindow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <BudgetForm defaultData={this.state.budgetFormData}
                                    parentCallback={data => {this.updateEditData(data)}}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={this.closeEditWindow}>Cancel</Button>
                        <Button variant="danger" onClick={this.submitEdit}>Edit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EditBudget;