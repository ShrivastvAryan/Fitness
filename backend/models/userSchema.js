const { pgTable, serial, text, integer, timestamp } = require("drizzle-orm/pg-core");

const User=pgTable('user',{
    id:serial('id').primaryKey(),
    created_at:timestamp("created_at", { withTimezone: true }).defaultNow(),
    userName:text('userName').notNull(),
    email:text('email').notNull(),
    phone:text('phone').notNull(),
    address:text('address').notNull(),
    state:text('state').notNull(),
    pincode:text('pincode').notNull(),
    location:text('location').notNull()
})

module.exports=User