import React from 'react'
import './budget.css'
import Table from 'react-bootstrap/Table'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import CategoryTable from '../CategoryTable/CategoryTable'
import CategoryHeader from './CategoryHeader/CategoryHeader'
import BudgetSummary from './BudgetSummary/BudgetSummary'
import BudgetHeader from './BudgetHeader/BudgetHeader';
import BudgetFormData from '../Forms/BudgetFormData';
import transformMongoDate from '../../Helpers/TransformMongoDate';
class Budget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            budgetData: this.props.BudgetData,
            budgetFormData: new BudgetFormData()
        }
        // TODO: Refactor other componetns to use BudgetFormData
        this.state.budgetFormData.setBudgetName(this.state.budgetData.name);
        this.state.budgetFormData.setAmountToBeBudgeted(this.state.budgetData.totalToBeBudgeted);
        this.state.budgetFormData.setStartDate(transformMongoDate(this.state.budgetData.startDate));
        this.state.budgetFormData.setEndDate(transformMongoDate(this.state.budgetData.endDate))
        this.state.budgetFormData.setId(this.state.budgetData.id);
    }

    render(){
        const {budgetData} = this.state;
        if (this.props.isActive == true){
            return (
                <div>
                    <div className="budget-overview-bar" 
                        onClick={() => this.props.handler(budgetData.id)}>
                        <h1>{budgetData.name}</h1>
                    </div>
                    <div className="budget-content">
                        <Container>
                            <BudgetHeader budgetFormData={this.state.budgetFormData}/>
                            <BudgetSummary budgetData={budgetData} />
                            <CategoryHeader budgetId={budgetData.id} />
                            <CategoryTable categories={budgetData.categories} budgetId={budgetData.id} />
                        </Container>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="budget-overview-bar" 
                     onClick={() => this.props.handler(budgetData.id)}>
                    <h1>{budgetData.name}</h1>
                </div>
            )
        }
    }
}

export default Budget;