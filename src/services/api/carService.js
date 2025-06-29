// Initialize ApperClient for car operations
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}

export const getCars = async () => {
  try {
    const apperClient = getApperClient()
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "brand" } },
        { field: { Name: "model" } },
        { field: { Name: "year" } },
        { field: { Name: "price" } },
        { field: { Name: "image_url" } },
        { field: { Name: "description" } },
        { field: { Name: "category" } },
        { field: { Name: "horsepower" } },
        { field: { Name: "acceleration" } },
        { field: { Name: "mpg" } },
        { field: { Name: "seating" } },
        { field: { Name: "engine_type" } },
        { field: { Name: "transmission" } },
        { field: { Name: "fuel_type" } },
        { field: { Name: "length" } },
        { field: { Name: "width" } },
        { field: { Name: "height" } },
        { field: { Name: "weight" } }
      ],
      pagingInfo: { limit: 100, offset: 0 }
    }
    
    const response = await apperClient.fetchRecords('car', params)
    
    if (!response.success) {
console.error('API Error:', response?.message || 'Unknown error - response may be undefined')
      throw new Error(response?.message || 'Failed to fetch cars - please check API connectivity')
    }
    
    return response.data || []
  } catch (error) {
    console.error("Error fetching cars:", error)
    throw error
  }
}

export const getCarById = async (id) => {
  try {
    const apperClient = getApperClient()
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "brand" } },
        { field: { Name: "model" } },
        { field: { Name: "year" } },
        { field: { Name: "price" } },
        { field: { Name: "image_url" } },
        { field: { Name: "description" } },
        { field: { Name: "category" } },
        { field: { Name: "horsepower" } },
        { field: { Name: "acceleration" } },
        { field: { Name: "mpg" } },
        { field: { Name: "seating" } },
        { field: { Name: "engine_type" } },
        { field: { Name: "transmission" } },
        { field: { Name: "fuel_type" } },
        { field: { Name: "length" } },
        { field: { Name: "width" } },
        { field: { Name: "height" } },
        { field: { Name: "weight" } }
      ]
    }
    
    const response = await apperClient.getRecordById('car', id, params)
    
if (!response || !response.success) {
      console.error('API Error:', response?.message || 'Unknown error - response may be undefined')
      return null
    }
    
    return response.data
  } catch (error) {
    console.error(`Error fetching car with ID ${id}:`, error)
    return null
  }
}

export const createCar = async (carData) => {
  try {
    const apperClient = getApperClient()
    const params = {
      records: [{
        Name: carData.Name,
        brand: carData.brand,
        model: carData.model,
        year: carData.year,
        price: carData.price,
        image_url: carData.image_url,
        description: carData.description,
        category: carData.category,
        horsepower: carData.horsepower,
        acceleration: carData.acceleration,
        mpg: carData.mpg,
        seating: carData.seating,
        engine_type: carData.engine_type,
        transmission: carData.transmission,
        fuel_type: carData.fuel_type,
        length: carData.length,
        width: carData.width,
        height: carData.height,
weight: carData.weight,
        Tags: carData.Tags || ""
      }]
    }
    
    const response = await apperClient.createRecord('car', params)
    
if (!response || !response.success) {
      console.error('API Error:', response?.message || 'Unknown error - response may be undefined')
      throw new Error(response?.message || 'Failed to create car - please check API connectivity')
    }
    
    if (response.results) {
      const failedRecords = response.results.filter(result => !result.success)
      if (failedRecords.length > 0) {
        console.error(`Failed to create car:${JSON.stringify(failedRecords)}`)
        throw new Error(failedRecords[0].message || 'Failed to create car')
      }
      
      const successfulRecord = response.results.find(result => result.success)
      return successfulRecord ? successfulRecord.data : null
    }
    
    return null
  } catch (error) {
    console.error("Error creating car:", error)
    throw error
  }
}

export const updateCar = async (id, carData) => {
  try {
    const apperClient = getApperClient()
    const params = {
      records: [{
        Id: id,
        Name: carData.Name,
        brand: carData.brand,
        model: carData.model,
        year: carData.year,
        price: carData.price,
        image_url: carData.image_url,
        description: carData.description,
        category: carData.category,
        horsepower: carData.horsepower,
        acceleration: carData.acceleration,
        mpg: carData.mpg,
        seating: carData.seating,
        engine_type: carData.engine_type,
        transmission: carData.transmission,
        fuel_type: carData.fuel_type,
        length: carData.length,
        width: carData.width,
height: carData.height,
        weight: carData.weight,
        Tags: carData.Tags || ""
      }]
    }
    
    const response = await apperClient.updateRecord('car', params)
    
if (!response || !response.success) {
      console.error('API Error:', response?.message || 'Unknown error - response may be undefined')
      throw new Error(response?.message || 'Failed to update car - please check API connectivity')
    }
    
    if (response.results) {
      const failedRecords = response.results.filter(result => !result.success)
      if (failedRecords.length > 0) {
        console.error(`Failed to update car:${JSON.stringify(failedRecords)}`)
        throw new Error(failedRecords[0].message || 'Failed to update car')
      }
      
      const successfulRecord = response.results.find(result => result.success)
      return successfulRecord ? successfulRecord.data : null
    }
    
    return null
  } catch (error) {
    console.error("Error updating car:", error)
    throw error
  }
}

export const deleteCar = async (id) => {
  try {
    const apperClient = getApperClient()
    const params = {
      RecordIds: [id]
    }
    
    const response = await apperClient.deleteRecord('car', params)
    
if (!response || !response.success) {
      console.error('API Error:', response?.message || 'Unknown error - response may be undefined')
      throw new Error(response?.message || 'Failed to delete car - please check API connectivity')
    }
    
    if (response.results) {
      const failedRecords = response.results.filter(result => !result.success)
      if (failedRecords.length > 0) {
        console.error(`Failed to delete car:${JSON.stringify(failedRecords)}`)
        throw new Error(failedRecords[0].message || 'Failed to delete car')
      }
    }
    
    return true
  } catch (error) {
    console.error("Error deleting car:", error)
    throw error
  }
}