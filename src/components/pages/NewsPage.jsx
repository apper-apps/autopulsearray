import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import { getNews } from "@/services/api/newsService";
const NewsPage = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All News', icon: 'Newspaper' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'launches', label: 'New Launches', icon: 'Rocket' },
    { id: 'industry', label: 'Industry', icon: 'Building' },
    { id: 'technology', label: 'Technology', icon: 'Settings' }
  ]

  const loadNews = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getNews()
      
      // Filter by category if not 'all'
      const filteredNews = selectedCategory === 'all' 
        ? data 
        : data.filter(article => article.category === selectedCategory)
      
      setNews(filteredNews)
    } catch (err) {
      setError('Failed to load news. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [selectedCategory])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadNews} />

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <ApperIcon name="Newspaper" size={32} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">Latest</span> Automotive
              <br />
              <span className="text-white">News & Updates</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Stay updated with the latest automotive news, reviews, and industry insights from around the world
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Category Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${selectedCategory === category.id
                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                    : 'bg-dark-800 text-gray-400 border border-dark-600 hover:text-white hover:bg-dark-700'
                  }
                `}
              >
                <ApperIcon name={category.icon} size={18} />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* News Grid */}
        {news.length > 0 ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {news.map((article, index) => (
              <motion.article
                key={article.Id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden card-hover cursor-pointer"
              >
                {/* Article Image */}
<div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary" className="capitalize">
                      {article.category}
                    </Badge>
                  </div>

                  {/* Reading Time */}
<div className="absolute top-4 right-4">
                    <Badge variant="default" className="bg-black/50 backdrop-blur-sm">
                      {article.reading_time} min read
                    </Badge>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-primary-400 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Article Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-dark-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                        <ApperIcon name="User" size={12} className="text-white" />
                      </div>
                      <span>{article.author}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
<span>
                        {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
                      </span>
                    </div>
</div>
                  </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <Empty
            title="No news found"
            message="No articles found for the selected category. Try selecting a different category."
            icon="Newspaper"
            actionText="View All News"
            onAction={() => setSelectedCategory('all')}
          />
        )}
      </div>
    </div>
  )
}

export default NewsPage