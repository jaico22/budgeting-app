import React from 'react'
import Table from 'react-bootstrap/Table'

class BudgetSummary extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Total To Be Budgeted</th>
                        <th>Total Budgeted</th>
                        <th>Total Spent</th>
                        <th>Total Remaining</th>
                        <th>Projected Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.props.budgetData.totalToBeBudgeted}</td>
                        <td>{this.props.budgetData.totalBudgeted}</td>
                        <td>{this.props.budgetData.actualSpent}</td>
                        <td>{this.props.budgetData.leftOver}</td>
                        <td>{this.props.budgetData.projectLeftOver}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default BudgetSummary;