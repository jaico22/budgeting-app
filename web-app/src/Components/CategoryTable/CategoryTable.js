import React from 'react'
import Table from 'react-bootstrap/Table'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Transactions from './Transactions/Transactions'
import Planning from './Planning/Planning'
import EditCategory from '../Categories/CategoryControls/EditCategory'

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
                    {this.props.categories.map(category =>(
                        <tr>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>{category.amountBudgeted}</td>
                            <td>{category.amountSpent}</td>
                            <td>{category.amountRemaining}</td>
                            <td>{category.projectedRemaining}</td>
                            <td>
                                <ButtonToolbar>
                                    <EditCategory categoryData={category} 
                                                  budgetId={this.props.budgetId}/>
                                    &nbsp;
                                    <Transactions transactions={category.actualTransactions}/>
                                    &nbsp;
                                    <Planning transactions={category.plannedTransactions}/>
                                </ButtonToolbar>
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