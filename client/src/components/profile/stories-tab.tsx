import { useAuth } from '@/providers/AuthProvider'
import { Story } from '@/types/types'
import { useEffect, useState } from 'react'
import { getDriverStories, getSenderStories } from '@/services/story-services'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus } from 'lucide-react'
import StoryViewer from './story-viewer'
import StoryForm from './story-form'

export default function StoriesTab() {
  const { user, loading } = useAuth()
  const [stories, setStories] = useState<Story[]>([])
  const [loadingStories, setLoadingStories] = useState<boolean>(true)
  const [isDriver, setIsDriver] = useState<boolean>(false)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  useEffect(() => {
    if (loading) {
      return
    }
    if (user) {
      if (user.role === 'DRIVER') {
        setIsDriver(true)
        getSenderStories(user.id)
          .then((stories) => setStories(stories))
          .then(() => setLoadingStories(false))
      } else {
        setIsDriver(false)
        getDriverStories(user.id)
          .then((stories) => setStories(stories))
          .then(() => setLoadingStories(false))
      }
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
        {isDriver && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <Plus className="text-gray-600" size={24} />
          </button>
        )}
      </>
    )
  }

  return (
    <div>
      <p className="mb-2 text-muted-foreground">
        {isDriver
          ? "Let senders know what you're up to:"
          : "See what your driver's up to:"}
      </p>
      <div className="flex items-center gap-2 flex-wrap py-2">
        {renderStoriesContent()}
      </div>
      <StoryForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
    </div>
  )
}
