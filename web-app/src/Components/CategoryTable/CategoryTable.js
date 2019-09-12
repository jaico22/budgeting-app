import React from 'react'
import Table from 'react-bootstrap/Table'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Transactions from './Transactions/Transactions'
import Planning from './Planning/Planning'
import EditCategory from '../Categories/CategoryControls/EditCategory'
import { BrowserRouter as Router, Route } from 'react-router-dom'

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
            <Table striped bordered hover variant="dark">
                <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Category Description</th>
                            <th>Budgeted</th>
                            <th>Spent</th>
                            <th>Remaining</th>
                            <th>Projected</th>
                            <th width="290px"></th>
                        </tr>                          
                </thead>
                <tbody>
                    {this.props.categories.map(categoryFormData =>(
                        <tr>
                            <td>{categoryFormData.name}</td>
                            <td>{categoryFormData.description}</td>
                            <td>${categoryFormData.amountBudgeted}</td>
                            <td>${categoryFormData.amountSpent}</td>
                            <td>${categoryFormData.amountRemaining}</td>
                            <td>${categoryFormData.projectedRemaining}</td>
                            <td>
                                <Router>
                                    <ButtonToolbar>
                                        <EditCategory categoryFormData={categoryFormData} 
                                                    budgetId={this.props.budgetId}/>
                                        &nbsp;

                                        <Route path='/:budgetId/:categoryId/:pageId?' 
                                               render={(props) => <Transactions {...props} 
                                                                    transactions={categoryFormData.actualTransactions}
                                                                    budgetId={this.props.budgetId}
                                                                    categoryId={categoryFormData.id} />} 
                                        />

                                        &nbsp;
                                        <Route path='/:budgetId/:categoryId/:pageId?' 
                                                render={(props) => <Planning {...props} transactions={categoryFormData.plannedTransactions}
                                                budgetId={this.props.budgetId}
                                                categoryId={categoryFormData.id} />}
                                        />
                                    </ButtonToolbar>
                                </Router>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        )
    }
}

export default CategoryTable;