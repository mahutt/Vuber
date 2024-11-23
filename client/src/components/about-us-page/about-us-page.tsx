import { useNavigate } from 'react-router-dom'

function AboutUs() {
  const navigate = useNavigate()

  const handleSignUpClick = () => {
    navigate('/signup') // Navigate to the signin page
  }

  return (
    <div className="flex flex-col items-center px-4 py-8 bg-gray-100">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-semibold text-gray-800">About Us</h1>
        <p className="text-lg text-gray-600 mt-4">
          Get to know more about our mission, vision, and story.
        </p>
      </header>

      {/* Company Information */}
      <section className="max-w-3xl w-full mb-12">
        <h2 className="text-2xl font-semibold text-gray-800">Our Story</h2>
        <p className="mt-4 text-lg text-gray-700">
          Vüber started with a mission to revolutionize urban delivery services
          and provide accessible, efficient delivery options. Our journey has
          been defined by innovation, a commitment to sustainability, and a
          desire to ship peoples packages all over the world!
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="max-w-3xl w-full mb-12">
        <h2 className="text-2xl font-semibold text-gray-800">
          Our Mission and Vision
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          We believe in a world where transportation is seamless, sustainable,
          and reliable. Our mission is to deliver this vision through our
          services and technology, aiming to reduce delivery time, carbon
          emissions, and make our service accessible to all.
        </p>
        <p className="mt-4 text-lg text-gray-700">
          Our team works tirelessly to develop new solutions, and we are proud
          to have built a strong, community-focused company. Join us on our
          journey as we continue to make positive impacts in the world of
          mobility.
        </p>
      </section>

      {/* Get Involved Section */}
      <section className="max-w-3xl w-full bg-blue-50 p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold text-gray-800">Join Us</h2>
        <p className="mt-4 text-lg text-gray-700">
          We are always looking for passionate individuals to join our team.
          Whether you're a passionate delivery driver, SOEN_343 DEV or a guest
          host on the new up and comming Talk-Tuah podcast there's a place for
          you at Vüber. Help us shape the future of urban transportation.
        </p>
        <div className="mt-6 text-center">
          <button
            onClick={handleSignUpClick}
            className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center text-gray-500 mt-16">
        <p>© 2024 Vüber. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default AboutUs
