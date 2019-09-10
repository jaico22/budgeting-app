import React from 'react'
import Container from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './BudgetOverviewHeader.css'
import CreateBudget from '../../Budget/BudgetControls/CreateBudget';

class BudgetControlBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }

    }



    render(){
        return(
            <div>
                <Container>
                <Row>
                    <Col >
                        <div className="OverviewControlers">
                            <CreateBudget />
                        </div>
                    </Col>
                </Row>
                </Container>

            </div>
        );
    }
}

export default BudgetControlBar;