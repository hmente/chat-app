import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const USER_TYPES = {
  CONSUMER: "consumer",
  SUPPORT: "support",
};

//specified schema for data validation
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: String,
    lastName: String,
    type: String,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

//add a static method to our userSchema called createUser that takes in 3 parameters: firstName, lastName, type 
userSchema.statics.createUser = async function (firstName, lastName, type) {
  try {
    const user = await this.create({ firstName, lastName, type });
    return user;
  } catch (error) {
    throw error;
  }
}
//adding a static method to our userSchema called getUserById that takes in a parameter: id
userSchema.statics.getUserById = async function (id) {
    try {
      const user = await this.findOne({ _id: id });
      if (!user) throw ({ error: 'No user with this id found' });
      return user;
    } catch (error) {
      throw error;
    }
  }
  userSchema.statics.getUserByIds = async function (ids) {
    try {
      const users = await this.find({ _id: { $in: ids } });
      return users;
    } catch (error) {
      throw error;
    }
  }

//adding a static method to our userSchema called getUsers that takes no parameter and get all users
  userSchema.statics.getUsers = async function () {
    try {
      const users = await this.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
export default mongoose.model("User", userSchema);