import { useState } from 'react'
import sendEmail from '@/services/send-emails'
import { EmailDetails } from '@/types/types'
import { useNavigate } from 'react-router-dom'

function ContactUs() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [emailValid, setEmailValid] = useState<boolean | null>(false)
  const [phoneValid, setPhoneValid] = useState(false)
  const [shake, setShake] = useState(false)

  const navigate = useNavigate()

  // Function to handle phone number input and formatting
  const handlePhoneChange = (e: { target: { value: any } }) => {
    let value = e.target.value
    value = value.replace(/\D/g, '')

    if (value.length > 10) {
      value = value.slice(0, 10)
    }

    if (value.length <= 3) {
      value = value.replace(/(\d{1,3})/, '$1')
    } else if (value.length <= 6) {
      value = value.replace(/(\d{1,3})(\d{1,3})/, '$1-$2')
    } else {
      value = value.replace(/(\d{1,3})(\d{1,3})(\d{1,4})/, '$1-$2-$3')
    }

    setPhone(value)
    setPhoneValid(value.replace(/\D/g, '').length === 10)
  }

  // Function to handle email input and validation
  const handleEmailChange = (e: { target: { value: any } }) => {
    const emailValue = e.target.value
    setEmail(emailValue)

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (emailRegex.test(emailValue)) {
      setEmailValid(true)
    } else if (emailValue === '') {
      setEmailValid(null)
    } else {
      setEmailValid(false)
    }
  }

  // Function to handle form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (emailValid === false) {
      setShake(true)
    } else {
      const emailDetails: EmailDetails = {
        Name: name,
        PhoneNum: phone,
        Email: email,
        Message: message,
      }

      sendEmail(emailDetails)
        .then(() => {
          navigate('/email-confirmation-page') // Redirect to confirmation page after email is sent
        })
        .catch((error) => {
          console.error('Failed to send email:', error)
        })
    }
  }

  return (
    <div className="overflow-hidden font-medium max-w-full">
      <div className="flex flex-wrap justify-center mt-[60px] px-4 max-w-full">
        {/* Left box: Contact Information */}
        <div className="w-full sm:w-[350px] h-[500px] bg-white rounded-[20px] flex flex-col items-center text-white overflow-hidden mb-4 sm:mb-0 border-2 bg-gradient-to-tl from-blue-400 to-blue-200 mt-10px">
          <h2 className="mt-[30px] text-5xl text-black">Vüber</h2>
          <h2 className="text-2xl mt-[135px] text-black">
            Contact Information
          </h2>
          <p className="mt-4 text-black">
            Email:{' '}
            <a href="mailto:contact@vuber.ca" className="underline">
              xvinivuberx@gmail.com
            </a>
          </p>
          <p className="mt-2 text-black">
            Phone:{' '}
            <a href="tel:+15149999999" className="underline">
              514-999-9999
            </a>
          </p>
        </div>

        {/* Right box: Form */}
        <div className="w-full sm:w-[450px] h-[500px] bg-white p-6">
          <h2 className="text-2xl text-center mb-4">We Value Your Feedback</h2>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ambrose McLaughlin"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className={`mt-1 block w-full p-2 border rounded-md ${
                  emailValid === null
                    ? 'border-blue-300'
                    : emailValid === true
                    ? 'border-green-500'
                    : 'border-red-500'
                } ${shake ? 'animate-shake' : ''}`}
                placeholder="vinixvuber@gmail.com"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={`mt-1 block w-full p-2 border rounded-md ${
                  phoneValid ? 'border-green-500' : 'border-gray-300'
                }`}
                placeholder="514-999-9999"
                required
              />
            </div>

            {/* Message Field */}
            <div className="mb-0">
              <label htmlFor="message" className="font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Enter your message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
