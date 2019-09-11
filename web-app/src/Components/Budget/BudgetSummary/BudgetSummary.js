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
                        <td>${this.props.budgetFormData.amountToBeBudgeted}</td>
                        <td>${this.props.budgetFormData.calculatedReadOnlyValues.totalBudgeted}</td>
                        <td>${this.props.budgetFormData.calculatedReadOnlyValues.actualSpent}</td>
                        <td>${this.props.budgetFormData.calculatedReadOnlyValues.leftOver}</td>
                        <td>${this.props.budgetFormData.calculatedReadOnlyValues.projectLeftOver}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default BudgetSummary;