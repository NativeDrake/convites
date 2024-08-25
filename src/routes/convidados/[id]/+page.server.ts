import { fetchUser, updateUser, type User } from "$lib/api/db";
import { error, fail } from "@sveltejs/kit";
import { BASE_PASS } from '$env/static/private';

export async function load({ params }) {
  const user = await fetchUser(params?.id)

  if (!user) return error(404, {
    message: 'Convidao não encontrado'
  })

  return {
    user,
    params
  }
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id')
    const confirmed = data.get('confirmed') === 'true'
    const password = data.get('password')

    if (!confirmPassword(id, password)) {
      return fail(422, {
        id,
        confirmed,
        error: 'Passowrd inválida'
      })
    }

    try {
      await updateUser(id, { confirmed })
      return {
        success: 'Salvo com successo'
      }
    } catch (err: any) {
      console.log({ err })
      const message = err?.Error ?? 'verifique os dados'

      return fail(500, {
        id,
        confirmed,
        error: 'Erro ao salvar (' + message + ')'
      })
    }
  }
};

function confirmPassword(id: string, password: string) {
  try {
    const res = (2123 * parseInt(id) + 8 - 2) === parseInt(password)
    return res
  } catch (err) {
    return false
  }
}
