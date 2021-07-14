const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

var requireLogin = function (req, res, next) {
  if(req.headers['authorization']){
    var parts = req.headers['authorization'].split(" ");
    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];
  
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;

        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
          if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
          
          req.userId = decoded.id;
          next();
        });
        
      } else {
        return res.status(500).json({ auth: false, message: 'Invalid authorization header.' });
      }
    } else {
      return res.status(500).json({ auth: false, message: 'Failed to read header.' });
    }
  } else {
    return res.status(500).json({ auth: false, message: 'No authorization header provided.' });
  }
};

module.exports = {requireLogin};