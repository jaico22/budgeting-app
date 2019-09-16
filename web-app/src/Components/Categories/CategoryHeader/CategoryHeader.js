import React from 'react'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import './CategoryHeader.css'
import CreateCategory from '../../Categories/CategoryControls/CreateCategory';
class CategoryHeader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col xs={3}>
                        <h1 class="table-header">Categories</h1> 
                    </Col>
                    <Col>
                        <ButtonToolbar>
                            <CreateCategory budgetId={this.props.budgetId} />
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CategoryHeader;