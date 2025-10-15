const db = require("../models/db");
const { User } = require("../models/userSchema");
const userSchema = require("../validators/userValidator");
const { eq } = require("drizzle-orm");

const Signup = async (req, res, next) => {
  try {
    
    const data = userSchema.parse(req.body);
    const { email } = data;
    const existingUser = await db.select().from(User).where(eq(User.email, email));

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await db.insert(User).values(data).returning();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const Login=async(req,res,next)=>{
    try {
        const data = userSchema.parse(req.body);
        const { email } = data;

        const existingUser = await db.select().from(User).where(eq(User.email, email));

        if (existingUser.length== 0) {
        return res.status(400).json({ message: "User does not exists" });
        }

        

    } catch (error) {
        
    }
}

module.exports = { Signup };
