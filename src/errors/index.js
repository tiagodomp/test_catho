exports.errorHandler = (err, req, res, next) => {
    res.status(err.status);
    res.render('error', { 
        error: {
            message: err.message,
            data: res
        } 
    });
}
  