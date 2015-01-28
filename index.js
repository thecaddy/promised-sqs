
var AWS = require('aws-sdk')

//we have a list because amazon doesn't
var calls = ['addPermission','changeMessageVisibility'
  ,'changeMessageVisibilityBatch','createQue','deleteMessage'
  ,'deleteMessageBatch','deleteQueue','getQueueAttributes'
  ,'getQueueUrl','listDeadLetterSourceQueues','listQueues'
  ,'purgeQueues','receiveMessage','removePermission'
  ,'sendMessage','sendMessageBatch','setQueueAttributes']

module.exports = function(qUrl, awsConfig){
  var sqs = new AWS.SQS(awsConfig)
  var retObj = {}
  for(var i = 0; i < calls.length; i++){
    retObj[calls[i]] = function(call){
      return function(params){
        params.QueueUrl = qUrl
        return new Promise(function(resolve, reject){
          sqs[call](params, function(err, data){
            if(err) reject(err)
            resolve(data)
          })
        })
      }
    }(calls[i])
  }
  return retObj
}