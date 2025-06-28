import { chatRooms } from '@/services/mockData/chatRooms.json'
import { messages } from '@/services/mockData/messages.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getChatRooms = async () => {
  await delay(300)
  return [...chatRooms]
}

export const getChatRoomById = async (id) => {
  await delay(200)
  const room = chatRooms.find(r => r.Id === id)
  return room ? { ...room } : null
}

export const getRoomMessages = async (roomId) => {
  await delay(250)
  return messages.filter(m => m.roomId === roomId)
}

export const sendMessage = async (roomId, content) => {
  await delay(400)
  const newMessage = {
    Id: Math.max(...messages.map(m => m.Id)) + 1,
    userId: 'current-user',
    username: 'You',
    content,
    timestamp: new Date().toISOString(),
    roomId
  }
  messages.push(newMessage)
  return { ...newMessage }
}

export const createChatRoom = async (roomData) => {
  await delay(500)
  const newRoom = {
    ...roomData,
    Id: Math.max(...chatRooms.map(r => r.Id)) + 1,
    participantCount: 1,
    lastActivity: new Date().toISOString()
  }
  chatRooms.push(newRoom)
  return { ...newRoom }
}