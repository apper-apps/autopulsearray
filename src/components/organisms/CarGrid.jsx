import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CarCard from '@/components/molecules/CarCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { getCars } from '@/services/api/carService'

const CarGrid = ({ filters = {}, searchQuery = '' }) => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const loadCars = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getCars()
      
      // Apply filters
      let filteredCars = data
      
      // Search filter
      if (searchQuery) {
        filteredCars = filteredCars.filter(car =>
          `${car.brand} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      // Brand filter
      if (filters.brands && filters.brands.length > 0) {
        filteredCars = filteredCars.filter(car => 
          filters.brands.includes(car.brand)
        )
      }
      
      // Price filter
      if (filters.minPrice) {
        filteredCars = filteredCars.filter(car => 
          car.price >= parseInt(filters.minPrice)
        )
      }
      if (filters.maxPrice) {
        filteredCars = filteredCars.filter(car => 
          car.price <= parseInt(filters.maxPrice)
        )
      }
      
      // Year filter
      if (filters.minYear) {
        filteredCars = filteredCars.filter(car => 
          car.year >= parseInt(filters.minYear)
        )
      }
      if (filters.maxYear) {
        filteredCars = filteredCars.filter(car => 
          car.year <= parseInt(filters.maxYear)
        )
      }
      
      // Horsepower filter
      if (filters.minHorsepower) {
        filteredCars = filteredCars.filter(car => 
          (car.specs?.horsepower || 0) >= parseInt(filters.minHorsepower)
        )
      }
      
      // Fuel type filter
      if (filters.fuelType) {
        filteredCars = filteredCars.filter(car => 
          car.specs?.fuelType === filters.fuelType
        )
      }
      
      setCars(filteredCars)
    } catch (err) {
      setError('Failed to load cars. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCars()
  }, [filters, searchQuery])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCars} />
  if (cars.length === 0) return <Empty />

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-white">
            {cars.length} Cars Found
          </h2>
          {searchQuery && (
            <span className="text-gray-400">
              for "{searchQuery}"
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
            size="sm"
            icon="Grid3X3"
            onClick={() => setViewMode('grid')}
          />
          <Button
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            size="sm"
            icon="List"
            onClick={() => setViewMode('list')}
          />
        </div>
      </div>

      {/* Car Grid/List */}
      <motion.div
        layout
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {cars.map((car, index) => (
          <CarCard
            key={car.Id}
            car={car}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default CarGrid