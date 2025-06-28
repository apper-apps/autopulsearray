import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  title = "Oops! Something went wrong"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="AlertTriangle" size={40} className="text-white" />
        </motion.div>

        {/* Error Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>
          
          <p className="text-gray-400 leading-relaxed">
            {message}
          </p>
        </motion.div>

        {/* Retry Button */}
        {onRetry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <Button
              variant="primary"
              onClick={onRetry}
              icon="RefreshCw"
              className="mx-auto"
            >
              Try Again
            </Button>
          </motion.div>
        )}

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent-500/5 to-primary-500/5 rounded-full blur-3xl" />
        </div>
      </div>
    </motion.div>
  )
}

export default Error