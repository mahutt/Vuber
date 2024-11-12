import React, { useState } from "react";

function ContactUs() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null); // null = unverified, true = valid, false = invalid
  const [phoneValid, setPhoneValid] = useState(false); // new state for phone number validation
  const [shake, setShake] = useState(false);

  // Function to handle phone number input and formatting
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Remove non-numeric characters
    value = value.replace(/\D/g, "");

    // Limit the phone number to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    // Format the phone number (e.g., 5149999999 -> 514-999-9999)
    if (value.length <= 3) {
      value = value.replace(/(\d{1,3})/, "$1");
    } else if (value.length <= 6) {
      value = value.replace(/(\d{1,3})(\d{1,3})/, "$1-$2");
    } else {
      value = value.replace(/(\d{1,3})(\d{1,3})(\d{1,4})/, "$1-$2-$3");
    }

    // Update the phone number state and check if it has 10 digits
    setPhone(value);
    setPhoneValid(value.replace(/\D/g, "").length === 10); // validate if there are 10 digits
  };

  // Function to handle email input and validation
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Basic email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the email is valid
    if (emailRegex.test(emailValue)) {
      setEmailValid(true);
    } else if (emailValue === "") {
      setEmailValid(null); // Reset to unverified when the field is empty
    } else {
      setEmailValid(false);
    }
  };

  // Function to trigger shake animation on invalid email
  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailValid === false) {
      setShake(true);
      setTimeout(() => setShake(false), 500); // Reset shake after animation duration
    }
    // Proceed with form submission logic here if needed
  };

  return (
    <div className="overflow-hidden font-medium max-w-full">
      <div className="flex flex-wrap justify-center mt-[60px] px-4 max-w-full">
        {/* Left box: Contact Information */}
        <div className="">
        <div className="w-full sm:w-[350px] h-[500px] bg-white rounded-[20px] flex flex-col items-center text-white overflow-hidden mb-4 sm:mb-0 border-2 bg-gradient-to-tl from-blue-400 to-blue-200 mt-10px">
         
          <h2 className="mt-[30px] text-5xl text-black" >Vüber</h2>
          <h2 className="text-2xl mt-[135px] text-black">Contact Information</h2>
          <p className="mt-4 justify-center  text-black">Email: <a href="mailto:contact@vuber.ca" className="underline">contact@vuber.ca</a></p>
          <p className="mt-2 justify-center  text-black">Phone: <a href="tel:+15149999999" className="underline">514-999-9999</a></p>
        </div>
        </div>
      
        {/* Right box: Form */}
        <div className="w-full sm:w-[450px] h-[500px] bg-white p-6">
          <h2 className="text-2xl text-center mb-4">We Value Your Feedback</h2>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ambrose McLaughlin"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailChange} // Trigger validation on blur
                className={`mt-1 block w-full p-2 border rounded-md ${
                  emailValid === null
                    ? "border-blue-300"
                    : emailValid === true
                    ? "border-green-500"
                    : "border-red-500"
                } ${shake ? "animate-shake" : ""}`}
                placeholder="example@domain.com"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-4">
              <label htmlFor="phone" className="block font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={`mt-1 block w-full p-2 border rounded-md ${
                  phoneValid ? "border-green-500" : "border-gray-300"
                }`}
                placeholder="514-999-9999"
                required
              />
            </div>

            {/* Message Field */}
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-1 block w-full p-2 border border=gradient-to-tl from-blue-400 to-blue-200 rounded-[20px] rounded-md"
              placeholder="Enter your message"
            ></textarea>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
