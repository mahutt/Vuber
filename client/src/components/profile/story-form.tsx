import { useState } from 'react'
import { createStory } from '@/services/story-services'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/dialog'
import { Camera, Loader2 } from 'lucide-react'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'

export default function StoryForm({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const [photo, setPhoto] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [takingPhoto, setTakingPhoto] = useState(false)

  const closeForm = () => {
    setIsOpen(false)
    setPhoto(null)
    setCaption('')
  }

  const handleTakePhoto = async () => {
    try {
      setTakingPhoto(true)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      const video = document.createElement('video')
      video.srcObject = stream
      video.play()

      const canvas = document.createElement('canvas')
      canvas.width = 640
      canvas.height = 480
      const context = canvas.getContext('2d')

      await new Promise((resolve) => setTimeout(resolve, 500))

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
      }

      setPhoto(canvas.toDataURL('image/png'))

      stream.getTracks().forEach((track) => track.stop())
      setTakingPhoto(false)
    } catch (error) {
      console.error('Error accessing the camera:', error)
      setTakingPhoto(false)
    }
  }

  const handleSubmit = async () => {
    if (!photo || !caption.trim()) return

    try {
      await createStory({ photo, caption })
      closeForm()
      alert('Story created successfully!')
    } catch (error) {
      console.error('Error creating story:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeForm}>
      <DialogContent className="max-w-md pt-12">
        <DialogTitle hidden>Create Story</DialogTitle>
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            {photo ? (
              <img
                src={photo}
                alt="Captured"
                className="w-full max-w-md rounded-md"
              />
            ) : (
              <Button
                onClick={handleTakePhoto}
                variant="ghost"
                className="w-full p-6 border-2 border-dashed rounded-lg"
                disabled={takingPhoto}
              >
                {takingPhoto ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Camera className="w-6 h-6" />
                )}
                <span>Take Photo</span>
              </Button>
            )}
          </div>

          <Input
            type="text"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full"
          />

          <div className="flex space-x-2">
            <Button onClick={closeForm} variant="secondary" className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!photo || !caption.trim()}
              className="flex-1"
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
