// Initialize ApperClient for chat operations
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}

export const getChatRooms = async () => {
  try {
    const apperClient = getApperClient()
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "topic" } },
        { field: { Name: "participant_count" } },
        { field: { Name: "last_activity" } }
      ],
      pagingInfo: { limit: 100, offset: 0 }
    }
    
    const response = await apperClient.fetchRecords('chat_room', params)
    
if (!response.success) {
      console.error(response.message || 'Failed to fetch chat rooms')
      throw new Error(response.message || 'Failed to fetch chat rooms')
    }
    
    return response.data || []
  } catch (error) {
    console.error("Error fetching chat rooms:", error)
    throw error
  }
}

export const getChatRoomById = async (id) => {
  try {
    const apperClient = getApperClient()
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "topic" } },
        { field: { Name: "participant_count" } },
        { field: { Name: "last_activity" } }
      ]
    }
    
    const response = await apperClient.getRecordById('chat_room', id, params)
    
    if (!response.success) {
      console.error(response.message)
      return null
    }
    
    return response.data
  } catch (error) {
    console.error(`Error fetching chat room with ID ${id}:`, error)
    return null
  }
}

export const getRoomMessages = async (roomId) => {
  try {
    const apperClient = getApperClient()
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "user_id" } },
        { field: { Name: "username" } },
        { field: { Name: "content" } },
        { field: { Name: "timestamp" } },
        { field: { Name: "room_id" } }
      ],
      where: [
        {
          FieldName: "room_id",
          Operator: "EqualTo",
          Values: [roomId]
        }
      ],
      orderBy: [
        {
          fieldName: "timestamp",
          sorttype: "ASC"
        }
      ],
      pagingInfo: { limit: 1000, offset: 0 }
    }
    
    const response = await apperClient.fetchRecords('message', params)
    
    if (!response.success) {
console.error(response.message || 'Failed to fetch room messages')
      throw new Error(response.message || 'Failed to fetch room messages')
    }
    
    return response.data || []
  } catch (error) {
    console.error("Error fetching room messages:", error)
    throw error
  }
}

export const sendMessage = async (roomId, content) => {
  try {
    const apperClient = getApperClient()
    const params = {
      records: [{
        Name: content.substring(0, 50),
        user_id: 1, // Current user ID - would be dynamic in real app
        username: "You",
        content: content,
        timestamp: new Date().toISOString(),
        room_id: roomId
      }]
    }
    
    const response = await apperClient.createRecord('message', params)
    
if (!response.success) {
      console.error(response.message || 'Failed to send message')
      throw new Error(response.message || 'Failed to send message')
    }
    
    if (response.results) {
      const failedRecords = response.results.filter(result => !result.success)
      if (failedRecords.length > 0) {
        console.error(`Failed to send message:${JSON.stringify(failedRecords)}`)
        throw new Error(failedRecords[0].message || 'Failed to send message')
      }
      
      const successfulRecord = response.results.find(result => result.success)
      return successfulRecord ? successfulRecord.data : null
    }
    
    return null
  } catch (error) {
    console.error("Error sending message:", error)
    throw error
  }
}

export const createChatRoom = async (roomData) => {
  try {
    const apperClient = getApperClient()
const params = {
      records: [{
        Name: roomData.Name,
        topic: roomData.topic,
        participant_count: roomData.participant_count || 1,
        last_activity: roomData.last_activity || new Date().toISOString()
      }]
    }
    
    const response = await apperClient.createRecord('chat_room', params)
    
if (!response.success) {
      console.error(response.message || 'Failed to create chat room')
      throw new Error(response.message || 'Failed to create chat room')
    }
    
    if (response.results) {
      const failedRecords = response.results.filter(result => !result.success)
      if (failedRecords.length > 0) {
        console.error(`Failed to create chat room:${JSON.stringify(failedRecords)}`)
        throw new Error(failedRecords[0].message || 'Failed to create chat room')
      }
      
      const successfulRecord = response.results.find(result => result.success)
      return successfulRecord ? successfulRecord.data : null
    }
    
    return null
  } catch (error) {
    console.error("Error creating chat room:", error)
    throw error
  }
}