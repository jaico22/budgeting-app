using BudgetingAppApi.Controllers.Forms;
using Core.Forms;
using Infastructure.Documents;
using Infastructure.Loaders;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace Core.CategoryList
{
    public class CategoryProcessor
    {
        private IBudgetRepository _budgetRepository;

        public CategoryProcessor(IBudgetRepository budgetRepository)
        {
            var connectionString = "mongodb://localhost:27017";
            var database = "test_budgets";
            _budgetRepository = budgetRepository;
            _budgetRepository.Initialize(connectionString, database);
        }

        public async Task<TransactionListForm> GetPlannedTransactions(string budgetId, string categoryId)
        {
            var budgetDetails = await _budgetRepository.GetBudget(new ObjectId(budgetId));
            var category = budgetDetails.Categories.Where(x => x.Id.ToString() == categoryId).FirstOrDefault();
            TransactionListForm transactionListForm = new TransactionListForm();
            foreach(var transaction in category.PlannedTransactions)
            {
                transactionListForm.Transactions.Add(
                    new TransactionForm
                    {
                        Id = transaction.Id.ToString(),
                        Name = transaction.Name,
                        Description = transaction.Description,
                        Amount = transaction.Amount,
                        Date = transaction.Date,
                        IsPlanned = true,
                        LinkedTransactionId = transaction.LinkedTransactionId ?? ""
                    }
                );
            }
            return transactionListForm;
        }

        public async Task<Budget> EditCategory(CategoryForm categoryForm, string budgetId)
        {
            var category = new Category
            {
                Id = new ObjectId(categoryForm.Id),
                Name = categoryForm.Name,
                Description = categoryForm.Description,
                IsExpense = true
            };
            return await _budgetRepository.EditCategory(new ObjectId(budgetId), category);
        }

        public async Task<Budget> AddCategoryToBudget(CategoryForm categoryForm, string budgetId)
        {
            var category = new Category
            {
                Name = categoryForm.Name,
                Description = categoryForm.Description,
                IsExpense = true,
                PlannedTransactions = new List<Transaction>(),
                ActualTransactions = new List<Transaction>()
            };
            return await _budgetRepository.AddCategory(new ObjectId(budgetId), category);
        }

        public async Task<Budget> RemoveCategoryFromBudget(string BudgetId, string CategoryId)
        {
            var budgetId = new ObjectId(BudgetId);
            var categoryId = new ObjectId(CategoryId);
            return await _budgetRepository.DeleteCategory(budgetId, categoryId);
        }

    }
}
