import { User } from "@/model/user-model";

export async function createUser(user) {
  try {
    await User.create(user);
  } catch (e) {
    throw new Error(e);
  }
}

export async function getUsers() {
  try {
    const users = await User.find({});
    return users;
  } catch (e) {
    throw new Error(e);
  }
}
