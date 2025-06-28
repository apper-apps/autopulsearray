import { cars } from '@/services/mockData/cars.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getCars = async () => {
  await delay(300)
  return [...cars] // Return copy to prevent mutations
}

export const getCarById = async (id) => {
  await delay(200)
  const car = cars.find(c => c.Id === id)
  return car ? { ...car } : null
}

export const createCar = async (carData) => {
  await delay(400)
  const newCar = {
    ...carData,
    Id: Math.max(...cars.map(c => c.Id)) + 1
  }
  cars.push(newCar)
  return { ...newCar }
}

export const updateCar = async (id, carData) => {
  await delay(400)
  const index = cars.findIndex(c => c.Id === id)
  if (index === -1) throw new Error('Car not found')
  
  cars[index] = { ...cars[index], ...carData }
  return { ...cars[index] }
}

export const deleteCar = async (id) => {
  await delay(300)
  const index = cars.findIndex(c => c.Id === id)
  if (index === -1) throw new Error('Car not found')
  
  cars.splice(index, 1)
  return true
}