import CategoryFormData from "./CategoryFormData";
import transformMongoDate from '../../Helpers/TransformMongoDate'

class BudgetFormData{
    constructor(budget){
        this.id = "";
        this.budgetName = "";
        this.description = "";
        this.amountToBeBudgeted = 0.0;     
        this.startDate = null;
        this.endDate = null;
        this.categories = [];
        this.calculatedReadOnlyValues = {
            totalBudgeted: 0.0,
            actualSpent: 0.0,
            leftOver: 0.0,
            projectLeftOver: 0.0
        }

        // Methods
        this.determineValidity = this.determineValidity.bind(this);
        this.checkValidName = this.checkValidName.bind(this);
        this.checkValidDate = this.checkValidDate.bind(this);
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.setBudgetName = this.setBudgetName.bind(this);
        this.setAmountToBeBudgeted = this.setAmountToBeBudgeted.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.setCalculatedReadOnlyValues = this.setCalculatedReadOnlyValues.bind(this);

        //
        if(arguments.length){
            this.setBudgetName(budget.name);
            this.setAmountToBeBudgeted(budget.totalToBeBudgeted);
            this.setStartDate(transformMongoDate(budget.startDate));
            this.setEndDate(transformMongoDate(budget.endDate))
            this.setId(budget.id);
            this.setCategories(budget.categories);
            this.setCalculatedReadOnlyValues(budget);
        }
    }

    convertToFormData(){
        var bodyFormData = new FormData();
        bodyFormData.set('Id',this.id);
        bodyFormData.set('Name',this.budgetName);
        bodyFormData.set('Description', this.description);
        bodyFormData.set('StartDate',this.startDate);
        bodyFormData.set('EndDate',this.endDate);
        bodyFormData.set('TotalToBeBudgeted',this.amountToBeBudgeted);
        return bodyFormData;
    }
    
    setCalculatedReadOnlyValues(budget){
        this.calculatedReadOnlyValues = {
            totalBudgeted: budget.totalBudgeted,
            actualSpent: budget.actualSpent,
            leftOver: budget.leftOver,
            projectLeftOver: budget.projectLeftOver
        }
    }

    setCategories(categories){
        (categories).forEach(category => {
            this.addCategory(new CategoryFormData(category));
        });
    }

    addCategory(categoryFormData){
        this.categories.push(categoryFormData);
        return true;
    }

    setId(id){
        this.id = id;
        return true;
    }

    setBudgetName(name){
        this.budgetName = name;
        if(this.checkValidName(name)===true){
            return true;
        }else{
            return false;
        }
    }

    setAmountToBeBudgeted(value){
        this.amountToBeBudgeted = value;
        return true;
    }

    setStartDate(date){
        if(date==null){
            return false;
        }
        this.startDate = date;
        if(this.checkValidDate(date)){
            return true;
        }else{
            return false;
        }
    }

    setEndDate(date){
        if(date==null){
            return false;
        }
        this.endDate = date;
        if(this.checkValidDate(date)){
            return true;
        }else{
            return false;
        }
    }

    determineValidity(){
        return(
            this.checkValidDate(this.startDate) && 
            this.checkValidDate(this.endDate) &&
            this.checkValidName(this.budgetName)
        )
    }

    checkValidName(name){
        if(name==null){
            return false;
        }
        return(
            name.length > 0
        )
    }

    checkValidDate(date){
        var regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        return regex.test(date)
    }

}

export default BudgetFormData;