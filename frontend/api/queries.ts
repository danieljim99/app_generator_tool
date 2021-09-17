import { gql } from '@apollo/client';

export const GET_ALL_ACTIVITY = gql`
  query GetAllActivity {
    getAllActivity {
      _id
    }
  }
`;

export const GET_ACTIVITY = gql`
  query GetActivity($_id: string!) {
    getActivity(_id: $_id) {
      _id
      name
    }
  }
`;

export const UPDATE_ACTIVITY = gql`
  mutation UpdateActivity($_id: string!, $ActivityInput: {name: string!}!) {
    updateActivity(_id: $_id, ActivityInput: $ActivityInput) {
      _id
    }
  }
`;

export const REMOVE_ACTIVITY = gql`
  mutation RemoveActivity($_id: string!) {
    removeActivity(_id: $_id) {
      _id
    }
  }
`;

export const GET_ALL_USER = gql`
  query GetAllUser {
    getAllUser {
      _id
    }
  }
`;

export const GET_USER = gql`
  query GetUser($_id: string!) {
    getUser(_id: $_id) {
      _id
      name
      age
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($_id: string!, $UserInput: {name: string!, age: number!}!) {
    updateUser(_id: $_id, UserInput: $UserInput) {
      _id
    }
  }
`;

export const REMOVE_USER = gql`
  mutation RemoveUser($_id: string!) {
    removeUser(_id: $_id) {
      _id
    }
  }
`;
