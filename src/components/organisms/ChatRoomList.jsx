import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getChatRooms } from '@/services/api/chatService'
import { formatDistanceToNow } from 'date-fns'

const ChatRoomList = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const loadRooms = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getChatRooms()
      setRooms(data)
    } catch (err) {
      setError('Failed to load chat rooms. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRooms()
  }, [])

  const handleJoinRoom = (roomId) => {
    navigate(`/chat/${roomId}`)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadRooms} />
  if (rooms.length === 0) return <Empty />

  return (
    <div className="space-y-4">
      {rooms.map((room, index) => (
        <motion.div
          key={room.Id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-dark-900 border border-dark-700 rounded-xl p-6 card-hover cursor-pointer"
          onClick={() => handleJoinRoom(room.Id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <ApperIcon name="MessageCircle" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white hover:text-primary-400 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-400">{room.topic}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Users" size={16} />
                  <span>{room.participantCount} participants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Clock" size={16} />
                  <span>
                    {formatDistanceToNow(new Date(room.lastActivity), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {room.participantCount > 50 && (
                <Badge variant="accent">Hot</Badge>
              )}
              <Button
                variant="primary"
                size="sm"
                icon="ArrowRight"
                onClick={(e) => {
                  e.stopPropagation()
                  handleJoinRoom(room.Id)
                }}
              >
                Join
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ChatRoomList