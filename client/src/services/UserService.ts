import { AxiosResponse } from 'axios';
import { IUser } from '../models/AuthResponse';
import $api from '../http';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }
}
