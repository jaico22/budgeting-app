using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetingAppApi.Forms
{
    public class BudgetFormData
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset StartDate { get; set; }

        public DateTimeOffset EndDate { get; set; }
    }
}
