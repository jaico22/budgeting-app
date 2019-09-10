import React from 'react'
import axios from 'axios'
import CategoryFormData from '../../Forms/CategoryFormData';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CategoryForm from '../../Forms/CategoryForm'
import DeleteCategory from './DeleteCategory';

class EditCategory extends React.Component{
    constructor(props){
        super(props);
        
        var categoryFormData = new CategoryFormData();
        categoryFormData.setId(this.props.categoryData.id);
        categoryFormData.setName(this.props.categoryData.name);
        categoryFormData.setDescription(this.props.categoryData.description);

        this.state = {
            showWindow: false,
            categoryFormData: categoryFormData
        }

        this.openWindow = this.openWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.updateEditData = this.updateEditData.bind(this);
        this.editCategory = this.editCategory.bind(this);
    }

    openWindow(){
        this.setState({
            showWindow: true
        })
    }

    closeWindow(){
        this.setState({
            showWindow: false
        })
    }

    updateEditData(categoryFormData){
        this.setState({
            categoryFormData: categoryFormData
        })
    }

    editCategory(){
        var bodyFormData = this.state.categoryFormData.convertToFormData();
        axios({
            method: 'post',
            url: 'https://localhost:44300/api/Category/Edit/?budgetId='+this.props.budgetId,
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
                <Button variant="primary" onClick={this.openWindow}>Edit</Button>
            
                <Modal show={this.state.showWindow} onHide={this.closeWindow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Category</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <CategoryForm defaultData={this.state.categoryFormData} 
                                      parentCallback={data => {this.updateEditData(data)}}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <DeleteCategory categoryId={this.state.categoryFormData.id} budgetId={this.props.budgetId} />
                        <Button variant="secondary" onClick={this.closeWindow}>Cancel</Button>
                        <Button variant="success" onClick={this.editCategory}>Edit</Button>
                    </Modal.Footer>
                </Modal>           
            </div>           
        )
    }
}

export default EditCategory;