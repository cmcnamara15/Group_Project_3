const { Account, Address, Company, Position, Shift, User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    accounts: async (parent) => {
      console.log("accounts block");
      const accounts = await Account.find({});
      return accounts;
    },
    account: async (parent, args, context) => {
      console.log("account_id block");
      console.log(args);
      const account = await Account.findOne(args);
      return account;
    },
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
    me: async (parent, args, context) => {
      if(context.account) {
        console.log(context.account)
        const account = await Account.findOne({
          _id: context.account._id
        })
        .populate("user");
        return account;
      } else{
        throw new AuthenticationError("needs to be logged in")
      }
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
    positions: async (parent) => {
      console.log("positions block");
      const positions = await Position.find({});
      return positions;
    },
    position: async (parent, args, context) => {
      console.log("position_id block");
      console.log(args);
      const position = await Position.findOne(args);
      return position;
    },
    companies: async (parent) => {
      console.log("company block");
      const companies = await Company.find({});
      return companies;
    },
    company: async (parent, args, context) => {
      console.log("company_id block");
      console.log(args);
      const company = await Company.findOne(args);
      return company;
    },
  },

  Mutation: {
    login: async (parent, { email, password }, context) => {
      const account = await Account.findOne({ email });
      if (!account) {
          throw new AuthenticationError(
              "No account found with this email address"
          );
      }
      const correctPw = await account.isCorrectPassword(password);
      if (!correctPw) {
          throw new AuthenticationError("Incorrect password");
      }
      const token = signToken(account);
      return token
    },

      createAccount: async (parents, args) => {
        try{
        console.log("create account block");
        console.log(args);
        const account = await Account.create(args);
        return account;
      } catch(err) {
        console.log(err)
        throw new Error("something went wrong!")
      }
    },
    deleteAccount: async (args) => {
      console.log("delete account block");
      console.log(args);
      const account = await Account.deleteOne(args);
      return;
    },
    createUser: async (parent, args, context) => {
      if(context.account) {
        console.log("create user block");
        console.log(args.input);
        const user = await User.create(args.input);

        const account = await Account.updateOne({
          _id: context.account._id
        }, {
          user: user._id
        })

        return user;
      } else {
        throw new AuthenticationError("needs to be logged in")
      }

    },
    updateUser: async(parent, {_id, ...args }) => {
      const user = await User.findByIdAndUpdate(
        _id,
        args,
        { new: true }
      );
      if(!user) {
        throw new Error("no user with this id")
      }
      return user;
    },
    deleteUser: async (args) => {
      console.log("delete user block");
      console.log(args);
      const user = await User.deleteOne(args);
      return;
    },
    addShift: async (parent, args) => {
      console.log("add shift block");
      console.log(args.input);
      const shift = await Shift.create(args.input);
      return shift;
    },
    updateShift: async (parent, {_id, ...args}) => {
      const shift = await Shift.findByIdAndUpdate(
        _id,
        args,
        { new: true } 
      );
      if(!shift) {
        throw new Error("no shift with this ID")
      }
      return shift;
    },
    deleteShift: async (args) => {
      console.log("delete shift block");
      console.log(args);
      const shift = await Shift.deleteOne(args);
      return;
    },
    addPosition: async (parent, args) => {
      console.log("add position block");
      console.log(args);
      const position = await Position.create(args);
      return position;
    },
    updatePosition: async (parent, {_id, ...args}) => {
      const position = await Position.findByIdAndUpdate(
        _id,
        args,
        { new: true } 
      );
      if(!position) {
        throw new Error("no position with this ID")
      }
      return position;
    },
    deletePosition: async (args) => {
      console.log("delete position block");
      console.log(args);
      const position = await Position.deleteOne(args);
      return;
    },
    addCompany: async (parent, args) => {
      console.log("add company block");
      console.log(args.input);
      const company = await Company.create(args.input);
      return company;
    },
    updateCompany: async (parent, {_id, ...args}) => {
      const company = await Company.findByIdAndUpdate(
        _id,
        args,
        { new: true } 
      );
      if(!company) {
        throw new Error("no position with this ID")
      }
      return company;
    },
    deleteCompany: async (args) => {
      console.log("delete company block");
      console.log(args);
      const company = await Company.deleteOne(args);
      return;
    },
    // ***Addresses***
  },
};

module.exports = resolvers;