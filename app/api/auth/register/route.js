import { NextResponse } from "next/server";
import util from "util";
import db from "../../../../utils/db";
import bcrypt from "bcrypt";

const query = util.promisify(db.query).bind(db);

// CREATE user
export const POST = async (req) => {
  try {
    const contentType = req.headers.get("Content-Type");

    if (contentType !== "application/json") {
      throw new Error("Invalid content type");
    }

    const user = await req.json();

    const { email, username, password } = user;

    if (!email || !username || !password) {
      throw new Error("Need email, username, and password parameters");
    }

    // Check if user exists

    const sql1 = "SELECT * FROM users WHERE u_email = ? OR u_username = ?";

    const userExists = await query(sql1, [email, username]);

    if (userExists.length > 0) {
      throw new Error("User already exists");
    }

    // Create user

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const sql2 =
          "INSERT INTO users (u_email, u_username, u_password) VALUES (?, ?, ?)";
        await query(sql2, [email, username, hash]);
      });
    });

    return NextResponse.json(
      { message: "registration successfull, user created" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ "error_message": e.message }, { status: 400 });
  }
};

// DELETE user
export const DELETE = async (req) => {
  try {
    throw Error("Not implemented")
  } catch (e) {
    return NextResponse.json({ "error_message": e.message }, { status: 400 });
  }
};
