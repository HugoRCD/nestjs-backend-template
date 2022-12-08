const bcrypt = require("bcrypt");

export const Utils = {
  async hashPassword(passwordToHash: string) {
    const saltRounds = 10;
    return bcrypt.hash(passwordToHash, saltRounds);
  },

  async deHashPassword(passwordToDeHash: string, passwordHash: string) {
    return bcrypt.compare(passwordToDeHash, passwordHash);
  }
};