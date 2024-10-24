import Container from '@/components/container'
import { LocationInput } from '@/components/location-input'
import { PlusIcon } from '@radix-ui/react-icons'

export default function OrderPage() {
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
            <button className="bg-white shadow rounded-lg w-[250px] h-[200px] flex justify-center items-center">
              <div className="text-sm font-medium text-muted-foreground flex gap-1 items-center">
                <PlusIcon className="w-4 h-4" />
                Add a package
              </div>
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}
