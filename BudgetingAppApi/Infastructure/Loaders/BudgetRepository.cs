using Infastructure.Documents;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infastructure.Loaders
{
    public class BudgetRepository : IBudgetRepository
    {
        private IMongoClient _client;
        private IMongoDatabase _database;
        private IMongoCollection<Budget> _budgetCollection;


        public void Initialize(string ConnectionString, string database)
        {
            _client = new MongoClient(ConnectionString);
            _database = _client.GetDatabase(database);
            _budgetCollection = _database.GetCollection<Budget>("budgets");
        }

        public async Task DropDatabase(string database)
        {
            await _client.DropDatabaseAsync(database);
        }

        public void AddDatabase(string database)
        {
            _client.GetDatabase(database);
        }

        public async Task<Budget> DeleteCategory(ObjectId BudgetId, ObjectId CategoryId)
        {

            var matchingBudget = await _budgetCollection.Find(x => x.Id == BudgetId).FirstOrDefaultAsync();
            if (matchingBudget == null)
            {
                return null;
            }

            var matchingCategory = matchingBudget.Categories.Where(x => x.Id == CategoryId).FirstOrDefault();
            if(matchingCategory == null)
            {
                return null;
            }

            var update = Builders<Budget>.Update.Pull<Category>(e => e.Categories, matchingCategory);

            var filter = Builders<Budget>.Filter.Eq("_id", BudgetId);
            var budgetToBeUpdated = await _budgetCollection.FindOneAndUpdateAsync(filter, update);
            if (budgetToBeUpdated == null)
            {
                return null;
            }
            return await GetBudget(budgetToBeUpdated.Id);
            
        }

        public async Task<Budget> AddCategory(ObjectId BudgetId, Category NewCategory)
        {
            if (NewCategory.PlannedTransactions == null)
            {
                NewCategory.PlannedTransactions = new List<Transaction>();
            }

            if(NewCategory.ActualTransactions == null)
            {
                NewCategory.ActualTransactions = new List<Transaction>();
            }
            NewCategory.Id = new ObjectId(DateTime.Now, 0, 1, 0);
            var filter = Builders<Budget>.Filter.Eq("_id", BudgetId);
            var update = Builders<Budget>.Update.Push<Category>(e => e.Categories, NewCategory);
            var budgetToBeUpdated =  await _budgetCollection.FindOneAndUpdateAsync(filter, update);
            if (budgetToBeUpdated == null)
            {
                return null;
            }
            return await GetBudget(budgetToBeUpdated.Id);
        }

        public async Task AddBudget(Budget NewBudget)
        {
            if (NewBudget.Categories == null)
            {
                NewBudget.Categories = new List<Category>();
            }
            NewBudget.Id = new ObjectId(DateTime.Now, 0, 0, 0);
            await _budgetCollection.InsertOneAsync(NewBudget);

        }

        public async Task EditBudget(Budget NewBudget)
        {
            // Update and return updated budget
            var update = Builders<Budget>.Update.Set(x => x.Name, NewBudget.Name)
                                                .Set(x => x.Description, NewBudget.Description)
                                                .Set(x => x.TotalToBeBudgeted, NewBudget.TotalToBeBudgeted)
                                                .Set(x => x.StartDate, NewBudget.StartDate)
                                                .Set(x => x.EndDate, NewBudget.EndDate);

            var filter = Builders<Budget>.Filter.Eq("_id", NewBudget.Id);
            var budgetToBeUpdated = await _budgetCollection.FindOneAndUpdateAsync(filter, update);
        }

        public async Task<Budget> GetBudget(ObjectId BudgetId)
        {
            return await _budgetCollection.Find(x => x.Id==BudgetId).FirstOrDefaultAsync();
        }

        public async Task<Budget> EditCategory(ObjectId BudgetId, Category NewCategory)
        {
            // Check if update exists and extract categories
            var matchingBudget = await _budgetCollection.Find(x => x.Id == BudgetId).FirstOrDefaultAsync();
            if (matchingBudget == null)
            {
                return null;
            }

            // Check if category exists and swap
            var matchingCategory = matchingBudget.Categories.Where(x => x.Id == NewCategory.Id).FirstOrDefault();
            if (matchingCategory == null)
            {
                return null;
            }
            matchingBudget.Categories[matchingBudget.Categories.IndexOf(matchingCategory)] =
                NewCategory;

            // Update and return updated budget
            var update = Builders<Budget>.Update.Set<List<Category>>(x => x.Categories, matchingBudget.Categories);
            var filter = Builders<Budget>.Filter.Eq("_id", BudgetId);
            var budgetToBeUpdated = await _budgetCollection.FindOneAndUpdateAsync(filter, update);
            if (budgetToBeUpdated == null)
            {
                return null;
            }
            return await GetBudget(budgetToBeUpdated.Id);
        }

        public async Task<Budget> EditTransaction(ObjectId BudgetId, ObjectId CategoryId, Transaction transaction, bool IsPlanned)
        {
            // Check if update exists and extract categories
            var matchingBudget = await _budgetCollection.Find(x => x.Id == BudgetId).FirstOrDefaultAsync();
            if (matchingBudget == null)
            {
                return null;
            }
            var newCategories = matchingBudget.Categories;

            // Check if category exists and extract 
            var matchingCategory = matchingBudget.Categories.Where(x => x.Id == CategoryId).FirstOrDefault();
            if (matchingCategory == null)
            {
                return null;
            }

            // Determine if transaction is a planning transaction
            List<Transaction> transactionList;
            if (IsPlanned)
            {
                transactionList = matchingCategory.PlannedTransactions;
            }
            else
            {
                transactionList = matchingCategory.ActualTransactions;
            }
         

            // Check if transaction exists then swap transactions
            var matchingTransaction = transactionList.Where(x => x.Id == transaction.Id).FirstOrDefault();
            if(matchingTransaction == null)
            {
                return null;
            }
            transactionList[transactionList.IndexOf(matchingTransaction)] =
                transaction;

            // Update and return updated budget
            var update = Builders<Budget>.Update.Set<List<Category>>(x => x.Categories, newCategories);
            var filter = Builders<Budget>.Filter.Eq("_id", BudgetId);
            var budgetToBeUpdated = await _budgetCollection.FindOneAndUpdateAsync(filter, update);
            if (budgetToBeUpdated == null)
            {
                return null;
            }
            return await GetBudget(budgetToBeUpdated.Id);
        }

        public async Task<Budget> DeleteTransaction(ObjectId BudgetId, ObjectId CategoryId, Transaction transaction, bool IsPlanned)
        {
            // Check if update exists and extract categories
            var matchingBudget = await _budgetCollection.Find(x => x.Id == BudgetId).FirstOrDefaultAsync();
            if (matchingBudget == null)
            {
                return null;
            }
            var newCategories = matchingBudget.Categories;

            // Check if category exists and extract 
            var matchingCategory = matchingBudget.Categories.Where(x => x.Id == CategoryId).FirstOrDefault();
            if (matchingCategory == null)
            {
                return null;
            }

            // Determine if transaction is a planning transaction
            List<Transaction> transactionList;
            if (IsPlanned)
            {
                transactionList = matchingCategory.PlannedTransactions;
            }
            else
            {
                transactionList = matchingCategory.ActualTransactions;
            }


            // Check if transaction exists then remove the matching transaction
            var matchingTransaction = transactionList.Where(x => x.Id == transaction.Id).FirstOrDefault();
            if (matchingTransaction == null)
            {
                return null;
            }
            transactionList.Remove(matchingTransaction);

            // Update and return updated budget
            var update = Builders<Budget>.Update.Set<List<Category>>(x => x.Categories, newCategories);
            var filter = Builders<Budget>.Filter.Eq("_id", BudgetId);
            var budgetToBeUpdated = await _budgetCollection.FindOneAndUpdateAsync(filter, update);
            if (budgetToBeUpdated == null)
            {
                return null;
            }
            return await GetBudget(budgetToBeUpdated.Id);
        }

        public async Task<Budget> AddTransaction(ObjectId BudgetId, ObjectId CategoryId, Transaction transaction, bool IsPlanned)
        {
            transaction.Id = new ObjectId(DateTime.Now, 0, 2, 0);

            var matchingBudget = await _budgetCollection.Find(x => x.Id == BudgetId).FirstOrDefaultAsync();
            if (matchingBudget == null)
            {
                return null;
            }

            var newCategories = matchingBudget.Categories;

            var matchingCategory = matchingBudget.Categories.Where(x => x.Id == CategoryId).FirstOrDefault();
            if (matchingCategory == null)
            {
                return null;
            }

            // Determine if transaction is a planning transaction
            List<Transaction> transactionList;
            if (IsPlanned)
            {
                transactionList = matchingCategory.PlannedTransactions;
            }
            else
            {
                transactionList = matchingCategory.ActualTransactions;
            }

            transactionList.Add(transaction);

            var update = Builders<Budget>.Update.Set<List<Category>>(x => x.Categories, newCategories);
            var filter = Builders<Budget>.Filter.Eq("_id", BudgetId);
            var budgetToBeUpdated = await _budgetCollection.FindOneAndUpdateAsync(filter, update);
            if (budgetToBeUpdated == null)
            {
                return null;
            }
            return await GetBudget(budgetToBeUpdated.Id);
        }

        public async Task<List<Budget>> GetAllBudgets()
        {

            return await _budgetCollection.Find(_ => true).SortByDescending(x => x.EndDate).ToListAsync();
        }

        public async Task<List<Budget>> GetValidBudgets()
        {
            var now = DateTime.Now;
            return await _budgetCollection.Find(x => x.StartDate <= now && x.EndDate >= now).ToListAsync();
        }

        public async Task DeleteBudget(ObjectId budgetId)
        {
            await _budgetCollection.DeleteOneAsync(x => x.Id == budgetId);
        }


    }

}
