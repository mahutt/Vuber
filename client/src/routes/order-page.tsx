import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import Container from '@/components/container'
import { LocationInput } from '@/components/location-input'
import ParcelForm, {
  ParcelFormActions,
} from '@/components/order-page/parcel-form'
import { Parcel } from '@/types/types'
import ParcelCard from '@/components/order-page/parcel-card'
import FadeInWrapper from '@/components/fade-in-wrapper'
import Map from '@/components/map'
import {
  PlusIcon,
  CubeIcon,
  ArrowRightIcon,
  GlobeIcon,
} from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import QuoteDisplay from '@/components/order-page/quote-display'
import LocationInstructions from '@/components/order-page/location-instructions'

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
      id: Math.floor(Math.random() * 1000000),
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
  const [startLocation, setStartLocation] = useLocalStorage<string>(
    'start-location',
    ''
  )
  const [endLocation, setEndLocation] = useLocalStorage<string>(
    'end-location',
    ''
  )
  useEffect(() => {
    if (startLocation !== '' && endLocation !== '') {
      setAddParcelPhase(true)
    } else {
      setTimeout(() => {
        pickUpLocation.current?.focus()
      }, 250)
    }
  }, [startLocation, endLocation])
  const [addParcelPhase, setAddParcelPhase] = useState<boolean>(false)
  useEffect(() => {
    if (addParcelPhase) {
      setAddParcelPhase(false)
    }
  }, [startLocation, endLocation])
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
            <div>
              <FadeInLabel text="Pickup Location" visible={addParcelPhase} />
              <LocationInput
                placeholder="From"
                ref={pickUpLocation}
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
              />
              <LocationInstructions
                visible={!!startLocation}
                locationType="pickup"
              />
            </div>
            <div>
              <FadeInLabel text="Dropoff Location" visible={addParcelPhase} />
              <LocationInput
                placeholder="To"
                filled={true}
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
              />
              <LocationInstructions
                visible={!!endLocation}
                locationType="dropoff"
              />
            </div>

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
                  <QuoteDisplay className="h-full text-3xl font-bold tracking-tight" />
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
            {import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ? (
              <Map startLocation={startLocation} endLocation={endLocation} />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <GlobeIcon className="w-64 h-64 text-gray-500" />
              </div>
            )}
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
                      className={packageCardStyling}
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

const FadeInLabel = ({ text, visible }: { text: string; visible: boolean }) => {
  return (
    <div
      className={`ml-3 text-sm font-medium text-muted-foreground ${
        visible ? 'h-6' : 'h-0'
      } transition-height duration-500 ease-in-out overflow-hidden`}
    >
      {text}
    </div>
  )
}
