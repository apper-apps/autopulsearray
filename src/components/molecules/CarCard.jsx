import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const CarCard = ({ car, index = 0 }) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/car/${car.Id}`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-dark-900 rounded-xl overflow-hidden border border-dark-700 card-hover cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Year Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="primary">{car.year}</Badge>
        </div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="accent" className="font-bold">
            {formatPrice(car.price)}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-200">
              {car.brand} {car.model}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {car.specs?.category || 'Luxury Vehicle'}
            </p>
          </div>
        </div>
        
        {/* Specs */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 bg-dark-800 rounded-full">
              <ApperIcon name="Zap" size={16} className="text-primary-400" />
            </div>
            <p className="text-xs text-gray-400">Power</p>
            <p className="text-sm font-semibold text-white">
              {car.specs?.horsepower || '400'} HP
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 bg-dark-800 rounded-full">
              <ApperIcon name="Gauge" size={16} className="text-accent-400" />
            </div>
            <p className="text-xs text-gray-400">0-60</p>
            <p className="text-sm font-semibold text-white">
              {car.specs?.acceleration || '4.2'}s
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 bg-dark-800 rounded-full">
              <ApperIcon name="Fuel" size={16} className="text-green-400" />
            </div>
            <p className="text-xs text-gray-400">MPG</p>
            <p className="text-sm font-semibold text-white">
              {car.specs?.mpg || '25'} avg
            </p>
          </div>
        </div>
        
        {/* Action Button */}
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:text-white"
          icon="ArrowRight"
          iconPosition="right"
          onClick={(e) => {
            e.stopPropagation()
            handleViewDetails()
          }}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  )
}

export default CarCard