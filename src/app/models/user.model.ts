export interface User {
  id: string,
  email: string,
  name: string,
  password: string,
  avatar: string,
  role: string
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
