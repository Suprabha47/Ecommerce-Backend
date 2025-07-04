const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // disables top-level domain checking like .com
    .required()
    .messages({
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),

  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "Password must be at least 6 characters.",
    "string.max": "Password can't be longer than 30 characters.",
    "any.required": "Password is required.",
  }),
});

module.exports = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
