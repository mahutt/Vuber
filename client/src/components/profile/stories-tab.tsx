import { useAuth } from '@/providers/AuthProvider'
import { Story } from '@/types/types'
import { useEffect, useState } from 'react'
import { getDriverStories, getSenderStories } from '@/services/story-services'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2, Plus, RotateCcw } from 'lucide-react'
import StoryViewer from './story-viewer'
import StoryForm from './story-form'
import { Button } from '../ui/button'

export default function StoriesTab() {
  const { user, loading } = useAuth()
  const [stories, setStories] = useState<Story[]>([])
  const [loadingStories, setLoadingStories] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(true)
  const [isDriver, setIsDriver] = useState<boolean>(false)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  const fetchStories = async () => {
    if (!user) {
      return
    }
    if (user.role === 'DRIVER') {
      setIsDriver(true)
      getDriverStories(user.id)
        .then((stories) => setStories(stories))
        .then(() => setLoadingStories(false))
        .then(() => setRefreshing(false))
    } else {
      setIsDriver(false)
      getSenderStories(user.id)
        .then((stories) => setStories(stories))
        .then(() => setLoadingStories(false))
        .then(() => setRefreshing(false))
    }
  }

  useEffect(() => {
    if (loading) {
      return
    }
    fetchStories()
  }, [user, loading])

  const addStory = (story: Story) => {
    setStories((prev) => [
      ...prev.filter((prevStory) => prevStory.id !== story.id),
      story,
    ])
  }

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
      <p className="mb-2 text-muted-foreground flex items-center gap-2">
        {isDriver
          ? "Let senders know what you're up to:"
          : "See what your driver's up to:"}
        {!isDriver && (
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => {
              setRefreshing(true)
              fetchStories()
            }}
          >
            {refreshing ? (
              <Loader2 className="animate-spin" />
            ) : (
              <RotateCcw className="w-6 h-6" />
            )}
          </Button>
        )}
      </p>
      <div className="flex items-center gap-2 flex-wrap py-2">
        {renderStoriesContent()}
      </div>
      <StoryForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        addStory={addStory}
      />
    </div>
  )
}
