import { motion } from 'framer-motion'
import ChatRoomList from '@/components/organisms/ChatRoomList'
import ApperIcon from '@/components/ApperIcon'

const ChatRoomsPage = () => {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <ApperIcon name="MessageCircle" size={32} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">Connect</span> with 
              <br />
              <span className="text-white">Car Enthusiasts</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join active discussions, share experiences, and connect with fellow automotive enthusiasts from around the world
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: 'Users', number: '25K+', label: 'Active Members' },
              { icon: 'MessageSquare', number: '100+', label: 'Chat Rooms' },
              { icon: 'Clock', number: '24/7', label: 'Live Discussions' }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-dark-800 rounded-full flex items-center justify-center mb-3 border border-dark-600">
                  <ApperIcon name={stat.icon} size={24} className="text-primary-400" />
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Chat Rooms List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Active Chat Rooms</h2>
            <p className="text-gray-400">Join conversations about your favorite brands and models</p>
          </div>
          
          <ChatRoomList />
        </motion.div>
      </div>
    </div>
  )
}

export default ChatRoomsPage