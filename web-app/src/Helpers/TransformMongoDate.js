
function transformMongoDate(dateString)
{
    var date = new Date(dateString);
    return date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear();
}

export default transformMongoDate;