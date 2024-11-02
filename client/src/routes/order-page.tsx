import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import Container from '@/components/container'
import { LocationInput } from '@/components/location-input'
import ParcelForm, { Parcel, ParcelFormActions } from '@/components/parcel-form'
import FadeInWrapper from '@/components/fade-in-wrapper'
import Map from '@/components/map'
import {
  PlusIcon,
  Pencil1Icon,
  CubeIcon,
  ArrowRightIcon,
} from '@radix-ui/react-icons'
import { Weight, Box, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const packageCardStyling = 'bg-white shadow rounded-lg w-[250px] h-[200px]'

export default function OrderPage() {
  const parcelForm = useRef<ParcelFormActions>(null)
  const [parcels, setParcels] = useLocalStorage<Parcel[]>('order-draft', [])

  const deleteParcel = (index: number) => {
    setParcels([...parcels.slice(0, index), ...parcels.slice(index + 1)])
  }

  const editParcel = (index: number) => {
    parcelForm.current?.setEditIndex(index)
    parcelForm.current?.setParcel(parcels[index])
    parcelForm.current?.open()
  }

  const addParcel = () => {
    parcelForm.current?.setEditIndex(null)
    parcelForm.current?.setParcel({
      name: `Parcel ${parcels.length + 1}`,
      description: '',
      weight: 1,
      weightUnit: 'lb',
      size: { width: 1, height: 1, length: 1 },
      sizeUnit: 'in',
    })
    parcelForm.current?.open()
  }

  const handleEditSubmit = (updatedParcel: Parcel, index: number) => {
    const newParcels = [...parcels]
    newParcels[index] = updatedParcel
    setParcels(newParcels)
  }

  const handleAddSubmit = (parcel: Parcel) => {
    setParcels([...parcels, parcel])
  }

  const pickUpLocation = useRef<HTMLInputElement>(null)
  useEffect(() => {
    setTimeout(() => {
      pickUpLocation.current?.focus()
    }, 250)
  }, [])

  const [startLocation, setStartLocation] = useState<string>('')
  const [endLocation, setEndLocation] = useState<string>('')
  const [addParcelPhase, setAddParcelPhase] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <Container>
      <div className="h-full flex flex-row items-center gap-10 py-10">
        <FadeInWrapper className="h-full">
          <div className="h-full flex flex-col gap-4 max-w-[300px] justify-center">
            <div
              className={`text-3xl font-bold tracking-tight mb-2 transition-height duration-500 ease-in-out overflow-hidden
                 ${addParcelPhase ? 'h-0' : 'h-[108px]'}`}
            >
              Where should we deliver your package?
            </div>
            <LocationInput
              placeholder="From"
              ref={pickUpLocation}
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
            <LocationInput
              placeholder="To"
              filled={true}
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />

            <div
              className={`transition-height duration-500 ease-in-out
                 ${addParcelPhase ? 'h-full' : 'h-0'}`}
            />

            <FadeInWrapper control={!!startLocation && !!endLocation}>
              {addParcelPhase && (
                <FadeInWrapper delay={75} className="flex justify-between mb-2">
                  <div className="text-3xl font-bold tracking-tight">
                    Total:
                  </div>
                  <div className="text-3xl font-bold tracking-tight">$0.00</div>
                </FadeInWrapper>
              )}
              <Button
                onClick={() => {
                  if (!addParcelPhase) {
                    setAddParcelPhase(true)
                  } else {
                    navigate('/payment')
                  }
                }}
                className="w-full rounded-lg"
              >
                {addParcelPhase ? (
                  <>
                    Proceed to Payment
                    <ArrowRightIcon className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <CubeIcon className="w-4 h-4" />
                    Add Parcel Info
                  </>
                )}
              </Button>
            </FadeInWrapper>
          </div>
        </FadeInWrapper>
        <div className="w-full h-full relative">
          <FadeInWrapper className="w-full h-full" delay={75}>
            <Map startLocation={startLocation} endLocation={endLocation} />
          </FadeInWrapper>
          {addParcelPhase && (
            <FadeInWrapper className="w-full h-full absolute top-0 left-0">
              <div className="w-full h-full border shadow rounded-2xl bg-slate-100">
                <div className="flex flex-row flex-wrap p-5 gap-5">
                  {parcels.map((parcel, index) => (
                    <ParcelCard
                      key={index}
                      parcel={parcel}
                      handleDelete={() => deleteParcel(index)}
                      handleEdit={() => editParcel(index)}
                    />
                  ))}
                  <button
                    onClick={addParcel}
                    className={`${packageCardStyling} flex justify-center items-center`}
                  >
                    <div className="text-sm font-medium text-muted-foreground flex gap-1 items-center">
                      <PlusIcon className="w-4 h-4" />
                      Add a parcel
                    </div>
                  </button>
                </div>
              </div>
            </FadeInWrapper>
          )}
        </div>
      </div>
      <ParcelForm
        ref={parcelForm}
        addParcel={handleAddSubmit}
        onEdit={handleEditSubmit}
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
  handleEdit,
}: {
  parcel: Parcel
  handleDelete: () => void
  handleEdit: () => void
}) {
  return (
    <div className={`${packageCardStyling} p-5 flex flex-col items-start`}>
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
