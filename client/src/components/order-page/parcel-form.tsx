import { useState, forwardRef, useImperativeHandle } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import DropdownRadio from '@/components/dropdown-radio'

import { Parcel } from '@/types/types'

export interface ParcelFormActions {
  open: () => void
  close: () => void
  getParcel: () => Parcel
  setParcel: (parcel: Parcel) => void
  setEditIndex: (index: number | null) => void
}

const ParcelForm = forwardRef<
  ParcelFormActions,
  {
    addParcel: (parcel: Parcel) => void
    onEdit: (parcel: Parcel, index: number) => void
  }
>(({ addParcel, onEdit }, ref) => {
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [parcel, setParcel] = useState<Parcel>({
    name: 'Parcel 1',
    description: '',
    weight: 1,
    weightUnit: 'lb',
    size: { width: 1, height: 1, length: 1 },
    sizeUnit: 'in',
  })
  const [isOpen, setIsOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true)
    },
    close: () => {
      setIsOpen(false)
    },
    getParcel: () => {
      return parcel
    },
    setParcel: (p: Parcel) => {
      setParcel(p)
    },
    setEditIndex: (index: number | null) => {
      setEditIndex(index)
    },
  }))

  const handleSubmit = () => {
    if (editIndex !== null) {
      onEdit(parcel, editIndex)
    } else {
      addParcel(parcel)
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <input
              type="text"
              className="rounded"
              value={parcel.name}
              onChange={(e) => setParcel({ ...parcel, name: e.target.value })}
            />
            <DialogDescription>
              {editIndex !== null
                ? 'Edit parcel'
                : 'Add a parcel to your order'}
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div>
            <Label>Weight</Label>
            <div className="flex gap-3">
              <Input
                type="number"
                value={parcel.weight}
                onChange={(e) =>
                  setParcel({ ...parcel, weight: Number(e.target.value) })
                }
              />
              <DropdownRadio
                options={[
                  { value: 'lb', label: 'Pounds (lb)' },
                  { value: 'kg', label: 'Kilograms (kg)' },
                ]}
                value={parcel.weightUnit}
                onChange={(v) =>
                  setParcel({ ...parcel, weightUnit: v as 'lb' | 'kg' })
                }
              />
            </div>
          </div>
          <div>
            <Label>Size</Label>
            <div className="flex gap-3">
              <Input
                type="number"
                value={parcel.size.width}
                onChange={(e) =>
                  setParcel({
                    ...parcel,
                    size: { ...parcel.size, width: Number(e.target.value) },
                  })
                }
              />
              <Input
                type="number"
                value={parcel.size.height}
                onChange={(e) =>
                  setParcel({
                    ...parcel,
                    size: { ...parcel.size, height: Number(e.target.value) },
                  })
                }
              />
              <Input
                type="number"
                value={parcel.size.length}
                onChange={(e) =>
                  setParcel({
                    ...parcel,
                    size: { ...parcel.size, length: Number(e.target.value) },
                  })
                }
              />
              <DropdownRadio
                options={[
                  { value: 'in', label: 'Inches (in)' },
                  { value: 'cm', label: 'Centimeters (cm)' },
                ]}
                value={parcel.sizeUnit}
                onChange={(v) =>
                  setParcel({ ...parcel, sizeUnit: v as 'in' | 'cm' })
                }
              />
            </div>
          </div>
          <div>
            <Label>Description (optional)</Label>
            <Textarea
              value={parcel.description}
              onChange={(e) =>
                setParcel({ ...parcel, description: e.target.value })
              }
            />
          </div>
          <div className="ml-auto">
            <Button onClick={handleSubmit}>
              {editIndex !== null ? 'Update parcel' : 'Add parcel'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default ParcelForm
