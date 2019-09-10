using System.Collections.Generic;
using System.Threading.Tasks;
using BudgetingAppApi.Controllers.Forms;
using BudgetingAppApi.Forms;
using Core.CategoryList;
using Core.Forms;
using Infastructure.Loaders;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BudgetingAppApi.Controllers
{
    
    public class BudgetController : Controller
    {
        private readonly IBudgetRepository _budgetRepository;
        private BudgetDataProcessor _budgetDataProcessor; 

        public BudgetController(IBudgetRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
            _budgetDataProcessor = new BudgetDataProcessor(_budgetRepository);
        }

        /// <summary>
        /// Retreives all budgets
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/[controller]")]
        public async Task<BudgetFormContainer> GetAllAsync()
        {
            var budgets = await _budgetDataProcessor.GetBudgets();
            return new BudgetFormContainer { Budgets = budgets };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        [Route("api/[controller]")]
        public async Task<IActionResult> GetByIdAsync(string id)
        {
            var objectId = new ObjectId(id);
            var budgetForm = await _budgetDataProcessor.GetBudgetById(objectId);
            if (budgetForm == null)
            {
                return NotFound();
            }
            return Ok(budgetForm);
        }

        // POST api/<controller>
        [HttpPost]
        [Route("api/[controller]")]
        public async Task<IActionResult> Post([FromForm]BudgetForm newBudget)
        {
            await _budgetDataProcessor.AddBudget(newBudget);
            return Ok();
        }

        // POST api/<controller>/Edit
        [HttpPost]
        [Route("api/[controller]/Edit")]
        public async Task<IActionResult> Edit([FromForm]BudgetForm newBudget)
        {
            await _budgetDataProcessor.EditBudget(newBudget);
            return Ok();
        }

        // DELETE api/<controller>/5
        [Route("api/[controller]/Remove/{id}")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var budgetId = new ObjectId(id);
            var budget = await _budgetDataProcessor.GetBudgetById(budgetId);
            if (budget == null)
            {
                return NotFound();
            }
            await _budgetDataProcessor.DeleteBudget(budgetId);
            return Ok();
        }
    }
}
