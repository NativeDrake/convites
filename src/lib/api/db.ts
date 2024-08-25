import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { DATABASE_URL, BASE_PASS } from '$env/static/private';
import { eq } from 'drizzle-orm';
import * as schema from './schema';

export type User = typeof schema.users.$inferSelect

// DBSettings
const connectionString = DATABASE_URL
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client, { schema });

export function allUsers() {
  return db.select().from(schema.users).execute();
}

export const fetchUser = (userId: number) => {
  return db.query.users.findFirst({ where: (user, { eq }) => eq(user.id, userId) })
}

export const createUser = (user: User) => {

  return db.insert(schema.users).values(user);
}

export const updateUser = (id: number, user: Partial<User>) => {
  return db.update(schema.users).set(user).where(eq(schema.users.id, id)).execute()
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
