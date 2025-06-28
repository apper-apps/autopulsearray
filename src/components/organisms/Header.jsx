import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const navigation = [
    { name: 'Latest Cars', href: '/', icon: 'Car' },
    { name: 'Chat Rooms', href: '/chat', icon: 'MessageCircle' },
    { name: 'Compare', href: '/compare', icon: 'BarChart3' },
    { name: 'News', href: '/news', icon: 'Newspaper' }
  ]

  const handleSearch = (query) => {
    navigate(`/?search=${encodeURIComponent(query)}`)
  }

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Car" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold gradient-text">
                AutoPulse
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Premium Cars</p>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActivePath(item.href)
                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-dark-800'
                  }
                `}
              >
                <ApperIcon name={item.icon} size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              icon={isMobileMenuOpen ? "X" : "Menu"}
            />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActivePath(item.href)
                      ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-dark-800'
                    }
                  `}
                >
                  <ApperIcon name={item.icon} size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header