import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./lib/connectDB";
import { User } from "./../db/userModel";

connectDB();
export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "emma" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials; // getting name and password from form
        const user = await User.findOne({ email });
        if (email == "") {
          throw new Error("please enter your email");
        }
        if (!user) {
          throw new Error("user not found");
        }
        if (user) {
          return signupuser(user, password);
        }
      },
    }),
    // ...add more providers here
  ],
};
const signupuser = async (user, password) => {
  if (!password) {
    throw new Error("enter your password");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("password or email is incorrect");
  }
  return user;
};
export default NextAuth(authOptions);
