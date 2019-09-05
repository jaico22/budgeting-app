using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Forms
{
    public class CategoryForm
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal AmountBudgeted { get; set; }

        public decimal AmountSpent { get; set; }

        public decimal AmountRemaining { get; set; }

        public decimal ProjectedRemaining { get; set; }

        public List<TransactionForm> PlannedTransactions { get; set; }

        public List<TransactionForm> ActualTransactions { get; set; }

    }
}
