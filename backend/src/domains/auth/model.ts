import { Model } from 'objection';

export class UserModel extends Model {
  static tableName = 'users';

  id!: number;
  email!: string;
  password!: string;
  role!: string;
}
