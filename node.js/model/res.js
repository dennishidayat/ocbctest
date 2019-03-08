'use strict';

exports.ok = function(values, res) {
  var data = {
      'status': 200,
      'message':"Success",
      'values': values
  };
  res.json(data);
  res.end();
};

exports.err = function(values, res){
  var data = {
    'status': 11,
    'values': values
  };
  res.json(data);
  res.end();
}

exports.error = function(values, res){
  var data = {
    'status': 11,
    'values': values
  };
  res.json(data);
  res.end();
}

exports.datanotfound = function(values, res){
  var data = {
    'status': 404,
    'message':"error",
    'values': values
  };
  res.json(data);
  res.end();
}