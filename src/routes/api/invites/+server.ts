import { allUsers } from "$lib/api/db";
import { json, type RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent) {
  return json({ params: event.params })
  try {
    const user = await allUsers('TeM2124a')
    return json({ status: 200, user })
  } catch (err) {
    console.log(err)
    return json({ status: 400, err })
  }
}
