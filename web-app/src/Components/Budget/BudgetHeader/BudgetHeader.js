import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import BudgetFormData from '../../Forms/BudgetFormData';
import EditBudget from '../BudgetControls/EditBudget';
import DeleteBudget from '../BudgetControls/DeleteBudget';

class BudgetHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showDeleteConfirmation: false,
            showEditForm: false,
            budgetFormData: this.props.budgetFormData,
            editFormData: new BudgetFormData()
        }
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col xs={3}>
                            <h1 class="table-header">Budget Summary</h1> 
                        </Col>
                        <Col>
                            <ButtonToolbar>
                                <EditBudget variant="primary" budgetFormData={this.state.budgetFormData}/>
                                &nbsp;
                                <DeleteBudget budgetId={this.state.budgetFormData.id} />
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default BudgetHeader;