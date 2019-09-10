using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Forms
{
    public class TransactionListForm
    {
        public List<TransactionForm> Transactions { get; set; }

        public TransactionListForm()
        {
            Transactions = new List<TransactionForm>();
        }
    }
}
