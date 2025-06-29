import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ChatMessage from '@/components/molecules/ChatMessage'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { getChatRoomById, getRoomMessages, sendMessage } from '@/services/api/chatService'

const ChatRoomPage = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)
  
  const [room, setRoom] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const loadChatRoom = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [roomData, messagesData] = await Promise.all([
        getChatRoomById(parseInt(roomId)),
        getRoomMessages(parseInt(roomId))
      ])
      
      if (!roomData) {
        setError('Chat room not found')
        return
      }
      
      setRoom(roomData)
      setMessages(messagesData)
    } catch (err) {
      setError('Failed to load chat room. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadChatRoom()
  }, [roomId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!newMessage.trim() || sending) return
    
    try {
      setSending(true)
      
      const message = await sendMessage(parseInt(roomId), newMessage.trim())
      setMessages(prev => [...prev, message])
      setNewMessage('')
      
      toast.success('Message sent!')
    } catch (err) {
      toast.error('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadChatRoom} />
  if (!room) return <Error message="Chat room not found" />

  return (
    <div className="h-screen bg-dark-950 flex flex-col">
      {/* Chat Room Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass border-b border-white/10 px-4 py-4 flex-shrink-0"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              icon="ArrowLeft"
              onClick={() => navigate('/chat')}
            />
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="MessageCircle" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">{room.name}</h1>
                <p className="text-sm text-gray-400">{room.topic}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
<span>{room.participant_count} online</span>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>
      </motion.header>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {messages.length > 0 ? (
              <div className="space-y-2">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.Id}
                    message={message}
                    index={index}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="text-center py-16">
                <ApperIcon name="MessageCircle" size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No messages yet. Start the conversation!</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Input */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass border-t border-white/10 px-4 py-4 flex-shrink-0"
        >
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={sending}
                  className="bg-dark-800 border-dark-600 focus:border-primary-500"
                />
              </div>
              
              <Button
                type="submit"
                variant="primary"
                disabled={!newMessage.trim() || sending}
                loading={sending}
                icon="Send"
              >
                Send
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ChatRoomPage