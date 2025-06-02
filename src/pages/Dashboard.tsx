import React from 'react';
import { BarChart, Calendar, Play, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data
  const recentReleases = [
    { id: 1, title: 'Summer Vibes', type: 'Single', streams: 12540, revenue: 276.50, date: '2023-06-15', image: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 2, title: 'Midnight Dreams', type: 'EP', streams: 45230, revenue: 987.45, date: '2023-04-20', image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 3, title: 'Elevation', type: 'Album', streams: 153420, revenue: 3254.80, date: '2023-01-10', image: 'https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}</h1>
          <p className="mt-1 text-gray-400">Here's what's happening with your music today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center">
            <Play size={16} className="mr-2" />
            Promote Music
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
            View Reports
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-500 bg-opacity-10">
              <Play className="h-6 w-6 text-indigo-500" />
            </div>
            <div className="ml-5">
              <p className="text-gray-400 text-sm font-medium">Total Streams</p>
              <h3 className="text-2xl font-bold text-white">1.2M</h3>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center text-green-500 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>8.2% increase</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
              <BarChart className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-5">
              <p className="text-gray-400 text-sm font-medium">Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-white">$4,624.90</h3>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center text-green-500 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12.3% increase</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-500 bg-opacity-10">
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
            <div className="ml-5">
              <p className="text-gray-400 text-sm font-medium">Active Releases</p>
              <h3 className="text-2xl font-bold text-white">24</h3>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center text-gray-400 text-sm">
              <span>3 pending releases</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-5">
              <p className="text-gray-400 text-sm font-medium">Monthly Listeners</p>
              <h3 className="text-2xl font-bold text-white">245.8K</h3>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center text-green-500 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>5.7% increase</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Releases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentReleases.map((release) => (
            <div 
              key={release.id} 
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={release.image} 
                  alt={release.title} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{release.title}</h3>
                    <p className="text-gray-400 text-sm">{release.type} • Released {release.date}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-500 bg-opacity-10 text-indigo-400">
                    Active
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs">Streams</p>
                    <p className="text-white font-semibold">{release.streams.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Revenue</p>
                    <p className="text-white font-semibold">${release.revenue.toFixed(2)}</p>
                  </div>
                </div>
                <button className="mt-4 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Platform Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Spotify</span>
                <span className="text-gray-400">45%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Apple Music</span>
                <span className="text-gray-400">30%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Amazon Music</span>
                <span className="text-gray-400">15%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">YouTube Music</span>
                <span className="text-gray-400">7%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '7%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Others</span>
                <span className="text-gray-400">3%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: '3%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Releases</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-700 rounded-lg">
              <div className="flex-shrink-0 h-12 w-12 rounded overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  className="h-full w-full object-cover"
                  alt="Electric Dreams"
                />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-white">Electric Dreams</h4>
                <p className="text-xs text-gray-400">Single • Scheduled for Jun 28</p>
              </div>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500 bg-opacity-10 text-yellow-400">
                Processing
              </span>
            </div>
            
            <div className="flex items-center p-3 bg-gray-700 rounded-lg">
              <div className="flex-shrink-0 h-12 w-12 rounded overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  className="h-full w-full object-cover"
                  alt="Night Rider"
                />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-white">Night Rider</h4>
                <p className="text-xs text-gray-400">Single • Scheduled for Jul 15</p>
              </div>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 bg-opacity-10 text-blue-400">
                Ready
              </span>
            </div>
            
            <div className="flex items-center p-3 bg-gray-700 rounded-lg">
              <div className="flex-shrink-0 h-12 w-12 rounded overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/354271/pexels-photo-354271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  className="h-full w-full object-cover"
                  alt="Sunset Boulevard"
                />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-white">Sunset Boulevard</h4>
                <p className="text-xs text-gray-400">EP • Scheduled for Aug 5</p>
              </div>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-500 bg-opacity-10 text-purple-400">
                Draft
              </span>
            </div>
          </div>
          <button className="mt-4 w-full text-indigo-400 py-2 border border-indigo-400 rounded hover:bg-indigo-400 hover:bg-opacity-10 transition-colors">
            View All Scheduled Releases
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;