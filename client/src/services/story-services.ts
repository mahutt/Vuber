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
      date: new Date(),
    },
    {
      id: 2,
      caption: 'Story 2',
      imageUrl:
        'https://www.tplusride.com/wp-content/uploads/2019/01/GettyImages-1065087504.jpg',
      date: new Date(),
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
      date: new Date(),
    },
    {
      id: 2,
      caption: 'Story 2',
      imageUrl:
        'https://www.tplusride.com/wp-content/uploads/2019/01/GettyImages-1065087504.jpg',
      date: new Date(),
    },
  ]
}

export const createStory = async ({
  file,
  caption,
}: {
  file: File
  caption: string
}): Promise<Story | null> => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('caption', caption)
    const { data } = await api.post<Story>('/stories/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (error) {
    console.error('Failed to create story:', error)
    return null
  }
}

export function base64ToFile(
  base64String: string,
  filename: string,
  mimeType: string = 'image/png'
): File {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '')
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: mimeType })
  const file = new File([blob], filename, { type: mimeType })
  return file
}

// for testing purposes:
export function downloadImage(file: File, filename?: string) {
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = filename || 'downloaded-image.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
