import {
  Package,
  Clock,
  DollarSign,
  Shield,
  MapPin,
  Truck,
  Phone,
  AlertCircle,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function FaqPage() {
  const faqs = [
    {
      question: 'How does Vuber delivery service work?',
      answer:
        'Vuber connects you with local delivery partners who can pick up and deliver items on-demand. Simply enter your pickup and drop-off locations, item details, and choose your delivery speed. Our drivers will handle the rest, providing real-time tracking throughout the delivery process.',
      icon: <Package className="h-5 w-5" />,
    },
    {
      question: 'What are your delivery times and service areas?',
      answer:
        'We operate 24/7 in major metropolitan areas. Delivery times typically range from 1-3 hours for standard delivery, or as quick as 30 minutes with our Rush service. Enter your location in the app to see precise delivery estimates for your area.',
      icon: <Clock className="h-5 w-5" />,
    },
    {
      question: 'How much does Vuber delivery cost?',
      answer:
        "Pricing is based on distance, size of the item, and delivery speed selected. Standard delivery starts at $9.99, with additional charges for premium services like Rush delivery or special handling. You'll see the exact price before confirming your delivery.",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      question: 'Is my delivery insured?',
      answer:
        'Yes! All Vuber deliveries are automatically insured up to $500. Additional coverage is available for high-value items. Our comprehensive insurance policy covers damage, loss, and theft during transit.',
      icon: <Shield className="h-5 w-5" />,
    },
    {
      question: 'What items can I send through Vuber?',
      answer:
        'Vuber can deliver most items under 50 pounds that can fit in a standard vehicle. This includes packages, documents, groceries, and retail items. We cannot deliver prohibited items like dangerous goods, illegal items, or unpackaged food.',
      icon: <Truck className="h-5 w-5" />,
    },
    {
      question: 'How do I track my delivery?',
      answer:
        "Track your delivery in real-time through the Vuber app or website. You'll receive live updates, including driver location, estimated arrival time, and delivery confirmation. Share tracking links with recipients to keep everyone informed.",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      question: 'What if I need to contact my delivery driver?',
      answer:
        'Once a driver accepts your delivery, you can message or call them directly through the Vuber app. Our in-app chat and call features maintain privacy while ensuring clear communication between you and your driver.',
      icon: <Phone className="h-5 w-5" />,
    },
    {
      question: 'What if something goes wrong with my delivery?',
      answer:
        "Our 24/7 support team is here to help! Contact us immediately through the app or website if you experience any issues. We'll work to resolve problems quickly and can provide refunds or redelivery if needed.",
      icon: <AlertCircle className="h-5 w-5" />,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Get answers to common questions about Vuber's delivery service
          </p>
        </div>

        <Alert className="bg-blue-500/10 border-blue-500/20">
          <AlertDescription>
            Need immediate assistance? Our support team is available 24/7
            through the Vuber app or at support@vuber.com
          </AlertDescription>
        </Alert>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="hover:text-blue-500">
                <div className="flex items-center gap-3">
                  <span className="text-blue-500">{faq.icon}</span>
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
