const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-central-1'});
const docClient = new AWS.DynamoDB.DocumentClient();
async function listItems(event){
  try {
      let qs = event.queryStringParameters.user_id;
      var params = {
          TableName: "users",
          KeyConditionExpression: "user_id = :v1",
          ExpressionAttributeValues: { ":v1": qs}
        };
    const data = await docClient.query(params).promise();
    const res = {
        statusCode: 200,
        body: JSON.stringify({
            data
        })
    };
    return res;
  } catch (err) {
    return err;
  }
}
exports.handler = async (event) => {
    console.log('inside lambda irena..');
    if(event.httpMethod === "GET"){
        return listItems(event);
    }
    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body);
        console.log(body);
}
};