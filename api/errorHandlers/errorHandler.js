module.exports = (error, req, res, next) => {
  console.error(error);
  res.status(400).json({
    name: error.name,
    error: error.message });
}