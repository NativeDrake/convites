import { allUsers, updateUser } from "$lib/api/db";
import { fail } from "@sveltejs/kit";
import { BASE_PASS } from '$env/static/private';

export async function load({ params }) {
  console.log({ params })
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

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    try {
      const confirmed = data.FormData?.confirmed
      await updateUser(1, { confirmed }, BASE_PASS)

      return {
        success: 'Salvo com successo'
      }

    }
    catch (err) {
      console.log({ err })
      return fail(422, {
        confirmed: data.confirmed,
        error: 'Erro ao salvar'
      })
    }
  }
};
