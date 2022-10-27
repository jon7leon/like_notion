import axiosClient from "./axiosClient";


interface ReturnCreateMemoInfo {
  _id: string
  user: string
  position: number
  icon?: string
  title?: string
  description?: string
  favorite?: boolean
  favoritePosition?: number
}

const memoApi = {
  create: () => axiosClient.post<ReturnCreateMemoInfo>('memo'),
  getAll: () => axiosClient.get<ReturnCreateMemoInfo[]>('memo'),
  getOne: (id: string) => axiosClient.get<ReturnCreateMemoInfo>(`memo/${id}`),
  update: (id: string, params: any) => axiosClient.put<ReturnCreateMemoInfo>(`memo/${id}`, params),
  deleteOne: (id: string) => axiosClient.delete<ReturnCreateMemoInfo>(`memo/${id}`)
}

export default memoApi;