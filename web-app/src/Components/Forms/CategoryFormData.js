class CategoryFormData{
    constructor(){
        this.id = "";
        this.name = "";
        this.description = "";
        // Methods
        this.setId = this.setId.bind(this);
        this.setName = this.setName.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.checkValidName = this.checkValidName.bind(this);
        this.determineValidity = this.determineValidity.bind(this);
    }

    convertToFormData(){
        var bodyFormData = new FormData();
        bodyFormData.set('Id', this.id);
        bodyFormData.set('Name', this.name);
        bodyFormData.set('Description', this.description);
        return bodyFormData;
    }

    setId(id){
        this.id = id;
        return true;
    }

    setName(name){
        this.name = name;
        if(this.checkValidName(name)===true){
            return true;
        }else{
            return false;
        }
    }

    setDescription(description){
        this.description = description;
        return true;
    }

    checkValidName(name){
        if(name==null){
            return false;
        }
        return(
            name.length > 0
        )
    }

    
    determineValidity(){
        return(
            this.checkValidName(this.name)
        )
    }
}

export default CategoryFormData;