import httpClient from '../../utils/http/httpClient'

export async function deleteUser(id: number): Promise<void> {
  const response = await httpClient.delete<void>(`users/${id}`)

  return response.data
}
