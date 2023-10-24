import { NextResponse } from "next/server";
import util from "util";
import db from "../../../../utils/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const query = util.promisify(db.query).bind(db);

export const authOption = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Check if users exists
        const sql1 = "SELECT * FROM users WHERE u_username = ?";
        let user = await query(sql1, [credentials.username]);
        user = user[0];

        if (!user) {
          return null;
        }

        // Validate password
        if (user.u_password) {
          
          bcrypt.compare(
            credentials.password,
            user.u_password,
            function (err, result) {
              if (result) {
                console.log("login success")
                return user;
              } else {
                return null;
              }
            }
          );
        }
      },
    }),
  ],
  secret: "1234",
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };