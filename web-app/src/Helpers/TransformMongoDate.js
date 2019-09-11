
function transformMongoDate(dateString)
{
    var date = new Date(dateString);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return month + '/' + day + '/' + year; 
}

export default transformMongoDate;