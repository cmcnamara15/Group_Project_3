const { Account, Address, Company, Position, Shift, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent) => {
      console.log("users block");
      const users = await User.find({});
      return users;
    },
    user: async (parent, args, context) => {
      console.log("user_id block");
      console.log(args);
      const user = await User.findOne(args);
      return user;
    },
    shifts: async (parent) => {
      console.log("shifts block");
      const shifts = await Shift.find({});
      return shifts;
    },
    shift: async (parent, args, context) => {
      console.log("shift_id block");
      console.log(args);
      const shift = await Shift.findOne(args);
      return shift;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      console.log("create user block");
      console.log(args.input);
      const user = await User.create(args.input);
      return user;
    },
    createAccount: async (parents, args) => {
      console.log("create account block");
      console.log(args);
      const account = await Account.create(args);
      return account;
    },
    addShift: async (parent, args) => {
      console.log("add shift block");
      console.log(args);
      const shift = await Shift.create(args.input);
      return shift;
    },
  },
};

module.exports = resolvers;
