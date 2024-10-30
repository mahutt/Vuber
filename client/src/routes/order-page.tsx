import { useRef } from 'react'
import useLocalStorage from 'use-local-storage'
import Container from '@/components/container'
import { LocationInput } from '@/components/location-input'
import ParcelForm, { Parcel, ParcelFormActions } from '@/components/parcel-form'
import { PlusIcon } from '@radix-ui/react-icons'
import { Weight, Box, Trash2 } from 'lucide-react'

const packageCardStyling = 'bg-white shadow rounded-lg w-[250px] h-[200px]'

export default function OrderPage() {
  const parcelForm = useRef<ParcelFormActions>(null)
  const [parcels, setParcels] = useLocalStorage<Parcel[]>('order-draft', [])
  const deleteParcel = (index: number) => {
    setParcels([...parcels.slice(0, index), ...parcels.slice(index + 1)])
  }
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
              <ParcelCard
                key={index}
                parcel={parcel}
                handleDelete={() => deleteParcel(index)}
              />
            ))}
            <button
              onClick={() => {
                parcelForm.current?.setParcel({
                  name: `Parcel ${parcels.length + 1}`,
                  description: '',
                  weight: 1,
                  weightUnit: 'lb',
                  size: { width: 1, height: 1, length: 1 },
                  sizeUnit: 'in',
                })
                parcelForm.current?.open()
              }}
              className={`${packageCardStyling} flex justify-center items-center`}
            >
              <div className="text-sm font-medium text-muted-foreground flex gap-1 items-center">
                <PlusIcon className="w-4 h-4" />
                Add a parcel
              </div>
            </button>
          </div>
        </div>
      </div>
      <ParcelForm
        ref={parcelForm}
        addParcel={(parcel: Parcel) => {
          setParcels([...parcels, parcel])
          parcelForm.current?.close()
        }}
      />
    </Container>
  )
}

function getVolume(parcel: Parcel) {
  return parcel.size.width * parcel.size.height * parcel.size.length
}

function ParcelCard({
  parcel,
  handleDelete,
}: {
  parcel: Parcel
  handleDelete: () => void
}) {
  return (
    <button className={`${packageCardStyling} p-5 flex flex-col items-start`}>
      <div className="flex justify-between items-center w-full">
        <div className="text-lg font-semibold">{parcel.name}</div>
        <div
          onClick={handleDelete}
          className="cursor-pointer text-muted-foreground"
        >
          <Trash2 className="w-4 h-4" />
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
    </button>
  )
}
