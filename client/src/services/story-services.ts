import { Story } from '@/types/types'
import api from './api'

export const getDriverStories = async (userId: number): Promise<Story[]> => {
  console.log(userId, api) // to enable build
  //   try {
  //     const { data } = await api.post<Story[]>(`/stories/driver/${userId}`)
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

export const getSenderStories = async (userId: number): Promise<Story[]> => {
  console.log(userId, api) // to enable build
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

export const createStory = async ({
  photo,
  caption,
}: {
  photo: string
  caption: string
}): Promise<Story> => {
  console.log(photo, caption) // to enable build
  //   try {
  //     const { data } = await api.post<Story>('/stories', story)
  //     return data
  //   } catch (error) {
  //     console.error('Failed to create story:', error)
  //     return null
  //   }
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    id: Math.floor(Math.random() * 1000),
    caption: caption,
    imageUrl: photo,
    date: new Date().toISOString(),
  }
}
