class TransactionFormData{
    constructor(){
        this.id = "";
        this.name = "";
        this.description = "";
        this.amount = 0.0;
        this.date = "";
        this.isPlanned = true;
        this.linkedTransactionId = "";
        //
        this.setDescription = this.setDescription.bind(this);
        this.setName = this.setName.bind(this);
        this.validateDescription = this.validateDescription.bind(this);
        this.validateName = this.validateName.bind(this);
        this.setAmount = this.setAmount.bind(this);
        this.validateDate = this.validateDate.bind(this);
        this.setDate = this.setDate.bind(this);
        this.determineValidity = this.determineValidity.bind(this);
        this.setIsPlanned = this.setIsPlanned.bind(this);
        this.setId = this.setId.bind(this);
    }

    convertToFormData(){
        var bodyFormData = new FormData();
        bodyFormData.set('Id',this.id);
        bodyFormData.set('Name',this.name);
        bodyFormData.set('Description', this.description);
        bodyFormData.set('Amount',this.amount);
        bodyFormData.set('Date',this.date);
        bodyFormData.set('IsPlanned',this.isPlanned);
        bodyFormData.set('LinkedTransactionId',this.linkedTransactionId);
        return bodyFormData;
    }

    setId(id){
        this.id = id;
        return true;
    }

    setIsPlanned(isPlanned){
        this.isPlanned = isPlanned;
        return true;
    }

    setDate(dateString){
        this.date = dateString;
        return this.validateDate(dateString);
    }

    setAmount(value){
        this.amount = value;
        return true;
    }

    setName(name){
        this.name = name;
        return this.validateName(name); 
    }

    setDescription(description){
        this.description = description;
        return this.validateDescription;
    }

    validateDate(dateString){
        var regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        return regex.test(dateString)   
    }

    validateDescription(description){
        return true;
    }

    validateName(name){
        return name.length > 0;
    }

    determineValidity(){
        return this.validateName(this.name) &&
               this.validateDescription(this.name) &&
               this.validateDate(this.date)
    }
}

export default TransactionFormData;