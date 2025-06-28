import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = "No cars found",
  message = "Try adjusting your filters or search terms to find what you're looking for.",
  icon = "Car",
  actionText = "Browse All Cars",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center max-w-md">
        {/* Empty Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center"
        >
          <ApperIcon name={icon} size={40} className="text-white" />
        </motion.div>

        {/* Empty Text */}
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

        {/* Action Button */}
        {(onAction || actionText) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <Button
              variant="primary"
              onClick={onAction}
              icon="ArrowRight"
              iconPosition="right"
            >
              {actionText}
            </Button>
          </motion.div>
        )}

        {/* Floating Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-500 rounded-full opacity-30"
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
            className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent-500 rounded-full opacity-20"
          />
          <motion.div
            animate={{ 
              x: [0, 60, 0],
              y: [0, -80, 0]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 4
            }}
            className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full opacity-40"
          />
        </div>

        {/* Background Glow */}
        <div className="absolute inset-0 -z-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-full blur-3xl" />
        </div>
      </div>
    </motion.div>
  )
}

export default Empty