const { z } = require("zod");

const userSchema = z.object({
  id: z.number().int().optional(), // auto-incremented
  created_at: z.string().datetime().optional(), // handled by DB
  userName: z.string().min(1, "Name is required"), // matches DB column userName
  email: z.string().email("Invalid email format"),
  phone: z.string().max(10),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().max(6),
  location: z.string().min(1, "Location is required"),
});

module.exports = userSchema;
