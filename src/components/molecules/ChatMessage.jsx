import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'

const ChatMessage = ({ message, index = 0 }) => {
  const isOwnMessage = message.userId === 'current-user' // This would come from auth context in real app

  return (
    <motion.div
      initial={{ opacity: 0, x: isOwnMessage ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        {/* User info */}
        <div className={`flex items-center mb-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-400 mr-2">
            {message.username}
          </span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </span>
        </div>
        
        {/* Message bubble */}
        <div className={`
          px-4 py-2 rounded-2xl
          ${isOwnMessage 
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white' 
            : 'bg-dark-800 text-gray-200 border border-dark-700'
          }
        `}>
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
      
      {/* Avatar */}
      <div className={`flex-shrink-0 ${isOwnMessage ? 'order-1 mr-3' : 'order-2 ml-3'}`}>
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
          <ApperIcon name="User" size={16} className="text-white" />
        </div>
      </div>
    </motion.div>
  )
}

export default ChatMessage