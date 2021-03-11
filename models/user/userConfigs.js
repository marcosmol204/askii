const { isRequired } = require('../globalConfigs.js');

const rolesEnum = Object.freeze({
  ADMIN: 0,
  USER: 1,
});

const userStatusEnum = Object.freeze({
  DISABLED: 0,
  ACTIVE: 1,
});

const requiredRole = { type: Number, ...isRequired, enum: Object.values(rolesEnum) };
const requiredUserStatus = { type: Number, ...isRequired, enum: Object.values(userStatusEnum) };

module.exports = { requiredRole, requiredUserStatus };
