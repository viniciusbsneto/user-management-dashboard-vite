import httpClient from '../../utils/http/httpClient'

interface User {
  id: string
  name: string
  job: string
  createdAt: string
}

interface CreateUserParams {
  name: string
  email: string
}

export async function create({ name, email }: CreateUserParams): Promise<User> {
  const response = await httpClient.post('users', { name, email })

  return response.data
}
