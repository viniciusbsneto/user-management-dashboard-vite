import httpClient from '../../utils/http/httpClient'

interface SignUpParams {
  name: string
  email: string
  password: string
}

interface SignUpResponse {
  id: number
  token: string
}

export async function signUp({
  name,
  email,
  password,
}: SignUpParams): Promise<SignUpResponse | null> {
  try {
    const response = await httpClient.post<SignUpResponse>('register', {
      name,
      email,
      password,
    })

    return response.data
  } catch (error) {
    console.error(error)

    return null
  }
}
