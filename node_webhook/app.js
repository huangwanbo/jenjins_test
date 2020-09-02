var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({path:'/webhooks', secret:'myHashSecret'});


function run_cmd(cmd, args, callback){
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function (buffer) { resp += buffer.toString()});
  child.stdout.on('end', function () { callback(resp)})
}


http.createServer(function(req,res){
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}) .listen(3000);


handler.on('error', function (err) {
  console.log('error', err.message)
})

handler.on('*', function(event) {
  console.log('received', event.payload.action);
})

handler.on('push', function(event) {
  console.log('Received a push event for %s to %s',
event.payload.repository.name,
event.payload.ref);
// 分支判断
if(event.payload.ref === 'refs/heads/master'){
console.log('deploy master..')
}
// run_c
})

handler.on('issues', function(event) {
  console.log('Received an issue event for % action=%s: #%d %s',
  event.payload.repositiry.name,
  event.payload.action,
  event.payload.issue.number,
  event.payload.issue.title)
})