using Infastructure.Documents;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infastructure.Loaders
{
    public interface IBudgetRepository
    {
        /// <summary>
        /// Add's new category to budget document identified by <paramref name="BudgetId"/>
        /// </summary>
        /// <param name="BudgetId"></param>
        /// <param name="NewCategory"></param>
        Task<Budget> AddCategory(ObjectId BudgetId,Category NewCategory);

        void Initialize(string connectionString,string database);

        Task AddBudget(Budget NewBudget);

        Task<Budget> EditBudget(ObjectId BudgetId, Budget NewBudget);

        Task<Budget> GetBudget(ObjectId BudgetId);

        Task<Budget> EditCategory(ObjectId BudgetId, Category NewCategory);

        Task<Budget> AddTransaction(ObjectId BudgetId, ObjectId CategoryId, Transaction transaction, bool IsPlanned);

        Task<List<Budget>> GetAllBudgets();

        Task<List<Budget>> GetValidBudgets();

        Task DeleteBudget(ObjectId budgetId);

        Task<Budget> DeleteCategory(ObjectId BudgetId, ObjectId CategoryId);

        Task<Budget> EditTransaction(ObjectId BudgetId, ObjectId CategoryId, Transaction transaction, bool IsPlanned);

        Task<Budget> DeleteTransaction(ObjectId BudgetId, ObjectId CategoryId, Transaction transaction, bool IsPlanned);

    }
}
