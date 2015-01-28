### Promised AWS SQS

A simple wrapper for AWS SQS to turn calls into promises for easy async handling.

For a more in detail document about all associated calls please refer to the AWS Docs:
http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html


#### Constructor

To create a new SQS object we require the Que URL and the AWS config.

```
var sqs = require('promised-sqs')('http://queUrl.boom', {
    apiVersion: '',
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    sslEnabled: true
  })
```

#### Usage

##### Promise Format

```
sqs.setQueueAttributes({
  Attributes: {
    MessageRetentionPeriod: '1209600'
  }
}).then(function(data){
  console.log(data)
}).catch(function(err){
  console.error(err)
})

sqs.receiveMessage({
    MaxNumberOfMessages: 1,
    AttributeNames: ['All'],
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0
  }
).then(function(data){
    console.log(data)
}).catch(function(err){
  console.error(err)
})
```

##### Co Format

```
var co = require('co')
co(function*(){
  try{
    var data = yield sqs.receiveMessage({
      MaxNumberOfMessages: 1,
      AttributeNames: ['All'],
      VisibilityTimeout: 0,
      WaitTimeSeconds: 0
    })
    console.log('data', data)
  }catch(err){
    console.error(err)
  }
)
```