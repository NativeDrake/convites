import { boolean, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	fullName: text('fullName'),
	confirmed: boolean('confirmed'),
	canPair: boolean('canPair'),
	pair: text('pair'),
	from: text('from')
});


