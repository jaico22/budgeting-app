import React from 'react'
import CategoryFormData from './CategoryFormData'
import Form from 'react-bootstrap/Form'

class CategoryForm extends React.Component{
    constructor(props){
        super(props);
        let categoryData = new CategoryFormData();
        if(this.props.defaultData!=null){
            categoryData = this.props.defaultData;
        }
        this.state = {
            categoryData: categoryData,
            nameErrorMsg: "",
            descriptionErrorMsg: "",
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    updateParent(){
        this.props.parentCallback(this.state.categoryData);
    }

    handleNameChange(name){
        var res = this.state.categoryData.setName(name);
        if(!res){
            this.setState({nameErrorMsg: "Enter Valid Name"});
        }else{
            this.setState({nameErrorMsg: ""});
            this.updateParent();
        }       
    }

    handleDescriptionChange(description){
        var res = this.state.categoryData.setDescription(description);
        if(!res){
            this.setState({descriptionErrorMsg: "Enter Valid Description"});
        }else{
            this.setState({descriptionErrorMsg: ""});
            this.updateParent();
        }             
    }

    render(){
        return(
            <Form>
                <Form.Group>

                    <Form.Label>Category Name</Form.Label>
                    <Form.Control type="text" placeholder="Category Name"
                        onChange={data => {this.handleNameChange(data.target.value)}}
                        value={this.state.categoryData.name} />
                    <p className="text-danger">{this.state.nameErrorMsg}</p>

                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textbox" placeholder="Category Name"
                        onChange={data => {this.handleDescriptionChange(data.target.value)}}
                        value={this.state.categoryData.description} />
                    <p className="text-danger">{this.state.nameErrorMsg}</p>

                </Form.Group>
            </Form>
        )
    }
}

export default CategoryForm;