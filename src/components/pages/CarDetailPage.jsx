import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { getCarById } from '@/services/api/carService'
import { getChatRooms } from '@/services/api/chatService'

const CarDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [relatedRooms, setRelatedRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('specs')

  const loadCarDetails = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [carData, roomsData] = await Promise.all([
        getCarById(parseInt(id)),
        getChatRooms()
      ])
      
      if (!carData) {
        setError('Car not found')
        return
      }
      
      setCar(carData)
      
      // Find related chat rooms (rooms that mention this car's brand)
      const related = roomsData.filter(room => 
        room.name.toLowerCase().includes(carData.brand.toLowerCase()) ||
        room.topic.toLowerCase().includes(carData.brand.toLowerCase())
      )
      setRelatedRooms(related)
      
    } catch (err) {
      setError('Failed to load car details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCarDetails()
  }, [id])

  const handleJoinChat = (roomId) => {
    navigate(`/chat/${roomId}`)
  }

  const handleAddToCompare = () => {
    // Add to comparison list in localStorage
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]')
    if (!compareList.find(c => c.Id === car.Id)) {
      compareList.push(car)
      localStorage.setItem('compareList', JSON.stringify(compareList))
      toast.success('Added to comparison list')
    } else {
      toast.info('Car already in comparison list')
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCarDetails} />
  if (!car) return <Error message="Car not found" />

  const tabs = [
    { id: 'specs', label: 'Specifications', icon: 'Settings' },
    { id: 'features', label: 'Features', icon: 'Star' },
    { id: 'chat', label: 'Discussions', icon: 'MessageCircle' }
  ]

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Button
          variant="ghost"
          icon="ArrowLeft"
          onClick={() => navigate(-1)}
        >
          Back to Cars
        </Button>
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Car Image */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden bg-dark-900 border border-dark-700">
<img
                  src={car.image_url}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Badges */}
              <div className="absolute top-4 left-4">
                <Badge variant="primary" size="lg">{car.year}</Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="accent" className="text-lg font-bold">
                  {formatPrice(car.price)}
                </Badge>
              </div>
            </motion.div>

            {/* Car Info */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  {car.brand} <span className="gradient-text">{car.model}</span>
                </h1>
<p className="text-xl text-gray-400">
                  {car.category || 'Premium Luxury Vehicle'}
                </p>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg">
                {car.description}
              </p>

              {/* Key Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-dark-800 rounded-xl p-4 text-center border border-dark-700">
                  <ApperIcon name="Zap" size={24} className="text-primary-400 mx-auto mb-2" />
<p className="text-sm text-gray-400">Power</p>
                  <p className="text-lg font-bold text-white">
                    {car.horsepower || '400'} HP
                  </p>
                </div>
                
                <div className="bg-dark-800 rounded-xl p-4 text-center border border-dark-700">
                  <ApperIcon name="Gauge" size={24} className="text-accent-400 mx-auto mb-2" />
<p className="text-sm text-gray-400">0-60 mph</p>
                  <p className="text-lg font-bold text-white">
                    {car.acceleration || '4.2'}s
                  </p>
                </div>
                
                <div className="bg-dark-800 rounded-xl p-4 text-center border border-dark-700">
                  <ApperIcon name="Fuel" size={24} className="text-green-400 mx-auto mb-2" />
<p className="text-sm text-gray-400">Fuel Economy</p>
                  <p className="text-lg font-bold text-white">
                    {car.mpg || '25'} mpg
                  </p>
                </div>
                
                <div className="bg-dark-800 rounded-xl p-4 text-center border border-dark-700">
                  <ApperIcon name="Users" size={24} className="text-purple-400 mx-auto mb-2" />
<p className="text-sm text-gray-400">Seating</p>
                  <p className="text-lg font-bold text-white">
                    {car.seating || '4'} seats
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon="BarChart3"
                  onClick={handleAddToCompare}
                  className="flex-1"
                >
                  Add to Compare
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  icon="MessageCircle"
                  onClick={() => setActiveTab('chat')}
                  className="flex-1"
                >
                  Join Discussion
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Detailed Information Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-dark-900 rounded-2xl border border-dark-700 overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="border-b border-dark-700">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-primary-500/10 text-primary-400 border-b-2 border-primary-500'
                      : 'text-gray-400 hover:text-white hover:bg-dark-800'
                    }
                  `}
                >
                  <ApperIcon name={tab.icon} size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'specs' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">Engine & Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
<span className="text-gray-400">Engine Type</span>
                      <span className="text-white">{car.engine_type || 'V8 Turbocharged'}</span>
                    </div>
<div className="flex justify-between">
                      <span className="text-gray-400">Horsepower</span>
                      <span className="text-white">{car.horsepower || '400'} HP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Torque</span>
                      <span className="text-white">{car.specs?.torque || '500'} lb-ft</span>
                    </div>
<div className="flex justify-between">
                      <span className="text-gray-400">Transmission</span>
                      <span className="text-white">{car.transmission || '8-Speed Automatic'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">Dimensions & Weight</h3>
                  <div className="space-y-3">
<div className="flex justify-between">
                      <span className="text-gray-400">Length</span>
                      <span className="text-white">{car.length || '185'}" in</span>
                    </div>
<div className="flex justify-between">
                      <span className="text-gray-400">Width</span>
                      <span className="text-white">{car.width || '73'}" in</span>
                    </div>
<div className="flex justify-between">
                      <span className="text-gray-400">Height</span>
                      <span className="text-white">{car.height || '56'}" in</span>
                    </div>
<div className="flex justify-between">
                      <span className="text-gray-400">Curb Weight</span>
                      <span className="text-white">{car.weight || '4,200'} lbs</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  'Premium Sound System',
                  'Panoramic Sunroof',
                  'Adaptive Cruise Control',
                  'Heated & Ventilated Seats',
                  'Wireless Charging',
                  'LED Ambient Lighting',
                  'Premium Leather Interior',
                  'Advanced Safety Package',
                  'Navigation System'
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-dark-800 rounded-lg border border-dark-700"
                  >
                    <ApperIcon name="Check" size={20} className="text-green-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'chat' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white">Related Discussions</h3>
                {relatedRooms.length > 0 ? (
                  <div className="space-y-4">
                    {relatedRooms.map((room) => (
                      <div
                        key={room.Id}
                        className="flex items-center justify-between p-4 bg-dark-800 rounded-lg border border-dark-700 hover:border-primary-500/50 transition-colors"
                      >
                        <div>
                          <h4 className="font-semibold text-white">{room.name}</h4>
                          <p className="text-sm text-gray-400">{room.topic}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>{room.participantCount} participants</span>
                          </div>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleJoinChat(room.Id)}
                        >
                          Join Chat
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <ApperIcon name="MessageCircle" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No related discussions found.</p>
                    <Button
                      variant="primary"
                      className="mt-4"
                      onClick={() => navigate('/chat')}
                    >
                      Browse All Chat Rooms
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CarDetailPage