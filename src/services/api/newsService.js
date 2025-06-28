import { news } from '@/services/mockData/news.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getNews = async () => {
  await delay(300)
  return [...news]
}

export const getNewsById = async (id) => {
  await delay(200)
  const article = news.find(n => n.Id === id)
  return article ? { ...article } : null
}

export const createNews = async (newsData) => {
  await delay(400)
  const newArticle = {
    ...newsData,
    Id: Math.max(...news.map(n => n.Id)) + 1,
    publishedAt: new Date().toISOString()
  }
  news.push(newArticle)
  return { ...newArticle }
}