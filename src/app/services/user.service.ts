import { Injectable } from '@angular/core';
import { IUser } from '@src/common/types';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor( private apollo: Apollo) {}

  addUser(user: Partial<IUser>) {
    const SIGNUP= gql`mutation signup($user:CreateUserInput!) {
      signup(user:$user){ 
        name
        lastName
        id
        admin
        active
        email
      }
    }`
    return this.apollo.mutate<{signup:IUser}>({mutation:SIGNUP,variables:{user}})
  }
  getUsers() {
    return this.apollo.query<{ users: IUser[] }>({
      query: gql`
        {
          users {
            email
            name
            lastName
            active
            id
          }
        }
      `,
    });
  }
  removeUser(id: number) {
    const DELETEUSER = gql`
      mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
          affected
        }
      }
    `;
    return this.apollo.mutate({ mutation: DELETEUSER, variables: { id } });
  }
  updateUserActivity(id: number, userActivity: { active: boolean }) {
    const UPDATEACTIVITY = gql`
      mutation updateActivity($id: ID!, $active: Boolean!) {
        updateActivity(id: $id, active: $active){
          affected
        }
      }
    `;
    return this.apollo.mutate({mutation:UPDATEACTIVITY,variables:{id,active:userActivity.active}})
  }
}
