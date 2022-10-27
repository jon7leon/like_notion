import axiosClient from './axiosClient';
import { User } from '../types/user';

interface LoginProps {
  username: string
  password: string
}

interface RegisterProps extends LoginProps {
  confirmPassword: string
}

interface Errors {
  value: 'username' | 'password' | 'confirmPassword'
  msg: string
  param: 'username' | 'password' | 'confirmPassword'
  location: string
}

interface ReturnAuthInfo {
  user?: User
  token?: string
  errors?: Errors[]
}

interface Check {
  user?: User
  param?: 'verity-token'
  msg?: string
}

const authApi = {
  register: (params: RegisterProps) => axiosClient.post<ReturnAuthInfo>('auth/register', {...params}),
  login: (params: LoginProps) => axiosClient.post<ReturnAuthInfo>('auth/login', {...params}),
  verifyToken: () => axiosClient.post<Check>('auth/verify-token')
}

export default authApi;