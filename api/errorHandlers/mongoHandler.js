module.exports = (error, req, res, next) => {
  if (error.name === 'MongoError') {
    console.log(`it work`);
    if(error.code === 11000) {
      return res.status(409).json({
        type: error.name,
        message: error.message,
        code: error.code
      });
    } else {
      return res.status(400).json({
        type: error.name,
        message: error.message,
        code: error.code
      });
    }
  }
  next(error);
};