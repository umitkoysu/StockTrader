errorWrapperAsync = (controller) => (req, res, next) => {
   return Promise.resolve(controller(req, res, next)).catch((err) => next(err));
};
  
module.exports = errorWrapperAsync;