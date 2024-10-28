import { useState } from 'react'
import Container from '@/components/container'
import { LocationInput } from '@/components/location-input'
import ParcelForm, { Parcel } from '@/components/parcel-form'
import { Weight, Box } from 'lucide-react'

const packageCardStyling = 'bg-white shadow rounded-lg w-[250px] h-[200px]'

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
            {parcels.map((parcel, index) => (
              <ParcelCard key={index} parcel={parcel} />
            ))}
            <ParcelForm
              className={packageCardStyling}
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

function getVolume(parcel: Parcel) {
  return parcel.size.width * parcel.size.height * parcel.size.length
}

function ParcelCard({ parcel }: { parcel: Parcel }) {
  return (
    <div className={`${packageCardStyling} p-5 flex flex-col`}>
      <div className="text-lg font-semibold">{parcel.name}</div>
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
