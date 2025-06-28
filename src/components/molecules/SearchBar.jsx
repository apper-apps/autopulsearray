import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

const SearchBar = ({ 
  placeholder = "Search cars, brands, models...", 
  onSearch,
  className = '' 
}) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch && query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className={`flex gap-2 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          icon="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-r-none border-r-0"
        />
      </div>
      
      <Button
        type="submit"
        variant="primary"
        className="rounded-l-none"
        disabled={!query.trim()}
      >
        Search
      </Button>
    </motion.form>
  )
}

export default SearchBar