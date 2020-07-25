
getIndex = function(req, res, next) {
  res.render('index', { title: 'RESTful Routing' });
}

getExample = function(req,res){
  res.render('example' , {title: "Example HTTP Request"});
}

getReqExample = function(req,res){
  res.statusJson(200 , {message : "User Made A GET Request"});
}


postReqExample = function(req,res){
  res.json({message : "User Made A Post Request"});
}


putReqExample = function(req,res){
  res.json({message : "User Made A PUT Request"});
}


deleteReqExample = function(req,res){
  res.json({message : "User Made A DELETE Request"});
}

getRestful = function(req,res){
  res.render('restful' , {title : "Restful Routing Architecture"});
}

getStatusCode = function(req,res){
  res.render('status-codes' , {title : "HTTP Status Code"});
}


module.exports = {
    getIndex,
    getExample,
    getReqExample,
    postReqExample,
    putReqExample,
    deleteReqExample,
    getRestful,
    getStatusCode
}
