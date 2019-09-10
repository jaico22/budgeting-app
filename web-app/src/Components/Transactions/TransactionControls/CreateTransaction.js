import React from 'react'
import Axios from 'axios';
import TransactionForm from '../../Forms/TransactionForm';
import TransactionFormData from '../../Forms/TransactionFormData';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class CreateTransaction extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showWindow: false,
            transactionData: new TransactionFormData()
        }
        this.openWindow = this.openWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.updateTransactionData = this.updateTransactionData.bind(this);
        this.addTransaction = this.addTransaction.bind(this);
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
            transactionData: data
        })
    }

    addTransaction(){
        this.state.transactionData.setIsPlanned(this.props.isPlanned);
        var bodyFormData = this.state.transactionData.convertToFormData();
        Axios({
            method: 'post',
            url: 'https://localhost:44300/api/Transaction/Add?budgetId=' + this.props.budgetId +
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
                <Button variant="primary" onClick={this.openWindow}>Add Transaction</Button>

                            
                <Modal show={this.state.showWindow} onHide={this.closeWindow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Transaction</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <TransactionForm isPlanned={this.props.isPlanned}
                                         budgetId={this.props.budgetId}
                                         categoryId={this.props.categoryId}
                                         parentCallback={data => {this.updateTransactionData(data)}}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeWindow}>Cancel</Button>
                        <Button variant="success" onClick={this.addTransaction}>Create</Button>
                    </Modal.Footer>
                </Modal>     

            </div>
        )
    }
}

export default CreateTransaction;