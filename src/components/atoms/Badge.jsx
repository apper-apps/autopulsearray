import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const variants = {
    default: 'bg-dark-700 text-gray-300 border-dark-600',
    primary: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    accent: 'bg-accent-500/10 text-accent-400 border-accent-500/20',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`
        inline-flex items-center font-medium rounded-full border
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {children}
    </motion.span>
  )
}

export default Badge