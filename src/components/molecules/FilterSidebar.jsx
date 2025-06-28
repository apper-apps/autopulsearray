import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    price: true,
    year: true,
    specs: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const brands = [
    'Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Ferrari', 
    'Lamborghini', 'McLaren', 'Bentley', 'Rolls-Royce', 'Aston Martin'
  ]

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const FilterSection = ({ title, section, children }) => (
    <div className="border-b border-dark-700 pb-4 mb-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full text-left mb-3 hover:text-primary-400 transition-colors duration-200"
      >
        <h3 className="font-semibold text-white">{title}</h3>
        <ApperIcon 
          name={expandedSections[section] ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-gray-400" 
        />
      </button>
      
      <AnimatePresence>
        {expandedSections[section] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full lg:w-80 bg-dark-900 border border-dark-700 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-accent-400 hover:text-accent-300"
        >
          Clear All
        </Button>
      </div>

      {/* Brand Filter */}
      <FilterSection title="Brand" section="brand">
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand) || false}
                onChange={(e) => {
                  const currentBrands = filters.brands || []
                  const newBrands = e.target.checked
                    ? [...currentBrands, brand]
                    : currentBrands.filter(b => b !== brand)
                  handleFilterChange('brands', newBrands)
                }}
                className="w-4 h-4 text-primary-500 bg-dark-800 border-dark-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-300 hover:text-white transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range" section="price">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Min Price"
              type="number"
              placeholder="0"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            <Input
              label="Max Price"
              type="number"
              placeholder="1000000"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>
      </FilterSection>

      {/* Year Filter */}
      <FilterSection title="Year" section="year">
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="From"
            type="number"
            placeholder="2020"
            value={filters.minYear || ''}
            onChange={(e) => handleFilterChange('minYear', e.target.value)}
          />
          <Input
            label="To"
            type="number"
            placeholder="2024"
            value={filters.maxYear || ''}
            onChange={(e) => handleFilterChange('maxYear', e.target.value)}
          />
        </div>
      </FilterSection>

      {/* Specs Filter */}
      <FilterSection title="Specifications" section="specs">
        <div className="space-y-3">
          <Input
            label="Min Horsepower"
            type="number"
            placeholder="300"
            value={filters.minHorsepower || ''}
            onChange={(e) => handleFilterChange('minHorsepower', e.target.value)}
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Fuel Type
            </label>
            {['Gasoline', 'Electric', 'Hybrid', 'Diesel'].map((fuel) => (
              <label key={fuel} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="fuelType"
                  value={fuel}
                  checked={filters.fuelType === fuel}
                  onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                  className="w-4 h-4 text-primary-500 bg-dark-800 border-dark-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-300 hover:text-white transition-colors">
                  {fuel}
                </span>
              </label>
            ))}
          </div>
        </div>
      </FilterSection>
    </motion.div>
  )
}

export default FilterSidebar