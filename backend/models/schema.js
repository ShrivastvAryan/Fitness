const { pgTable, serial, text, integer, timestamp, boolean } = require("drizzle-orm/pg-core");

const products = pgTable("products", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  product_name: text("product_name").notNull(),
  size: text("size").array().notNull(),
  color: text("color").array().notNull(),
  offer_price: integer("offer_price"),
  original_price: integer("original_price").notNull(),
  description: text("description").notNull(),
  isAvailable: boolean("isAvailable").default(true),
});

module.exports = { products };
