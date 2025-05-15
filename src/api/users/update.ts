import httpClient from '../../utils/http/httpClient'

interface User {
  id: string
  name: string
  job: string
  updatedAt: string
}

interface UpdateUserParams {
  id: number
  name: string
  email: string
}

export async function update({
  id,
  name,
  email,
}: UpdateUserParams): Promise<User> {
  const response = await httpClient.put<User>(`users/${id}`, { name, email })

  return response.data
}
