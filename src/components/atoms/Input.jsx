import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  label,
  type = 'text',
  placeholder,
  icon,
  error,
  disabled = false,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              size={20} 
              className="text-gray-400" 
            />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            input-field w-full
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-accent-500 focus:border-accent-500 focus:ring-accent-500/20' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-accent-500">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input