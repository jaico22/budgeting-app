using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.CategoryList;
using Core.Forms;
using Infastructure.Loaders;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BudgetingAppApi.Controllers
{
    public class CategoryController : Controller
    {
        private readonly IBudgetRepository _budgetRepository;
        private CategoryProcessor _categoryProcessor;

        public CategoryController(IBudgetRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
            _categoryProcessor = new CategoryProcessor(_budgetRepository);
        }

        [Route("api/[controller]/GetPlannedTransactions")]
        [HttpGet("{budgetId}/{categoryId}")]
        public async Task<IActionResult> GetPlannedTransactions(string budgetId, string categoryId)
        {
            var transactionList = await _categoryProcessor.GetPlannedTransactions(budgetId, categoryId);
            if (transactionList == null)
            {
                return NotFound();
            }
            return Ok(transactionList);
        }

        // POST api/<controller>/Add
        [Route("api/[controller]/Add")]
        [HttpPost("{budgetId}")]
        public async Task<IActionResult> Post([FromForm]CategoryForm newCategory, string budgetId)
        {
            var modifiedBudget = await _categoryProcessor.AddCategoryToBudget(newCategory, budgetId);
            if (modifiedBudget == null)
            {
                return NotFound();
            }
            return Ok(modifiedBudget);
        }

        // DELETE api/<controller>/Remove
        [Route("api/[controller]/Remove")]
        [HttpDelete("{budgetId}/{categoryId}")]
        public async Task<IActionResult> Delete(string budgetId, string categoryId)
        {
            var modifiedBudget = await _categoryProcessor.RemoveCategoryFromBudget(budgetId, categoryId);
            if (modifiedBudget == null)
            {
                return NotFound();
            }
            return Ok(modifiedBudget);
        }

        // POST api/<controller>/Edit
        [Route("api/[controller]/Edit")]
        [HttpPost("{budgetId}")]
        public async Task<IActionResult> Edit([FromForm]CategoryForm category, string budgetId)
        {
            var modifiedBudget = await _categoryProcessor.EditCategory(category, budgetId);
            if (modifiedBudget == null)
            {
                return NotFound();
            }
            return Ok(modifiedBudget);
        }
    }
}