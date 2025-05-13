import httpClient from '../../utils/http/httpClient'

interface SignInParams {
  email: string
  password: string
}

interface SignInResponse {
  token: string
}

export async function signIn({
  email,
  password,
}: SignInParams): Promise<SignInResponse> {
  const response = await httpClient.post<SignInResponse>('/login', {
    email,
    password,
  })

  const { token } = response.data

  return { token }
}
