import React from 'react'
import './budget.css'
import Container from 'react-bootstrap/Container'
import CategoryTable from '../Categories/CategoryTable/CategoryTable'
import CategoryHeader from '../Categories/CategoryHeader/CategoryHeader'
import BudgetSummary from './BudgetSummary/BudgetSummary'
import BudgetHeader from './BudgetHeader/BudgetHeader';
import BudgetFormData from '../Forms/BudgetFormData';

class Budget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            budgetFormData: new BudgetFormData(this.props.BudgetData)
        }

    }

    render(){
        const {budgetFormData} = this.state;
        if (this.props.isActive == true){
            return (
                <div>
                    <div className="budget-overview-bar" 
                        onClick={() => this.props.handler(budgetFormData.id)}>
                        <h1>{budgetFormData.budgetName}</h1>
                    </div>
                    <div className="budget-content">
                        <Container>
                            <BudgetHeader budgetFormData={budgetFormData}/>
                            <BudgetSummary budgetFormData={budgetFormData} />
                            <CategoryHeader budgetId={budgetFormData.id} />
                            <CategoryTable categories={budgetFormData.categories} budgetId={budgetFormData.id} />
                        </Container>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="budget-overview-bar" 
                     onClick={() => this.props.handler(budgetFormData.id)}>
                    <h1>{budgetFormData.budgetName}</h1>
                </div>
            )
        }
    }
}

export default Budget;