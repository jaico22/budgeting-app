import React from 'react'
import './CategoryTable.css'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Transactions from '../../TransactionsAndPlanning/Transactions/Transactions'
import Planning from '../../TransactionsAndPlanning/Planning/Planning'
import EditCategory from '../CategoryControls/EditCategory'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
class CategoryTable extends React.Component{
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
        return (
            <div>
                {this.props.categories.map(categoryFormData =>(
                    <div>
                        <div className="cat-table-header">
                            <div className="cat-table-header-title">
                                {categoryFormData.name}
                            </div>
                            <div className="cat-table-header-controls">
                                <Router>
                                    <ButtonToolbar>
                                        <EditCategory categoryFormData={categoryFormData} 
                                                    budgetId={this.props.budgetId}/>
                                        &nbsp;

                                        <Route path='/:budgetId/:categoryId?/:pageId?' 
                                                render={(props) => <Transactions {...props} 
                                                                    transactions={categoryFormData.actualTransactions}
                                                                    budgetId={this.props.budgetId}
                                                                    categoryId={categoryFormData.id} />} 
                                        />

                                        &nbsp;
                                        <Route path='/:budgetId/:categoryId?/:pageId?' 
                                                render={(props) => <Planning {...props} transactions={categoryFormData.plannedTransactions}
                                                budgetId={this.props.budgetId}
                                                categoryId={categoryFormData.id} />}
                                        />
                                    </ButtonToolbar>
                                </Router>
                            </div>
                        </div>
                        <div className="cat-table-body">
                            <div className="cat-table-body-description">
                                {categoryFormData.description}
                            </div>
                            <Table size="sm" striped bordered hover variant="dark">
                                <thead>
                                    <th>Amount Budgeted</th>
                                    <th>Amount Spent</th>
                                    <th>Amount Remaining</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${categoryFormData.amountBudgeted}</td>
                                        <td>{categoryFormData.amountSpent}</td>
                                        <td>${categoryFormData.amountRemaining}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <Table size="sm" striped bordered hover variant="dark">
                                <thead>
                                    <th>Planned Transaction</th>
                                    <th>Amount Planned</th>
                                    <th>Amount Spent</th>
                                    <th>Amount Remaining</th>
                                </thead>
                                <tbody>
                                {categoryFormData.plannedTransactions.map(
                                    plannedTransaction => (
                                        <tr>
                                            <td>{plannedTransaction.name}</td>
                                            <td>${plannedTransaction.amount}</td>
                                            <td>${plannedTransaction.sumLinkedTransactions}</td>
                                            <td>${plannedTransaction.amount - plannedTransaction.sumLinkedTransactions}</td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default CategoryTable;