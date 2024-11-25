import { useState } from 'react'
import { Story } from '@/types/types'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { formatDistance } from 'date-fns'

export default function StoryViewer({ story }: { story: Story }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleStoryClick = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div
        onClick={handleStoryClick}
        className="w-16 h-16 rounded-full bg-cover bg-center cursor-pointer transition-transform transform hover:scale-110 active:scale-100 hover:shadow-lg"
        style={{ backgroundImage: `url(${story.imageUrl})` }}
      />

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="p-0 max-w-md w-full bg-transparent overflow-hidden rounded">
          <DialogTitle className="hidden">Story</DialogTitle>
          <div className="relative">
            <img
              src={story.imageUrl}
              alt="Story"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md">
              <p className="text-xs">
                {formatDistance(story.date, new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>
            {story.caption && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white p-3 rounded-md max-w-[calc(100%-4rem)]">
                <p className="text-sm font-bold">{story.caption}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
