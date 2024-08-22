import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { boolean, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { DATABASE_URL, BASE_PASS } from '$env/static/private';
import { eq } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('fullName'),
  confirmed: text('confirmed'),
  canPair: boolean('canPair'),
  pair: text('pair'),
  from: text('from')
});

export type User = typeof users.$inferSelect

// DBSettings
const connectionString = DATABASE_URL
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client);

export function allUsers(pass: string) {
  if (!verifyPass(pass)) throw 'Password incorrecta'
  return db.select().from(users).execute();
}

export const fetchUser = (name: string, pass: string) => {
  if (!verifyPass(pass)) throw 'Password incorrecta'
  db.select().from(users);
}

export const createUser = (user: User, pass: string) => {
  if (!verifyPass(pass)) throw 'Password incorrecta'

  return db.insert(users).values(user);
}

export const updateUser = (id: number, user: Partial<User>, pass: string) => {
  if (!verifyPass(pass)) throw 'Password incorrecta'
  return db.update(users).set(user).where(eq(users.id, id)).execute()
}

// Clumsy veryfication
export function genPassword(name: string, pass: string) {
  if (!verifyPass(pass)) throw 'Password incorrecta'
  pass = BASE_PASS + name[0]
  return pass
}

function verifyPass(pass: string) {
  return pass.substring(0, BASE_PASS.length) === BASE_PASS
}
