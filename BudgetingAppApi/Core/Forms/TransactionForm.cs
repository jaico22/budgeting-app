using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Forms
{
    public class TransactionForm
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Amount { get; set; }

        public DateTimeOffset Date { get; set; }

        public bool IsPlanned { get; set; }

        public string LinkedTransactionId { get; set; }
    }
}
