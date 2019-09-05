using Core.Forms;
using Infastructure.Documents;
using Infastructure.Loaders;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.CategoryList
{
    public class TransactionProcessor
    {
        private IBudgetRepository _budgetRepository;

        public TransactionProcessor(IBudgetRepository budgetRepository)
        {
            var connectionString = "mongodb://localhost:27017";
            var database = "test_budgets";
            _budgetRepository = budgetRepository;
            _budgetRepository.Initialize(connectionString, database);
        }

        public async Task<Budget> DeleteTransaction(TransactionForm transactionForm, string BudgetId, string CategoryId)
        {
            Transaction transaction = MapTransactionFormToTransaction(transactionForm);
            return await _budgetRepository.DeleteTransaction(new ObjectId(BudgetId), new ObjectId(CategoryId), transaction, transactionForm.IsPlanned);
        }

        public async Task<Budget> EditTransaction(TransactionForm transactionForm, string BudgetId, string CategoryId)
        {
            Transaction transaction = MapTransactionFormToTransaction(transactionForm);
            return await _budgetRepository.EditTransaction(new ObjectId(BudgetId), new ObjectId(CategoryId), transaction, transactionForm.IsPlanned);
        }


        public async Task<Budget> AddTransaction(TransactionForm transactionForm,string BudgetId, string CategoryId)
        {
            Transaction transaction = MapTransactionFormToTransaction(transactionForm);
            return await _budgetRepository.AddTransaction(new ObjectId(BudgetId), new ObjectId(CategoryId), transaction, transactionForm.IsPlanned);
        }

        private static Transaction MapTransactionFormToTransaction(TransactionForm transactionForm)
        {
            return transactionForm.Id == null ?
                new Transaction
                {
                    Name = transactionForm.Name,
                    Description = transactionForm.Description,
                    Amount = transactionForm.Amount,
                    Date = transactionForm.Date,
                    LinkedTransactionId = transactionForm.LinkedTransactionId
                }
                    :
                new Transaction
                {
                    Id = new ObjectId(transactionForm.Id),
                    Name = transactionForm.Name,
                    Description = transactionForm.Description,
                    Amount = transactionForm.Amount,
                    Date = transactionForm.Date,
                    LinkedTransactionId = transactionForm.LinkedTransactionId
                };
        }
    }
}
