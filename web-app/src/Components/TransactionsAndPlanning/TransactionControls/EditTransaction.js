import React from 'react'
import Axios from 'axios'
import TransactionForm from '../../Forms/TransactionForm'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

class EditTransaction extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transactionFormData: this.props.transactionFormData,
            showWindow: false
        }
        this.openWindow = this.openWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.editTransaction = this.editTransaction.bind(this);
        this.updateTransactionData = this.updateTransactionData.bind(this);
    }

    openWindow(){
        this.setState({
            showWindow: true
        })
    }

    closeWindow(){
        this.setState({
            showWindow: false
        })
    }

    updateTransactionData(data){
        this.setState({
            transactionFormData: data
        })
    }

    editTransaction(){
        this.state.transactionFormData.setIsPlanned(this.state.transactionFormData.isPlanned);
        var bodyFormData = this.state.transactionFormData.convertToFormData();
        Axios({
            method: 'post',
            url: 'https://localhost:44300/api/Transaction/Edit?budgetId=' + this.props.budgetId +
                "&categoryId=" + this.props.categoryId,
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
        this.closeWindow();      
    }

    render(){
        return(
            <div>
                <Button variant="primary" onClick={this.openWindow}>Edit</Button>

                <Modal show={this.state.showWindow} onHide={this.closeWindow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Transaction</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <TransactionForm isPlanned={this.state.transactionFormData.isPlanned}
                                         budgetId={this.props.budgetId}
                                         categoryId={this.props.categoryId}
                                         parentCallback={data => {this.updateTransactionData(data)}}
                                         defaultData={this.state.transactionFormData} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeWindow}>Cancel</Button>
                        <Button disabled={!this.state.transactionFormData.determineValidity()} variant="success" onClick={this.editTransaction}>Edit</Button>
                    </Modal.Footer>
                </Modal>  
            </div>
            
        )
    }
}

export default EditTransaction;