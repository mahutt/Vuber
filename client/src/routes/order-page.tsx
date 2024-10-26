import { useState } from 'react'
import Container from '@/components/container'
import { LocationInput } from '@/components/location-input'
import ParcelForm, { Parcel } from '@/components/parcel-form'

export default function OrderPage() {
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [parcels, setParcels] = useState<Parcel[]>([])
  return (
    <Container>
      <div className="h-full flex flex-row items-center gap-10 py-10">
        <div className="flex flex-col gap-4 max-w-[300px]">
          <div className="text-5xl font-extrabold tracking-tight mb-2">
            Place an order...
          </div>
          <LocationInput placeholder="From" />
          <LocationInput placeholder="To" filled={true} />
        </div>
        <div className="w-full h-full border shadow rounded-lg bg-slate-100">
          <div className="flex flex-row flex-wrap p-5 gap-5">
            <ParcelForm
              open={formIsOpen}
              setOpen={setFormIsOpen}
              addParcel={(parcel: Parcel) => {
                setParcels([...parcels, parcel])
                setFormIsOpen(false)
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
