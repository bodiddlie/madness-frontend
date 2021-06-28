export interface Game {
  name: string;
  description: string;
  image: string;
}

export interface Entry {
  PK: string;
  SK: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  email: string;
  token: string;
}
