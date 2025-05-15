import httpClient from '../../utils/http/httpClient'

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  avatar: string
}

export async function getOne(id: number): Promise<User> {
  const response = await httpClient.get<{ data: User }>(`users/${id}`)

  return response.data.data
}
