import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

class BudgetHeader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col xs={3}>
                        <h1 class="table-header">Budget Summary</h1> 
                    </Col>
                    <Col>
                        <ButtonToolbar>
                            <Button variant="primary">Edit Budget</Button>
                            &nbsp;
                            <Button variant="danger">Delete Budget</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default BudgetHeader;