import { Parcel } from '@/types/types'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Weight, Box, Trash2 } from 'lucide-react'

function getVolume(parcel: Parcel) {
  return parcel.size.width * parcel.size.height * parcel.size.length
}
export default function ParcelCard({
  className = '',
  parcel,
  handleDelete,
  handleEdit,
}: {
  className?: string
  parcel: Parcel
  handleDelete: () => void
  handleEdit: () => void
}) {
  return (
    <div className={`${className} p-5 flex flex-col items-start`}>
      <div className="flex justify-between items-center w-full">
        <div className="text-lg font-semibold">{parcel.name}</div>
        <div className="flex gap-2">
          <div
            onClick={handleEdit}
            className="cursor-pointer text-muted-foreground"
          >
            <Pencil1Icon className="w-4 h-4" />
          </div>
          <div
            onClick={handleDelete}
            className="cursor-pointer text-muted-foreground"
          >
            <Trash2 className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">{parcel.description}</div>
      <div className="flex-1"></div>
      <div className="text-sm text-muted-foreground">
        <Weight className="w-5 h-5 inline pr-1" />
        {parcel.weight} {parcel.weightUnit}
      </div>
      <div className="text-sm text-muted-foreground">
        <Box className="w-5 h-5 inline pr-1" />
        {getVolume(parcel)} {parcel.sizeUnit}
        <sup>3</sup>
      </div>
    </div>
  )
}
