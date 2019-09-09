import React from 'react'
import Container from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

import './BudgetOverviewHeader.css'
class BudgetControlBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showCreateModal: false,
            budgetName: "",
            budgetDescription: "",
            budgetNameError: "",
            validName: false,
            amountToBeBudgeted: 0.0,
            startDate: "",
            validStart: false,
            endDate: "",
            validEnd: false,
            endDateError: "",
            startDateError: "",
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.checkValidDate = this.checkValidDate.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    handleCreate(){
        const {budgetName, budgetDescription, amountToBeBudgeted, startDate, endDate} = this.state;

        var bodyFormData = new FormData();
        bodyFormData.set('Name',budgetName);
        bodyFormData.set('Description', budgetDescription);
        bodyFormData.set('StartDate',startDate);
        bodyFormData.set('EndDate',endDate);
        bodyFormData.set('TotalToBeBudgeted',amountToBeBudgeted);
        debugger;
        axios({
            method: 'post',
            url: 'https://localhost:44300/api/Budget',
            data: bodyFormData,
            config: {headers: {'Content-Type:':'multipart/form-data'}},
        })
        .then(function (response) {
            window.location.reload();
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
        this.handleClose();
    }

    handleName(data){
        if(this.isEmptyOfWhitespace(data.target.value)==true){
            this.setState({budgetNameError: "Please enter a name for the budget", validName: false});
        }else{
            this.setState({budgetName: data.target.value, budgetNameError: "", validName: true});
        }
    }

    checkValidDate(date){
        var regex = /^\d{2}\/\d{2}\/\d{4}$/;
        return regex.test(date)
    }

    isEmptyOfWhitespace(string){
        var regex = /^$|\s+/
        return regex.test(string)
    }

    handleStartDate(data){
        this.setState({startDate: data.target.value});
        if(this.checkValidDate(data.target.value) == false){
            this.setState({startDateError: "Invalid Date Format", validStart: false});
        }else{
            this.setState({startDate: data.target.value, startDateError: "", validStart: true});
        }
    }

    handleEndDate(data){
        this.setState({endDate: data.target.value});
        if(this.checkValidDate(data.target.value) == false){
            this.setState({endDateError: "Invalid Date Format", validEnd: false});
        }else{
            this.setState({endDate: data.target.value, endDateError: "", validEnd: true});
        }
    }

    handleClose(){
        this.setState({
            showCreateModal: false
        })
    }

    handleShow(){
        this.setState({
            showCreateModal: true
        })
    }

    render(){
        return(
            <div>
                <Container>
                <Row>
                    <Col >
                    <div className="OverviewControlers">
                        <Button onClick={this.handleShow}>Add New Budget</Button>
                    </div>
                    </Col>
                </Row>
                </Container>
                <Modal size="lg" show={this.state.showCreateModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Budget</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="budgetCreate">
                                <Form.Label>Budget Name</Form.Label>
                                <Form.Control type="text" placeholder="BudgetName" 
                                              onChange={data => {this.handleName(data)}}/>
                                <Form.Label>Amount To Be Budgeted</Form.Label>
                                <Form.Control type="number" step = "0.01" placeholder="1234.45" 
                                              onChange={data => {this.setState({amountToBeBudgeted: data.target.value})}}/>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="text" placeholder="MM/DD/YYYY" 
                                              onChange={data => {this.handleStartDate(data)}}/>
                                    <p className="text-danger">{this.state.startDateError}</p>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control type="text" placeholder="MM/DD/YYYY" 
                                              onChange={data => {this.handleEndDate(data)}}/>
                                    <p className="text-danger">{this.state.endDateError}</p>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button disabled={!(this.state.validStart && this.state.validEnd && this.state.validName)}
                                variant="primary"
                                onClick={this.handleCreate}>
                        Create Budge
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default BudgetControlBar;