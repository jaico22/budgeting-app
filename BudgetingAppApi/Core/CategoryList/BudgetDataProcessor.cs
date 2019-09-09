using Core.Forms;
using Infastructure.Documents;
using Infastructure.Loaders;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.CategoryList
{
    public class BudgetDataProcessor
    {

        private IBudgetRepository _budgetRepository;

        public BudgetDataProcessor(IBudgetRepository budgetRepository)
        {
            var connectionString = "mongodb://localhost:27017";
            var database = "test_budgets";
            _budgetRepository = budgetRepository;
            _budgetRepository.Initialize(connectionString, database);
        }

        public async Task DeleteBudget(ObjectId budgetId)
        {
            await _budgetRepository.DeleteBudget(budgetId);
        }

        public async Task AddBudget(BudgetForm budgetForm)
        {
            var budget = new Budget
            {
                TotalToBeBudgeted = budgetForm.TotalToBeBudgeted,
                Description = budgetForm.Description,
                Name = budgetForm.Name,
                StartDate = budgetForm.StartDate,
                EndDate = budgetForm.EndDate
            };

            await _budgetRepository.AddBudget(budget);
        }

        public async Task<List<BudgetForm>> GetBudgets()
        {
            List<Budget> bugets = await _budgetRepository.GetAllBudgets();
            var budgetForms = new List<BudgetForm>();
            foreach (var budget in bugets)
            {
                var budgetForm = CreateBudgetForm(budget);
                budgetForms.Add(budgetForm);
            }
            return budgetForms;
        }

        public async Task<BudgetForm> GetBudgetById(ObjectId budgetId)
        {
            var budget = await _budgetRepository.GetBudget(budgetId);
            if (budget == null)
            {
                return null;
            }
            return CreateBudgetForm(budget);
        }


        public BudgetForm CreateBudgetForm(Budget budget)
        {
            var budgetForm = new BudgetForm();
            budgetForm.Categories = new List<CategoryForm>();
            foreach (var category in budget.Categories)
            {
                budgetForm.Categories.Add(GenerateCategoryForm(category));
            }
            budgetForm.Id = budget.Id.ToString();
            budgetForm.Name = budget.Name;
            budgetForm.TotalToBeBudgeted = budget.TotalToBeBudgeted;
            budgetForm.Description = budget.Description;
            budgetForm.StartDate = budget.StartDate;
            budgetForm.EndDate = budget.EndDate;
            budgetForm.ActualSpent = budgetForm.Categories.Sum(x=>x.AmountSpent);
            budgetForm.LeftOver = budgetForm.Categories.Sum(x=>x.AmountRemaining);
            budgetForm.ProjectLeftOver = budgetForm.Categories.Sum(x=>x.ProjectedRemaining);
            budgetForm.TotalBudgeted = budgetForm.Categories.Sum(x => x.AmountBudgeted); ;
            return budgetForm;
        }

        public CategoryForm GenerateCategoryForm(Category category)
        {
            var categoryForm = new CategoryForm();
            categoryForm.Id = category.Id.ToString();
            categoryForm.Name = category.Name;
            categoryForm.Description = category.Description;
            categoryForm.AmountBudgeted = CalulateAmountBudgeted(category);
            categoryForm.AmountSpent = CalulateAmountSpent(category);
            categoryForm.AmountRemaining = categoryForm.AmountBudgeted - categoryForm.AmountSpent;
            categoryForm.ProjectedRemaining = CalculateCategoryProjection(category);
            categoryForm.PlannedTransactions = GenerateTransactionForms(category.PlannedTransactions, IsPlanned: true);
            categoryForm.ActualTransactions = GenerateTransactionForms(category.ActualTransactions, IsPlanned: false);
            return categoryForm;
        }

        private decimal CalulateAmountSpent(Category category)
        {
            List<decimal> plannedAmounts;
            try
            {
                plannedAmounts = category.ActualTransactions.Select(x => x.Amount).ToList();
            }
            catch
            {
                plannedAmounts = null;
            }
            
            if (plannedAmounts == null)
            {
                return 0;
            }
            return plannedAmounts.Sum();
        }

        private decimal CalulateAmountBudgeted(Category category)
        {
            List<decimal> plannedAmounts;
            try
            {
                plannedAmounts = category.PlannedTransactions.Select(x => x.Amount).ToList();
            }
            catch
            {
                plannedAmounts = null;
            }

            if (plannedAmounts == null)
            {
                return 0;
            }
            return plannedAmounts.Sum();
        }

        private List<TransactionForm> GenerateTransactionForms(List<Transaction> Transactions, bool IsPlanned)
        {
            List<TransactionForm> transactionForms = new List<TransactionForm>();
            TransactionForm transactionForm;
            if (Transactions == null)
            {
                return transactionForms;
            }
            foreach(var transaction in Transactions)
            {
                transactionForm = new TransactionForm
                {
                    Id = transaction.Id.ToString(),
                    Name = transaction.Name,
                    Description = transaction.Description,
                    Amount = transaction.Amount,
                    Date = transaction.Date,
                    IsPlanned = IsPlanned,
                    LinkedTransactionId = transaction.LinkedTransactionId
                };
                transactionForms.Add(transactionForm);
            }
            return transactionForms;
        }

        public decimal CalculateCategoryProjection(Category category)
        {
            decimal projection = 0.0m;
            if (category.PlannedTransactions == null)
            {
                return 0.0m;
            }
            foreach(var plannedTransaction in category.PlannedTransactions)
            {
                if(plannedTransaction.Date  <= DateTimeOffset.Now)
                {
                    var matchingTransactions = category.ActualTransactions.Where(
                        x => x.LinkedTransactionId == plannedTransaction.Id.ToString()).Select(x => x.Amount);
                    if (matchingTransactions != null)
                    {
                        var actualAmount = matchingTransactions.Sum();
                        projection += plannedTransaction.Amount - actualAmount;
                    }

                }
            }
            return projection;
        }
    }
}
