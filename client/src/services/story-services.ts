import { Story } from '@/types/types'
import api from './api'

// this function is for fetching the stories belonging to a sender's driver.
export const getDriverStories = async (userId: number): Promise<Story[]> => {
  //   try {
  //     const { data } = await api.post<Story[]>(`/stories/sender/${userId}`)
  //     return data
  //   } catch (error) {
  //     console.error('Failed to fetch stories:', error)
  //     return []
  //   }
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      caption: 'Story 1',
      imageUrl:
        'https://www.tplusride.com/wp-content/uploads/2019/01/GettyImages-1065087504.jpg',
      date: new Date().toISOString(),
    },
    {
      id: 2,
      caption: 'Story 2',
      imageUrl:
        'https://www.tplusride.com/wp-content/uploads/2019/01/GettyImages-1065087504.jpg',
      date: new Date().toISOString(),
    },
  ]
}
