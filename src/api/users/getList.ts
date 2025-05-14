import httpClient from '../../utils/http/httpClient'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

interface GetListResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: User[]
}

export async function getList(page: number) {
  const response = await httpClient.get<GetListResponse>('users', {
    params: { page },
  })

  return response.data
}
