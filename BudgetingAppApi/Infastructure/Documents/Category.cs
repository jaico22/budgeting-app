using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infastructure.Documents
{
    public class Category
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("IsExpense")]
        public bool IsExpense { get; set; }

        [BsonElement("ActualTransactions")]
        public List<Transaction> ActualTransactions { get; set; }

        [BsonElement("PlannedTransactions")]
        public List<Transaction> PlannedTransactions { get; set; }

    }
}
