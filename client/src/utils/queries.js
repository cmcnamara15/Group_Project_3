import { gql } from "@apollo/client";

export const FIND_ALL_ACCOUNTS = gql`
  query accounts {
    accounts {
      _id
      email
      password
    }
  }
  `;

export const FIND_SINGLE_ACCOUNT = gql`
  query account($id: ID!) {
    account(_id: $id){
      _id
      email
      password
    }
  }
  `;

export const FIND_ALL_USERS = gql`
  query users {
    users {
      _id
      firstName
      lastName
    }
  }
  `;

export const FIND_SINGLE_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      firstName
      lastName
    } 
  }
  `;

export const FIND_ALL_SHIFTS = gql`
    query shifts {
    shifts {
      _id
      endDateTime
      endDateTime
    }
  }
  `;

export const FIND_SINGLE_SHIFT = gql`
  query shift($id: ID!) {
    shift(_id: $id){
      _id
      endDateTime
      endDateTime
    }
  }
  `;

export const FIND_ALL_POSITIONS = gql`
  query positions {
    positions {
      _id
      jobTitle
    }
  }
  `;

export const FIND_SINGLE_POSITION = gql`
  query position($id: ID!) {
    position(_id: $id){
      _id
      jobTitle
    }
  }
  `;

  export const FIND_ALL_COMPANIES = gql`
    query companies {
    companies {
      _id
      companyName
      companyPhone
    }
  }
  `;

export const FIND_SINGLE_COMPANY = gql`
  query company($id: ID!) {
    company(_id: $id){
      _id
      companyName
      companyPhone
    }
  }
  `;
