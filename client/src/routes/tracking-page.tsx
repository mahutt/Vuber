import { Link } from 'react-router-dom'
import Map from '../components/map'
import useLocalStorage from 'use-local-storage'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Divide } from 'lucide-react'
import {Input} from '../components/ui/input'
import { Button } from '@/components/ui/button'
import{Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from  '@/components/ui/table'

function Tracking() {
    const [trackingNumber, setTrackingNumber] = useState<string>("")
    const [isValidTracking, setIsValid] = useState<Boolean>(true)
    const [previousLocations, setPreviousLocations] = useState<String[]>([])
    const [currentLocation, setCurrentLocation] = useState<string>('')
    const [endLocation, setEndLocation] = useState<string>('')
    const [trackingDataFound, setTrackingDataFound] = useState<Boolean>(false)
const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
   
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
     
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
     
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",

    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
  
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
    
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",

    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
      
      },
      {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
       
      },
      {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
       
      },
      {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
     
      },
      {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
       
      },
  ]
    return (

        <div className='h-full relative flex flex-col'>
        <section className="h-full relative">
            <div className="max-w-screen-xl mx-auto p-16 h-full flex items-center justify-around gap-4">
                    <div className="w-[350px] flex flex-col gap-4 items-ends">
                        <div className='text-4xl font-extrabold tracking-tight mb-8'>
                            Enter your tracking number
                        </div>
                        <Input
                            placeholder='Tracking Number'
                            value={trackingNumber}
                            onChange ={(e) =>setTrackingNumber(e.target.value)}
                        >
                        </Input>
                        {!isValidTracking && <div className="text-m text-red-500">Not a Valid Tracking Number</div>}
                        <Button>
                            Track Order
                        </Button>
                </div>
                <div className="w-full h-full max-w-[500px] max-h-[500px]">
                            {import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ? (
                                <div className="w-full h-full">
                                <Map startLocation={currentLocation} endLocation={endLocation} />
                                </div>
                            ) : (
                                <img
                                src="map.png"
                                className="size-auto object-contain rounded-lg"
                                ></img>
                            )}
                </div>
              
              
                
            </div>
           

            </section>
          
            { trackingDataFound && <section className="overflow-auto max-h-full w-[1000px] mx-auto flex justify-around mb-4">
                <Table >
                    <TableCaption>Order Tracking History</TableCaption>
                    <TableHeader >
                        <TableRow >
                            <TableHead >Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Current Location</TableHead>
                           
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                             
                               
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        
                    </TableFooter>
                </Table>
            </section>}
        </div>
    )
}
export default Tracking