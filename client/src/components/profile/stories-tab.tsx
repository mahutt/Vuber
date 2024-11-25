import { useAuth } from '@/providers/AuthProvider'
import { Story } from '@/types/types'
import { useEffect, useState } from 'react'
import { getDriverStories } from '@/services/story-services'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus } from 'lucide-react'
import StoryViewer from './story-viewer'

export default function StoriesTab() {
  const { user, loading } = useAuth()
  const [stories, setStories] = useState<Story[]>([])
  const [loadingStories, setLoadingStories] = useState<boolean>(true)

  useEffect(() => {
    if (loading) {
      return
    }
    if (user) {
      getDriverStories(user.id)
        .then((stories) => setStories(stories))
        .then(() => setLoadingStories(false))
    }
  }, [user, loading])

  const renderStoriesContent = () => {
    if (loadingStories) {
      return Array(5)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            key={`skeleton-${index}`}
            className="w-16 h-16 rounded-full"
          />
        ))
    }

    return (
      <>
        {stories.map((story) => (
          <StoryViewer key={story.id} story={story} />
        ))}
        <button className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
          <Plus className="text-gray-600" size={24} />
        </button>
      </>
    )
  }

  return (
    <div>
      <p className="mb-2 text-muted-foreground">
        See what your driver's up to:
      </p>
      <div className="flex items-center gap-2 flex-wrap py-2">
        {renderStoriesContent()}
      </div>
    </div>
  )
}
