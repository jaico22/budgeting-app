namespace BudgetingAppApi.Controllers.Forms
{
    public class CategoryListItem
    {
        public string CategoryName { get; set; }

        public decimal PlannedAmount { get; set; }

        public decimal ActualAmount { get; set; }

        public decimal RemainingAmount { get; set; }

        public decimal ProjectedAmount { get; set; }
    }
}