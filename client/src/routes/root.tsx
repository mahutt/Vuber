import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <header>Global layout header</header>
      <Outlet />
      <footer>Global layout footer</footer>
    </>
  )
}
