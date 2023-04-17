import Header from './header'
import Navbar from './navbar'

export default function Layout({
  title = 'Unidad de Operación Regional',
  description,
  children,
  session
}) {
  return (
    <>
      <Header title={title} description={description} />
      <Navbar />
      <main>{children}</main>
    </>
  )
}
