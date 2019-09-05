using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.CategoryList;
using Core.Forms;
using Infastructure.Loaders;
using Microsoft.AspNetCore.Mvc;

namespace BudgetingAppApi.Controllers
{
    public class TransactionController : Controller
    {
            
        private readonly IBudgetRepository _budgetRepository;
        private TransactionProcessor _transactionProcessor;

        public TransactionController(IBudgetRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
            _transactionProcessor = new TransactionProcessor(_budgetRepository);
        }

        // POST api/<controller>/Add
        [Route("api/[controller]/Add")]
        [HttpPost("{budgetId}/{categoryId}")]
        public async Task<IActionResult> New([FromForm]TransactionForm TransactionForm, string BudgetId, string CategoryId)
        {
            var modifiedBudget = await _transactionProcessor.AddTransaction(TransactionForm, BudgetId, CategoryId);
            if (modifiedBudget == null)
            {
                return NotFound();
            }
            return Ok(modifiedBudget);
        }

        [Route("api/[controller]/Edit")]
        [HttpPost("{budgetId}/{categoryId}")]
        public async Task<IActionResult> Edit([FromForm]TransactionForm TransactionForm, string BudgetId, string CategoryId)
        {
            var modifiedBudget = await _transactionProcessor.EditTransaction(TransactionForm, BudgetId, CategoryId);
            if (modifiedBudget == null)
            {
                return NotFound();
            }
            return Ok(modifiedBudget);
        }

        [Route("api/[controller]/Delete")]
        [HttpPost("{budgetId}/{categoryId}")]
        public async Task<IActionResult> Delete([FromForm]TransactionForm TransactionForm, string BudgetId, string CategoryId)
        {
            var modifiedBudget = await _transactionProcessor.DeleteTransaction(TransactionForm, BudgetId, CategoryId);
            if (modifiedBudget == null)
            {
                return NotFound();
            }
            return Ok(modifiedBudget);
        }

    }
}