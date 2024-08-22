import { allUsers } from "$lib/api/db";

export async function load({ params }) {

  try {
    const users = await allUsers('TeM2124')
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
