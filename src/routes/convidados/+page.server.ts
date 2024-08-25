import { BASE_PASS } from "$env/static/private";
import { allUsers } from "$lib/api/db";

export async function load({ params }) {

  try {
    const users = await allUsers(BASE_PASS)
    return {
      users,
      params
    }
  }
  catch (err) {
    console.log('no users')
    return { users: [] }
  }
}
