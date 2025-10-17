const { pgTable, serial, text, integer, timestamp, boolean } = require("drizzle-orm/pg-core");

const product = pgTable("product", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  product_name: text("product_name").notNull(),
  gender:text('gender').notNull(),
  category:text('category').notNull(),
  size: text("size").array().notNull(),
  color: text("color").array().notNull(),
  offer_price: integer("offer_price"),
  original_price: integer("original_price").notNull(),
  description: text("description").notNull(),
  isAvailable: boolean("isAvailable").default(true),
  image:text('image')
});

module.exports = { product };
