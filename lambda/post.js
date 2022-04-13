const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-central-1'});
const docClient = new AWS.DynamoDB.DocumentClient();
const {randomUUID} = require('crypto'); 
async function postUsers(event){
    const guid = randomUUID();
    const body = JSON.parse(event.body);
    body.user_id = guid;
    await createItem(body.user_id, body.name, body.age);
    let res = {
        statusCode: 200,
        body: body.user_id
    };
    return res;
}
async function createItem(a,b,c){
    const params = {
    TableName: "users",
    Item:{
        user_id:a,
        name:b,
        age:c
    }
    };
  try {
    await docClient.put(params).promise();
  } catch (err) {
    return err;
  }
}
exports.handler = async (event) => {
   if(event.httpMethod === "POST"){
      return postUsers(event);
     }
};
 