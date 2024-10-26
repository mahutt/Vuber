import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DropdownRadio from '@/components/dropdown-radio'

export interface Parcel {
  name: string
  description: string
  weight: number
  weightUnit: 'lb' | 'kg'
  size: {
    width: number
    height: number
    length: number
  }
  sizeUnit: 'in' | 'cm'
}

export default function ParcelForm({
  open,
  setOpen,
  addParcel,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  addParcel: (parcel: Parcel) => void
}) {
  const [parcel, setParcel] = useState<Parcel>({
    name: 'Parcel 1',
    description: '',
    weight: 1,
    weightUnit: 'lb',
    size: { width: 1, height: 1, length: 1 },
    sizeUnit: 'in',
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-white shadow rounded-lg w-[250px] h-[200px] flex justify-center items-center">
        <div className="text-sm font-medium text-muted-foreground flex gap-1 items-center">
          <PlusIcon className="w-4 h-4" />
          Add a parcel
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <input
              type="text"
              defaultValue={'Package 1'}
              className="mb-2 rounded"
            />
          </DialogTitle>
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
            <div className="ml-auto">
              <Button
                onClick={() => {
                  addParcel(parcel)
                }}
              >
                Add parcel
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
