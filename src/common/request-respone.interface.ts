export interface UserResponse{
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface UserResponses{
  users: UserResponse[];
}