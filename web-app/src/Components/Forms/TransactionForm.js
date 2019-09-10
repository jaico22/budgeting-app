import React from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import TransactionFormData from './TransactionFormData'
import { debuggerStatement } from '@babel/types';

class TransactionForm extends React.Component{
    constructor(props){
        super(props)
        var transactionFormData = new TransactionFormData()
        if(this.props.defaultData != null){
            transactionFormData = this.props.defaultData
            
        }
        this.state = {
            transactionFormData: transactionFormData,
            descriptionErrorMsg: "",
            nameErrorMsg: "",
            amountErrorMsg: "",
            dateErrorMsg: "",
            plannedTransactions: []
        }
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.getPlannedTransactions = this.getPlannedTransactions.bind(this);
    }
    
    updateParent(){
        this.props.parentCallback(this.state.transactionFormData);
    }

    handleNameChange(value){
        var res = this.state.transactionFormData.setName(value);
        if(!res){
            this.setState({nameErrorMsg: "Enter Valid Name"});
        }else{
            this.setState({nameErrorMsg: ""});
            this.updateParent();
        }
    }

    handleDescriptionChange(value){
        var res = this.state.transactionFormData.setDescription(value);
        if(!res){
            this.setState({descriptionErrorMsg: "Enter Valid Description"});
        }else{
            this.setState({descriptionErrorMsg: ""});
            this.updateParent();
        }       
    }

    handleAmountChange(value){
        var res = this.state.transactionFormData.setAmount(value);
        if(!res){
            this.setState({amountErrorMsg: "Enter Valid Amount"});
        }else{
            this.setState({amountErrorMsg: ""});
            this.updateParent();
        }             
    }

    handleDateChange(dateString){
        var res = this.state.transactionFormData.setDate(dateString);
        if(!res){
            this.setState({dateErrorMsg: "Enter Valid Date"});
        }else{
            this.setState({dateErrorMsg: ""});
            this.updateParent();
        }
    }

    getPlannedTransactions(onSuccess, onFail){
        return new Promise((resolve,reject) => {
                axios({
                    method: 'get',
                    url: 'https://localhost:44300/api/Category/GetPlannedTransactions/?budgetId=' + this.props.budgetId
                        + '&categoryId=' + this.props.categoryId
                })
                .then( function(response) {
                    console.log(response)
                    resolve(response.data.transactions);

                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                    reject(null);
                })
            }
        );
        
    }
    componentDidMount(){
        this.getPlannedTransactions()
        .then(plannedTransactions => {
            this.setState({
                plannedTransactions : plannedTransactions
            })
        })
    }

    render(){
        // Add linked transactios form when approprioate
        let linkedTransactionForm;
        if(this.props.isPlanned===false){

                linkedTransactionForm = (
                    <div>
                        <Form.Label>Linked Planned Transaction</Form.Label>
                        <Form.Control as='select'>
                            {this.state.plannedTransactions.map(transaction => (
                                <option value='" + transaction.id + "'>{transaction.name}</option>
                            ))}
                        </Form.Control>
                    </div>
            )}

        
        

        return(
            <Form>
                <Form.Group>
                    
                    <Form.Label>Transaction Name</Form.Label>
                    <Form.Control type="text" placeholder="Transaction Name"
                            onChange={data => {this.handleNameChange(data.target.value)}} 
                            value={this.state.transactionFormData.name}
                    />
                    <p className="text-dager">{this.state.nameErrorMsg}</p>

                    {linkedTransactionForm}

                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Transaction Description"
                            onChange={data => {this.handleDescriptionChange(data.target.value)}} 
                            value={this.state.transactionFormData.description}
                    />
                    <p className="text-dager">{this.state.descriptionErrorMsg}</p>

                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" step = "0.01" placeholder="1234.45" 
                            onChange={data => {this.handleAmountChange(data.target.value)}} 
                            value={this.state.transactionFormData.amount}
                    />
                    <p className="text-dager">{this.state.amountErrorMsg}</p>

                    <Form.Label>Transaction Date</Form.Label>
                    <Form.Control type="text" placeholder="MM/DD/YYYY" 
                            onChange={data => {this.handleDateChange(data.target.value)}} 
                            value={this.state.transactionFormData.date}
                    />
                    <p className="text-dager">{this.state.dateErrorMsg}</p>

                </Form.Group>
            </Form>
        )
    }
}

export default TransactionForm;