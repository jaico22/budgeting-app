import React from 'react'
import BudgetFormData from './BudgetFormData'
import Form from 'react-bootstrap/Form'

class BudgetForm extends React.Component{
    constructor(props){
        super(props);
        let budgetData = new BudgetFormData();
        if(this.props.defaultData!=null){
            budgetData = this.props.defaultData;
        }
        this.state = {
            budgetData: budgetData,
            nameErrorMsg: "",
            startDateErrorMsg: "",
            endDateErrorMsg: "",
            amountErrorMsg: "",
        }
        this.updateParent = this.updateParent.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this); 
    }

    handleAmountChange(value){
        var res = this.state.budgetData.setAmountToBeBudgeted(value);
        if(!res){
            this.setState({amountErrorMsg: "Enter Valid Amount"});
        }else{
            this.setState({amountErrorMsg: ""});
            this.updateParent();
        }
    }

    handleNameChange(value){
        var res = this.state.budgetData.setBudgetName(value);
        if(!res){
            this.setState({nameErrorMsg: "Enter Valid Name"});
        }else{
            this.setState({nameErrorMsg: ""});
            this.updateParent();
        }
    }

    handleStartDateChange(value){
        var res = this.state.budgetData.setStartDate(value);
        if(!res){
            this.setState({startDateErrorMsg: "Enter Valid Date"});
        }else{
            this.setState({startDateErrorMsg: ""});
            this.updateParent();
        }
    }

    handleEndDateChange(value){
        var res = this.state.budgetData.setEndDate(value);
        if(!res){
            this.setState({endDateErrorMsg: "Enter Valid Date"});
        }else{
            this.setState({endDateErrorMsg: ""});
            this.updateParent();
        }
    }

    updateParent(){
        this.props.parentCallback(this.state.budgetData);
    }

    render(){
        return(
            <Form>
                <Form.Group controlId="budgetCreate">
                    <Form.Label>Budget Name</Form.Label>
                    <Form.Control type="text" placeholder="BudgetName" 
                        onChange={data => {this.handleNameChange(data.target.value)}} 
                        value={this.state.budgetData.budgetName}/>
                    <p className="text-danger">{this.state.nameErrorMsg}</p>

                    <Form.Label>Amount To Be Budgeted</Form.Label>
                    <Form.Control type="number" step = "0.01" placeholder="1234.45" 
                                onChange={data => {this.handleAmountChange(data.target.value)}}
                                value={this.state.budgetData.amountToBeBudgeted} />
                    <p className="text-danger">{this.state.amountErrorMsg}</p>

                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="text" placeholder="MM/DD/YYYY" 
                                onChange={data => {this.handleStartDateChange(data.target.value)}} 
                                value={this.state.budgetData.startDate} />
                    <p className="text-danger">{this.state.startDateErrorMsg}</p>
                    
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="text" placeholder="MM/DD/YYYY" 
                                onChange={data => {this.handleEndDateChange(data.target.value)}}
                                value={this.state.budgetData.endDate} />
                    <p className="text-danger">{this.state.endDateErrorMsg}</p>

                </Form.Group>
            </Form>
        )
    }
}

export default BudgetForm;