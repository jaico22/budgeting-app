using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infastructure.Documents
{
    public class Budget
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("StartDate")]
        public DateTimeOffset StartDate { get; set; }

        [BsonElement("EndDate")]
        public DateTimeOffset EndDate { get; set; }

        [BsonElement("Categories")]
        public List<Category> Categories { get; set; }

        [BsonElement("TotalToBeBudgeted")]
        public decimal TotalToBeBudgeted { get; set; }

    }
}
