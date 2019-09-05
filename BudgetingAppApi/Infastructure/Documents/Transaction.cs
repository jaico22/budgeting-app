using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infastructure.Documents
{
    public class Transaction
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Description")]
        public string Description { get; set; }

        [BsonElement("Amount")]
        public decimal Amount { get; set; }

        [BsonElement("Date")]
        public DateTimeOffset Date { get; set; }

        [BsonElement("LinkedTransactionId")]
        public string LinkedTransactionId { get; set; }
    }
}
