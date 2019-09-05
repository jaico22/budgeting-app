using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Forms
{
    public class BudgetForm
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset EndDate { get; set; }

        public decimal TotalToBeBudgeted { get; set; }

        /// <summary>
        /// Total Amount Budgeted
        /// </summary>
        public decimal TotalBudgeted { get; set; }

        /// <summary>
        /// Actual Amount Spent
        /// </summary>
        public decimal ActualSpent { get; set; }

        /// <summary>
        /// Amount left over (Total - Actual)
        /// </summary>
        public decimal LeftOver { get; set; }

        /// <summary>
        /// Projected to be left over at the end of the amount
        /// </summary>
        public decimal ProjectLeftOver { get; set; }

        /// <summary>
        /// List of category details
        /// </summary>
        public List<CategoryForm> Categories { get; set; }
    }
}
