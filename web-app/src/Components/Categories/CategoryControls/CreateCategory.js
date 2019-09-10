import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CategoryForm from '../../Forms/CategoryForm';
import CategoryFormData from '../../Forms/CategoryFormData';

class CreateCategory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showWindow: false,
            categoryFormData: new CategoryFormData()
        }
        this.openWindow = this.openWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.updateCreateData = this.updateCreateData.bind(this);
    }

    updateCreateData(categoryFormData){
        this.setState({
            categoryFormData: categoryFormData
        });
    }

    openWindow(){
        this.setState({
            showWindow: true
        });
    }

    closeWindow(){
        this.setState({
            showWindow: false
        });
    }

    createCategory(){
        var bodyFormData = this.state.categoryFormData.convertToFormData();
        axios({
            method: 'post',
            url: 'https://localhost:44300/api/Category/Add/?budgetId='+this.props.budgetId,
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
        this.closeWindow();      
    }

    render(){
        return(
            <div>
                <Button variant="primary" onClick={this.openWindow}>Add Category</Button>
            
                <Modal show={this.state.showWindow} onHide={this.closeWindow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Category</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <CategoryForm parentCallback={data => {this.updateCreateData(data)}}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeWindow}>Cancel</Button>
                        <Button variant="success" onClick={this.createCategory}>Create</Button>
                    </Modal.Footer>
                </Modal>           
            </div>
        )
    }
}

export default CreateCategory;