const bcrypt = require("bcrypt");

export const Utils = {
  async hash(ToHash: string) {
    const saltRounds = 10;
    return bcrypt.hash(ToHash, saltRounds);
  },

  async deHash(ToDeHash: string, Hash: string) {
    return bcrypt.compare(ToDeHash, Hash);
  }
};