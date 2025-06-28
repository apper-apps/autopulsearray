import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import CarGrid from '@/components/organisms/CarGrid'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import ApperIcon from '@/components/ApperIcon'

const HomePage = () => {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  
  const [filters, setFilters] = useState({
    brands: [],
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    minHorsepower: '',
    fuelType: ''
  })
  
  const [showFilters, setShowFilters] = useState(false)

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      brands: [],
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      minHorsepower: '',
      fuelType: ''
    })
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">Discover</span> the Latest
              <br />
              <span className="text-white">Automotive Excellence</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Explore premium vehicles and connect with fellow enthusiasts in our community-driven platform
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: '500+', label: 'Premium Cars' },
              { number: '50K+', label: 'Active Members' },
              { number: '100+', label: 'Chat Rooms' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white hover:bg-dark-700 transition-colors"
            >
              <ApperIcon name="Filter" size={20} />
              <span>Filters</span>
              <ApperIcon 
                name={showFilters ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </button>
            
            {showFilters && (
              <div className="mt-4">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Car Grid */}
          <div className="flex-1">
            <CarGrid 
              filters={filters} 
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage