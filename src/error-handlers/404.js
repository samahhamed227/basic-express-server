'use strict';
function handle404(req, res, next) {
  
    const err = {
        status: 404,
        message: 'NOT FOUND'
    }

    res.status(404).json(err);
   
}

module.exports = handle404;
