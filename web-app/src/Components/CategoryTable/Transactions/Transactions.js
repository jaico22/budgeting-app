import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import TransactionForm from '../../Forms/TransactionForm';
import CreateTransaction from '../../Transactions/TransactionControls/CreateTransaction';

class Transactions extends React.Component{
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
        let transactionTableBody;
        if(this.props.transactions!=null){
            transactionTableBody = this.props.transactions.map(
                transaction => (
                    <tr>
                        <td>
                            {transaction.name}
                        </td>
                        <td>
                            {transaction.description}
                        </td>
                        <td>
                            {transaction.amount}
                        </td>
                        <td>
                            {transaction.date}
                        </td>
                        <td>
                            <Button variant="primary">Edit</Button>
                        </td>
                    </tr>
                )
            );
        }
        return(
            <div>
                <Button variant="info" onClick={this.handleShow}>
                    Transactions
                </Button>
                <Modal size="lg" show={this.state.showTransactions} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transactions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table>
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th></th></tr>
                            </thead>
                            <tbody>
                                {transactionTableBody}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <CreateTransaction budgetId={this.props.budgetId}
                                           categoryId={this.props.categoryId}
                                           isPlanned={false}/> 
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

export default Transactions;