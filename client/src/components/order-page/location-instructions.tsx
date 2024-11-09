import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Pencil } from 'lucide-react'
import useLocalStorage from 'use-local-storage'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useRef, useState } from 'react'

const LocationInstructions = ({
  visible,
  locationType,
}: {
  visible: boolean
  locationType: 'pickup' | 'dropoff'
}) => {
  const [instructions, setInstructions] = useLocalStorage<string>(
    `${locationType}-instructions`,
    ''
  )
  const [isOpen, setIsOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleOpenAutoFocus = (event: Event) => {
    event.preventDefault()
    if (textareaRef.current) {
      const textarea = textareaRef.current
      textarea.focus()
      textarea.setSelectionRange(textarea.value.length, textarea.value.length)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            className={`float-end transition-height duration-500 ease-in-out overflow-hidden ${
              visible ? 'h-6' : 'h-0'
            } flex items-end`}
          >
            <button className="flex items-center text-sm font-medium text-blue-500 hover:text-blue-400 focus:text-blue-400 focus:underline transition-colors outline-none">
              {`${instructions ? 'Edit' : 'Add'}`} Instructions
              <Pencil className="w-4 h-4 ml-1" />
            </button>
          </div>
        </DialogTrigger>
        <DialogContent
          onOpenAutoFocus={handleOpenAutoFocus}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>{`Add ${
              locationType === 'pickup' ? 'Pickup' : 'Dropoff'
            } Instructions`}</DialogTitle>
            <DialogDescription>
              Add any special instructions for the {locationType} location
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Textarea
              ref={textareaRef}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type="submit">Done</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LocationInstructions
