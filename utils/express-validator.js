const { validationResult } = require('express-validator');

// const validate = (validations) => async (req, res, next) => {
//   await Promise.all(validations.map((validation) => validation.run(req)));

//   const validationArray = validationResult(req);
//   if (validationArray.isEmpty()) {
//     return next();
//   }
//   return res.status(400).json({
//     error:
//         {
//           status: 400,
//           message: 'Bad Request',
//           errors: validationArray.array(),
//         },
//   });
// };
const validate = (validations) => async (req, res, next) => {
  for (const validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({ errors: errors.array() });
};
module.exports = {
  validate,
};
