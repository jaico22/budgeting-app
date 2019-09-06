import React from 'react'
import Budget from '../Budget/Budget'
import Container from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './BudgetOverview.css'

class BudgetOverview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            budgets: [],
            activeBudgetId: null
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
    this.setState({
      activeBudgetId: newActiveBudgetId
    })
  }

  render() {
    const { error, isLoaded, budgets, activeBudgetId } = this.state;
    return (
      <div id="budget-overview-container">
      
        {budgets.map(budget => (
              <Budget BudgetData={budget} 
                      isActive={budget.id==activeBudgetId}
                      handler={this.changeActiveBudget}/>

        ))}
      </div>
    );

  }
      
}
export default BudgetOverview; 