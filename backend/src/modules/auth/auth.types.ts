/*
|--------------------------------------------------------------------------
| DTOs
|--------------------------------------------------------------------------
*/

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

/*
|--------------------------------------------------------------------------
| Auth User
|--------------------------------------------------------------------------
*/

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

/*
|--------------------------------------------------------------------------
| Login Result
|--------------------------------------------------------------------------
*/

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}