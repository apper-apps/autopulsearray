import Header from '@/components/organisms/Header'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main className="relative">
        {children}
      </main>
    </div>
  )
}

export default Layout