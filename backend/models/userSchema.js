const { pgTable, serial, text, integer, timestamp, boolean } = require("drizzle-orm/pg-core");

const User=pgTable('user',{
    id:serial('id').primaryKey(),
    created_at:timestamp("created_at", { withTimezone: true }).defaultNow(),
    name:text('name').notNull(),
    email:text('email').notNull(),
    phone:integer('phone').notNull(),
    address:text('address'),
    state:text('state'),
    city:text('city'),
    pincode:integer('pincode'),
    location:text('location')
})

module.exports=User