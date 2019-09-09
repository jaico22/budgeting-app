import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'

class BudgetHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showDeleteConfirmation: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteBudget = this.deleteBudget.bind(this);
    }

    handleOpen(){
        this.setState({
            showDeleteConfirmation: true
        })
    }

    handleClose(){
        this.setState({
            showDeleteConfirmation: false
        })
    }
    
    deleteBudget(){
        axios({
            method: 'delete',
            url: 'https://localhost:44300/api/Budget/'+this.props.budgetId,
        })
        .then(function (response) {
            window.location.reload();
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
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
                                <Button variant="primary">Edit Budget</Button>
                                &nbsp;
                                <Button variant="danger" onClick={this.handleOpen}>Delete Budget</Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Container>

                <Modal show={this.state.showDeleteConfirmation} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Deletion Confirmation</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to delete this budget?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={this.handleClose}>No, go back!</Button>
                        <Button variant="danger" onClick={this.deleteBudget}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default BudgetHeader;