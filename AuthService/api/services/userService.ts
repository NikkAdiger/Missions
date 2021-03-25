import { IUser, User } from '../models/user';

export async function findUser(user: IUser): Promise<boolean> {
    let result = false;
    const findUser = await User.findOne({ username: user.username, password: user.password });
    if(findUser) result = true;
    return result;
}

export async function findUserByUsername(username: string): Promise<boolean> {
    let result = false;
    const findUser = await User.findOne({ username });
    if(findUser) result = true;
    return result;
}