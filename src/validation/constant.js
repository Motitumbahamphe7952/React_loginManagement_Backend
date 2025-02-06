import { config } from "dotenv";
config();

export const password = process.env.PASSWORD;
export const email = process.env.EMAIL;
export const secretKey = process.env.SECRET_KEY;

export const port = process.env.PORT;
export const dburl = process.env.DB_URL;
// export const dburl = `mongodb+srv://nikhillimbu918:nikhillimbu918@coder.1zymf.mongodb.net/dw18`;
