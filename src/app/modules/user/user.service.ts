import config from '../../../config/index';
import ApiErrors from '../../../errors/ApiErrors';
import { IUser } from './user.interface';
import { User } from './user.model';
import { genaretedUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto incrementel genarated id
  const id = await genaretedUserId();
  user.id = id;

  //default user password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiErrors(400, 'failed to create user!');
  }
  return createdUser;
};
export const UserService = {
  createUser,
};
