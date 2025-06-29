import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import SearchBar from '@/components/molecules/SearchBar'
import { getCars } from '@/services/api/carService'

const ComparePage = () => {
  const [compareList, setCompareList] = useState([])
  const [availableCars, setAvailableCars] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    // Load comparison list from localStorage
    const saved = JSON.parse(localStorage.getItem('compareList') || '[]')
    setCompareList(saved)
    
    // Load available cars for search
    loadAvailableCars()
  }, [])

  const loadAvailableCars = async () => {
    try {
      const cars = await getCars()
      setAvailableCars(cars)
      setSearchResults(cars.slice(0, 5)) // Show first 5 by default
    } catch (err) {
      toast.error('Failed to load cars')
    }
  }

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults(availableCars.slice(0, 5))
      return
    }
    
    const filtered = availableCars.filter(car =>
      `${car.brand} ${car.model}`.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filtered.slice(0, 10))
  }

  const addToCompare = (car) => {
    if (compareList.length >= 3) {
      toast.warning('You can compare up to 3 cars at once')
      return
    }
    
    if (compareList.find(c => c.Id === car.Id)) {
      toast.info('Car already in comparison')
      return
    }
    
    const newList = [...compareList, car]
    setCompareList(newList)
    localStorage.setItem('compareList', JSON.stringify(newList))
    toast.success(`${car.brand} ${car.model} added to comparison`)
  }

  const removeFromCompare = (carId) => {
    const newList = compareList.filter(car => car.Id !== carId)
    setCompareList(newList)
    localStorage.setItem('compareList', JSON.stringify(newList))
    toast.success('Car removed from comparison')
  }

  const clearComparison = () => {
    setCompareList([])
    localStorage.removeItem('compareList')
    toast.success('Comparison cleared')
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

const getSpecValue = (car, spec) => {
    switch(spec) {
      case 'horsepower': return `${car.horsepower || '400'} HP`
      case 'acceleration': return `${car.acceleration || '4.2'}s`
      case 'mpg': return `${car.mpg || '25'} mpg`
      case 'seating': return `${car.seating || '4'} seats`
      case 'engineType': return car.engine_type || 'V8 Turbocharged'
      case 'transmission': return car.transmission || '8-Speed Auto'
      case 'fuelType': return car.fuel_type || 'Gasoline'
      default: return 'N/A'
    }
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
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <ApperIcon name="BarChart3" size={32} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">Compare</span> Cars
              <br />
              <span className="text-white">Side by Side</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Compare specifications, features, and pricing of your favorite vehicles to make informed decisions
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Add Cars Section */}
        {compareList.length < 3 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 bg-dark-900 rounded-xl border border-dark-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Add Cars to Compare</h2>
              <Button
                variant="secondary"
                size="sm"
                icon={showSearch ? "X" : "Plus"}
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? 'Close' : 'Add Car'}
              </Button>
            </div>

            {showSearch && (
              <div className="space-y-4">
                <SearchBar
                  placeholder="Search for cars to compare..."
                  onSearch={handleSearch}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {searchResults.map((car) => (
                    <div
                      key={car.Id}
                      className="flex items-center justify-between p-4 bg-dark-800 rounded-lg border border-dark-600 hover:border-primary-500/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
<img
                          src={car.image_url}
                          alt={`${car.brand} ${car.model}`}
                          className="w-12 h-8 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold text-white text-sm">
                            {car.brand} {car.model}
                          </p>
                          <p className="text-xs text-gray-400">{car.year}</p>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => addToCompare(car)}
                        disabled={compareList.find(c => c.Id === car.Id)}
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Comparison Table */}
        {compareList.length > 0 ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden"
          >
            <div className="p-6 border-b border-dark-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Car Comparison</h2>
              <Button
                variant="accent"
                size="sm"
                icon="Trash2"
                onClick={clearComparison}
              >
                Clear All
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left p-6 text-gray-400 font-medium w-48">Specification</th>
                    {compareList.map((car) => (
                      <th key={car.Id} className="text-center p-6 min-w-64">
<img
                            src={car.image_url}
                            alt={`${car.brand} ${car.model}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div>
                          <div>
                            <h3 className="font-bold text-white text-lg">
                              {car.brand} {car.model}
                            </h3>
                            <div className="flex items-center justify-center space-x-2 mt-2">
                              <Badge variant="primary">{car.year}</Badge>
                              <Badge variant="accent" className="font-bold">
                                {formatPrice(car.price)}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            icon="X"
                            onClick={() => removeFromCompare(car.Id)}
                            className="text-accent-400 hover:text-accent-300"
                          >
                            Remove
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                
                <tbody>
                  {[
                    { label: 'Starting Price', key: 'price', format: (val, car) => formatPrice(car.price) },
                    { label: 'Engine Power', key: 'horsepower' },
                    { label: '0-60 mph', key: 'acceleration' },
                    { label: 'Fuel Economy', key: 'mpg' },
                    { label: 'Seating Capacity', key: 'seating' },
                    { label: 'Engine Type', key: 'engineType' },
                    { label: 'Transmission', key: 'transmission' },
                    { label: 'Fuel Type', key: 'fuelType' }
                  ].map((spec) => (
                    <tr key={spec.key} className="border-b border-dark-800 hover:bg-dark-800/50">
                      <td className="p-6 font-medium text-gray-300">
                        {spec.label}
                      </td>
                      {compareList.map((car) => (
                        <td key={car.Id} className="p-6 text-center text-white">
                          {spec.format ? spec.format(spec.key, car) : getSpecValue(car, spec.key)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <ApperIcon name="BarChart3" size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Start Comparing Cars
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Add cars to your comparison list to see detailed side-by-side specifications and features
            </p>
            <Button
              variant="primary"
              icon="Plus"
              onClick={() => setShowSearch(true)}
            >
              Add Your First Car
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ComparePage