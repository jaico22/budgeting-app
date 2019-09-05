using Infastructure.Documents;
using Infastructure.Loaders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Infaustructure
{
    public class BudgetTests
    {

        private BudgetRepository _budgetRepository;
        private string _testBudgetName;
        private Budget _testBudget;

        public BudgetTests()
        {
            var connectionString = "mongodb://localhost:27017";
            var database = "test_budgets";
            _testBudgetName = new Guid().ToString();
            _budgetRepository = new BudgetRepository();
            _budgetRepository.Initialize(connectionString, database);

            // Initialize Data
            ClearTestDatabase().Wait();
            _budgetRepository.AddBudget(new Budget
            {
                Categories = new List<Category>(),
                Description = _testBudgetName,
                Name = _testBudgetName,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddMonths(1)
            }).Wait();
            GetBudget().Wait();
        }

        private async Task ClearTestDatabase()
        {
            await _budgetRepository.DropDatabase("test_budgets");
            _budgetRepository.AddDatabase("test_budgets");
        }

        private async Task GetBudget()
        {
            var budgets = await _budgetRepository.GetAllBudgets();
            _testBudget = budgets.FirstOrDefault();
        }

        [Fact]
        private async Task CategoriesCanBeAdded()
        {
            var category = new Category
            {
                ActualTransactions = new List<Transaction>(),
                PlannedTransactions = new List<Transaction>(),
                Description = "test",
                IsExpense = false,
                Name = "test",
            };

            await _budgetRepository.AddCategory(_testBudget.Id, category);

            await GetBudget();

            Assert.True(_testBudget.Categories.Where(x => x.Name == "test" && x.IsExpense == false).Count() > 0);
        }
    }
}
