import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-dark-800 rounded-lg w-48 shimmer" />
          <div className="h-4 bg-dark-800 rounded-lg w-32 shimmer" />
        </div>
        <div className="flex space-x-2">
          <div className="h-10 w-10 bg-dark-800 rounded-lg shimmer" />
          <div className="h-10 w-10 bg-dark-800 rounded-lg shimmer" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-dark-900 border border-dark-700 rounded-xl overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="h-48 bg-dark-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dark-700/50 to-transparent translate-x-[-100%] animate-shimmer" />
            </div>
            
            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-6 bg-dark-800 rounded-lg w-3/4 shimmer" />
                <div className="h-4 bg-dark-800 rounded-lg w-1/2 shimmer" />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-center space-y-2">
                    <div className="w-8 h-8 bg-dark-800 rounded-full mx-auto shimmer" />
                    <div className="h-3 bg-dark-800 rounded w-12 mx-auto shimmer" />
                    <div className="h-4 bg-dark-800 rounded w-16 mx-auto shimmer" />
                  </div>
                ))}
              </div>
              
              <div className="h-10 bg-dark-800 rounded-lg shimmer" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Add shimmer utility class
const shimmerStyles = `
  .shimmer {
    position: relative;
    overflow: hidden;
  }
  
  .shimmer::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    animation: shimmer 2s infinite;
  }
`

export default Loading