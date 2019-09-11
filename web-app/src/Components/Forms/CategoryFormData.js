import TransactionFormData from "./TransactionFormData";

class CategoryFormData{
    constructor(category){
        this.id = "";
        this.name = "";
        this.description = "";
        this.plannedTransactions = [];
        this.actualTransactions = [];
        this.amountBudgeted = 0.0;
        this.amountSpent = 0.0;
        this.amountRemaining = 0.0;
        this.projectedRemaining = 0.0;

        // Methods
        this.setId = this.setId.bind(this);
        this.setName = this.setName.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.checkValidName = this.checkValidName.bind(this);
        this.determineValidity = this.determineValidity.bind(this);
        this.addPlannedTransaction = this.addPlannedTransaction.bind(this);
        this.addActualTransactions = this.addActualTransactions.bind(this);
        this.setAmountBudgeted = this.setAmountBudgeted.bind(this);
        this.setAmountSpent = this.setAmountSpent.bind(this);
        this.setAmountRemaining = this.setAmountRemaining.bind(this);

        if(arguments.length){
            this.setId(category.id);
            this.setName(category.name);
            this.setDescription(category.description);
            category.plannedTransactions.forEach(plannedTransaction => {
                this.addPlannedTransaction(new TransactionFormData(plannedTransaction));
            });
            category.actualTransactions.forEach(actualTransaction => {
                this.addActualTransactions(new TransactionFormData(actualTransaction));
            })
            this.setAmountBudgeted(category.amountBudgeted);
            this.setAmountSpent(category.amountSpent);
            this.setAmountRemaining(category.amountRemaining);

        }
    }

    setAmountRemaining(amountRemaining){
        this.amountRemaining = amountRemaining;
        return true;
    }

    setAmountSpent(amountSpent){
        this.amountSpent = amountSpent;
        return true;
    }

    setAmountBudgeted(amountBudgeted){
        this.amountBudgeted = amountBudgeted;
    }

    addPlannedTransaction(transactionFormData){
        this.plannedTransactions.push(transactionFormData);
        return true;
    }

    addActualTransactions(transactionFormData){
        this.actualTransactions.push(transactionFormData);
        return true;
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