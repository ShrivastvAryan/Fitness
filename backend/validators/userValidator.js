const { z } = require("zod");

const userSchema = z.object({
  id: z.number().int().optional(), // auto-incremented
  created_at: z.string().datetime().optional(), // handled by DB
  userName: z.string().min(1, "Name is required"), // matches DB column userName
  email: z.string().email("Invalid email format"),
  phone: z
    .number()
    .int()
    .refine((val) => val.toString().length === 10, "Phone number must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pincode: z
    .number()
    .int()
    .refine((val) => val.toString().length === 6, "Pincode must be 6 digits"),
  location: z.string().min(1, "Location is required"),
});

module.exports = userSchema;
