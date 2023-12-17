export interface Photo {
  name: string
  url: string
}

export interface User {
  firstName: string
  lastName: string
  fullName: string
  email: string
  role: string
  avatar: string
  photos: Photo[] | null
}

export interface UserRegister extends User {
  password: string
}

export interface UserLogin extends User, Auth {}

export interface Auth {
  access_token: string
}

export interface AuthLogin {
  email: string
  password: string
}
