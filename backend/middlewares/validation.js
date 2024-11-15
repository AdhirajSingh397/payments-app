// middleware/validationMiddleware.js
function validateSchema(schema) {
    return (req, res, next) => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          errors: result.error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      req.validatedData = result.data; // Store validated data in the request object
      next();
    };
  }
  
  module.exports = validateSchema;
  