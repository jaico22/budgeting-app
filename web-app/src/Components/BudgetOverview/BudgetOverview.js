import React from 'react'
import Budget from '../Budget/Budget'
import './BudgetOverview.css'
import BudgetControlBar from './BudgetControls/BudgetControlBar'
import BudgetFormData from '../Forms/BudgetFormData';
import { BrowserRouter as Router, Route } from 'react-router-dom'


class BudgetOverview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            budgets: [],
            budgetFormData: []  
        }
        this.changeActiveBudget = this.changeActiveBudget.bind(this)
    }

  componentDidMount(){
    fetch('https://localhost:44300/api/Budget/')
    .then(res => res.json())
    .then(data => {
      this.setState({
        error: false,
        isLoaded: true,
        budgets: data.budgets
      })
    })
  }

  changeActiveBudget(newActiveBudgetId){
    this.props.history.push('/'+newActiveBudgetId)
  }

  render() {
    const {error, isLoaded, budgets, activeBudgetId, budgetFormData} = this.state;
    return (
      <div id="budget-overview-container">
        <BudgetControlBar />
        {budgets.map(budget => (
              <Budget BudgetData={budget} 
                      isActive={budget.id==(this.props.match.params.budgetId || "")}
                      handler={this.changeActiveBudget}/>

        ))}
      </div>
    );

  }
      
}
export default BudgetOverview; 