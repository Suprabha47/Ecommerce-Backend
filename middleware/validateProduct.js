const Joi = require("joi");

const productSchema = Joi.object({
  productName: Joi.string().trim().required(),
  productDescription: Joi.string().trim().required(),
  price: Joi.number().positive().required(),
  discountPrice: Joi.number().positive().required(),
  image: Joi.string().optional(),
  category: Joi.string().trim().required(),
  seoTitle: Joi.string().trim().required(),
  seoDescription: Joi.string().trim().required(),
});

module.exports = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
