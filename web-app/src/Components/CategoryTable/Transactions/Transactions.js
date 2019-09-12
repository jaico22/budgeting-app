import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import TransactionForm from '../../Forms/TransactionForm';
import CreateTransaction from '../../Transactions/TransactionControls/CreateTransaction';
import EditTransaction from '../../Transactions/TransactionControls/EditTransaction';
class Transactions extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showTransactions: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

    }

    componentDidMount(){
        if(this.props.match.params.pageId==="transactions" &&
           this.props.match.params.budgetId===this.props.budgetId &&
           this.props.match.params.categoryId===this.props.categoryId){
            this.setState({
                showTransactions: true
            })
        }
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
        this.props.history.push('/'+this.props.budgetId+'/'+this.props.categoryId+'/transactions');
    }
  

    render(){
        let transactionTableBody;
        if(this.props.transactions!=null){
            transactionTableBody = this.props.transactions.map(
                transactionFormData => (
                    <tr>
                        <td>
                            {transactionFormData.name}
                        </td>
                        <td>
                            {transactionFormData.description}
                        </td>
                        <td>
                            {transactionFormData.amount}
                        </td>
                        <td>
                            {transactionFormData.date}
                        </td>
                        <td>
                            <EditTransaction transactionFormData={transactionFormData} 
                                             budgetId={this.props.budgetId}
                                             categoryId={this.props.categoryId}/>
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