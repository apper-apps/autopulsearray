import { useState } from 'react'
import { populateDatabase, populateCars, populateChatRooms, populateNews } from '@/scripts/populateDatabase'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const DatabaseManagePage = () => {
  const [isPopulating, setIsPopulating] = useState(false)
  const [populatingTable, setPopulatingTable] = useState(null)
  const [results, setResults] = useState(null)
  const [logs, setLogs] = useState([])

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, { message, type, timestamp }])
  }

  const handlePopulateAll = async () => {
    setIsPopulating(true)
    setPopulatingTable('all')
    setResults(null)
    setLogs([])
    
    try {
      addLog('Starting complete database population...', 'info')
      
      const result = await populateDatabase()
      
      setResults(result)
      addLog(`Population completed! ${result.summary.totalSuccess}/${result.summary.totalRecords} records successful`, 'success')
      
      if (result.summary.totalFailures === 0) {
        toast.success('All records populated successfully!')
      } else {
        toast.warning(`${result.summary.totalFailures} records failed to populate`)
      }
      
    } catch (error) {
      addLog(`Fatal error: ${error.message}`, 'error')
      toast.error('Database population failed')
      console.error('Population error:', error)
    } finally {
      setIsPopulating(false)
      setPopulatingTable(null)
    }
  }

  const handlePopulateTable = async (tableName, populateFunction) => {
    setIsPopulating(true)
    setPopulatingTable(tableName)
    setLogs([])
    
    try {
      addLog(`Starting ${tableName} population...`, 'info')
      
      const result = await populateFunction()
      
      addLog(`${tableName} population completed: ${result.successCount} successful, ${result.failureCount} failed`, 
        result.failureCount === 0 ? 'success' : 'warning')
      
      if (result.failureCount === 0) {
        toast.success(`${tableName} populated successfully!`)
      } else {
        toast.warning(`${result.failureCount} ${tableName} records failed`)
      }
      
    } catch (error) {
      addLog(`Error populating ${tableName}: ${error.message}`, 'error')
      toast.error(`${tableName} population failed`)
      console.error(`${tableName} population error:`, error)
    } finally {
      setIsPopulating(false)
      setPopulatingTable(null)
    }
  }

  const clearLogs = () => {
    setLogs([])
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ApperIcon name="Database" size={32} className="text-primary" />
            <h1 className="text-3xl font-bold">Database Management</h1>
          </div>
          <p className="text-gray-400">
            Populate Apper database tables with sample data. Use these controls to add records to the car, chat_room, and news_article tables.
          </p>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={handlePopulateAll}
            disabled={isPopulating}
            className="bg-primary hover:bg-primary-dark disabled:bg-gray-700 disabled:cursor-not-allowed p-4 rounded-lg transition-colors flex flex-col items-center gap-2"
          >
            <ApperIcon name="Database" size={24} />
            <span className="font-semibold">Populate All Tables</span>
            <span className="text-sm opacity-75">36 total records</span>
            {populatingTable === 'all' && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32">
                    <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
                  </circle>
                </svg>
                Populating...
              </div>
            )}
          </button>

          <button
            onClick={() => handlePopulateTable('Cars', populateCars)}
            disabled={isPopulating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed p-4 rounded-lg transition-colors flex flex-col items-center gap-2"
          >
            <ApperIcon name="Car" size={24} />
            <span className="font-semibold">Cars Table</span>
            <span className="text-sm opacity-75">20 records</span>
            {populatingTable === 'Cars' && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32">
                    <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
                  </circle>
                </svg>
                Populating...
              </div>
            )}
          </button>

          <button
            onClick={() => handlePopulateTable('Chat Rooms', populateChatRooms)}
            disabled={isPopulating}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed p-4 rounded-lg transition-colors flex flex-col items-center gap-2"
          >
            <ApperIcon name="MessageCircle" size={24} />
            <span className="font-semibold">Chat Rooms</span>
            <span className="text-sm opacity-75">8 records</span>
            {populatingTable === 'Chat Rooms' && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32">
                    <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
                  </circle>
                </svg>
                Populating...
              </div>
            )}
          </button>

          <button
            onClick={() => handlePopulateTable('News Articles', populateNews)}
            disabled={isPopulating}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed p-4 rounded-lg transition-colors flex flex-col items-center gap-2"
          >
            <ApperIcon name="Newspaper" size={24} />
            <span className="font-semibold">News Articles</span>
            <span className="text-sm opacity-75">8 records</span>
            {populatingTable === 'News Articles' && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32">
                    <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
                  </circle>
                </svg>
                Populating...
              </div>
            )}
          </button>
        </div>

        {/* Results Summary */}
        {results && (
          <div className="bg-dark-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ApperIcon name="BarChart3" size={20} />
              Population Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-700 p-4 rounded">
                <div className="text-2xl font-bold text-green-400">{results.summary.totalSuccess}</div>
                <div className="text-sm text-gray-400">Successful Records</div>
              </div>
              <div className="bg-dark-700 p-4 rounded">
                <div className="text-2xl font-bold text-red-400">{results.summary.totalFailures}</div>
                <div className="text-sm text-gray-400">Failed Records</div>
              </div>
              <div className="bg-dark-700 p-4 rounded">
                <div className="text-2xl font-bold text-blue-400">{results.summary.duration}s</div>
                <div className="text-sm text-gray-400">Duration</div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold">Cars:</span> {results.cars.successCount}/{results.cars.successCount + results.cars.failureCount}
              </div>
              <div>
                <span className="font-semibold">Chat Rooms:</span> {results.chatRooms.successCount}/{results.chatRooms.successCount + results.chatRooms.failureCount}
              </div>
              <div>
                <span className="font-semibold">News:</span> {results.news.successCount}/{results.news.successCount + results.news.failureCount}
              </div>
            </div>
          </div>
        )}

        {/* Logs */}
        <div className="bg-dark-800 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-dark-700">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ApperIcon name="ScrollText" size={20} />
              Activity Log
            </h2>
            <button
              onClick={clearLogs}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ApperIcon name="Trash2" size={16} />
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <ApperIcon name="FileText" size={32} className="mx-auto mb-2 opacity-50" />
                <p>No activity yet. Start a population process to see logs here.</p>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {logs.map((log, index) => (
                  <div key={index} className={`flex items-start gap-3 p-2 rounded text-sm ${
                    log.type === 'error' ? 'bg-red-900/20 text-red-300' :
                    log.type === 'success' ? 'bg-green-900/20 text-green-300' :
                    log.type === 'warning' ? 'bg-yellow-900/20 text-yellow-300' :
                    'bg-dark-700 text-gray-300'
                  }`}>
                    <span className="text-xs text-gray-500 mt-0.5 font-mono">
                      {log.timestamp}
                    </span>
                    <span className="flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-dark-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <ApperIcon name="Info" size={20} />
            Instructions
          </h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• <strong>Populate All Tables:</strong> Adds all sample data (cars, chat rooms, news articles) in sequence</li>
            <li>• <strong>Individual Tables:</strong> Populate specific tables for testing or partial data loading</li>
            <li>• <strong>Error Handling:</strong> Failed records are logged with detailed error messages</li>
            <li>• <strong>Progress Tracking:</strong> Watch real-time progress in the activity log</li>
            <li>• <strong>Duplicate Prevention:</strong> Existing records may cause errors - this is expected behavior</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DatabaseManagePage