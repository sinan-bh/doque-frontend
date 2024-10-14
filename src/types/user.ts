export interface User {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  password: string;
}

export interface UserData extends User {
  password: string;
}

export interface loginUser{
  id: string;
  email: string;
  token: string;
}