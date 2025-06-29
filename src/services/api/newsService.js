// Initialize ApperClient for news operations
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}

export const getNews = async () => {
  try {
    const apperClient = getApperClient()
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "title" } },
        { field: { Name: "excerpt" } },
        { field: { Name: "content" } },
        { field: { Name: "category" } },
        { field: { Name: "author" } },
        { field: { Name: "published_at" } },
        { field: { Name: "reading_time" } },
        { field: { Name: "image_url" } }
      ],
      orderBy: [
        {
          fieldName: "published_at",
          sorttype: "DESC"
        }
      ],
      pagingInfo: { limit: 100, offset: 0 }
    }
    
    const response = await apperClient.fetchRecords('news_article', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    return response.data || []
  } catch (error) {
    console.error("Error fetching news:", error)
    throw error
  }
}

export const getNewsById = async (id) => {
  try {
    const apperClient = getApperClient()
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "title" } },
        { field: { Name: "excerpt" } },
        { field: { Name: "content" } },
        { field: { Name: "category" } },
        { field: { Name: "author" } },
        { field: { Name: "published_at" } },
        { field: { Name: "reading_time" } },
        { field: { Name: "image_url" } }
      ]
    }
    
    const response = await apperClient.getRecordById('news_article', id, params)
    
    if (!response.success) {
      console.error(response.message)
      return null
    }
    
    return response.data
  } catch (error) {
    console.error(`Error fetching news article with ID ${id}:`, error)
    return null
  }
}

export const createNews = async (newsData) => {
  try {
    const apperClient = getApperClient()
    const params = {
      records: [{
        Name: newsData.title,
        title: newsData.title,
        excerpt: newsData.excerpt,
        content: newsData.content,
        category: newsData.category,
        author: newsData.author,
        published_at: newsData.published_at || new Date().toISOString(),
        reading_time: newsData.reading_time,
        image_url: newsData.image_url
      }]
    }
    
    const response = await apperClient.createRecord('news_article', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    if (response.results) {
      const failedRecords = response.results.filter(result => !result.success)
      if (failedRecords.length > 0) {
        console.error(`Failed to create news article:${JSON.stringify(failedRecords)}`)
        throw new Error(failedRecords[0].message || 'Failed to create news article')
      }
      
      const successfulRecord = response.results.find(result => result.success)
      return successfulRecord ? successfulRecord.data : null
    }
    
    return null
  } catch (error) {
    console.error("Error creating news article:", error)
    throw error
  }
}