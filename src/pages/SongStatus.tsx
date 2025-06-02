import React, { useState } from 'react';
import { BarChart, Calendar, ChevronDown, Filter, Play, Search } from 'lucide-react';

interface Release {
  id: number;
  title: string;
  type: 'Single' | 'EP' | 'Album';
  status: 'Draft' | 'Processing' | 'Review' | 'Scheduled' | 'Live' | 'Rejected';
  statusColor: string;
  submittedDate: string;
  releaseDate: string;
  image: string;
  platforms: { name: string; status: string }[];
}

const SongStatus: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  
  // Mock data
  const releases: Release[] = [
    {
      id: 1,
      title: 'Summer Vibes',
      type: 'Single',
      status: 'Live',
      statusColor: 'bg-green-500',
      submittedDate: '2023-05-10',
      releaseDate: '2023-06-15',
      image: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      platforms: [
        { name: 'Spotify', status: 'Live' },
        { name: 'Apple Music', status: 'Live' },
        { name: 'Amazon Music', status: 'Live' },
        { name: 'YouTube Music', status: 'Live' },
      ]
    },
    {
      id: 2,
      title: 'Midnight Dreams',
      type: 'EP',
      status: 'Live',
      statusColor: 'bg-green-500',
      submittedDate: '2023-03-05',
      releaseDate: '2023-04-20',
      image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      platforms: [
        { name: 'Spotify', status: 'Live' },
        { name: 'Apple Music', status: 'Live' },
        { name: 'Amazon Music', status: 'Live' },
        { name: 'YouTube Music', status: 'Live' },
      ]
    },
    {
      id: 3,
      title: 'Electric Dreams',
      type: 'Single',
      status: 'Processing',
      statusColor: 'bg-yellow-500',
      submittedDate: '2023-06-10',
      releaseDate: '2023-06-28',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      platforms: [
        { name: 'Spotify', status: 'Processing' },
        { name: 'Apple Music', status: 'Processing' },
        { name: 'Amazon Music', status: 'Processing' },
        { name: 'YouTube Music', status: 'Processing' },
      ]
    },
    {
      id: 4,
      title: 'Night Rider',
      type: 'Single',
      status: 'Scheduled',
      statusColor: 'bg-blue-500',
      submittedDate: '2023-06-15',
      releaseDate: '2023-07-15',
      image: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      platforms: [
        { name: 'Spotify', status: 'Ready' },
        { name: 'Apple Music', status: 'Ready' },
        { name: 'Amazon Music', status: 'Ready' },
        { name: 'YouTube Music', status: 'Ready' },
      ]
    },
    {
      id: 5,
      title: 'Sunset Boulevard',
      type: 'EP',
      status: 'Draft',
      statusColor: 'bg-purple-500',
      submittedDate: '2023-06-20',
      releaseDate: '2023-08-05',
      image: 'https://images.pexels.com/photos/354271/pexels-photo-354271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      platforms: [
        { name: 'Spotify', status: 'Not submitted' },
        { name: 'Apple Music', status: 'Not submitted' },
        { name: 'Amazon Music', status: 'Not submitted' },
        { name: 'YouTube Music', status: 'Not submitted' },
      ]
    },
    {
      id: 6,
      title: 'Urban Jungle',
      type: 'Single',
      status: 'Rejected',
      statusColor: 'bg-red-500',
      submittedDate: '2023-05-25',
      releaseDate: '2023-06-20',
      image: 'https://images.pexels.com/photos/2739075/pexels-photo-2739075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      platforms: [
        { name: 'Spotify', status: 'Rejected - Copyright issue' },
        { name: 'Apple Music', status: 'Rejected - Copyright issue' },
        { name: 'Amazon Music', status: 'Rejected - Copyright issue' },
        { name: 'YouTube Music', status: 'Rejected - Copyright issue' },
      ]
    },
  ];

  const filteredReleases = releases.filter(release => {
    if (filter !== 'all' && release.status.toLowerCase() !== filter) {
      return false;
    }
    
    if (searchQuery && !release.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const viewReleaseDetails = (release: Release) => {
    setSelectedRelease(release);
  };

  const closeReleaseDetails = () => {
    setSelectedRelease(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'text-green-500';
      case 'processing':
        return 'text-yellow-500';
      case 'review':
        return 'text-yellow-500';
      case 'scheduled':
        return 'text-blue-500';
      case 'draft':
        return 'text-purple-500';
      case 'rejected':
        return 'text-red-500';
      case 'ready':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Release Status</h1>
          <p className="mt-1 text-gray-400">Track the status of your music across platforms</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Upload New Release
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between mb-6">
          <div className="relative rounded-md w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full bg-gray-700 border-gray-600 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search releases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center">
                <Filter size={16} className="mr-2" />
                Status: {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                <ChevronDown size={16} className="ml-2" />
              </button>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-10 hidden">
                <div className="py-1">
                  {['all', 'live', 'processing', 'review', 'scheduled', 'draft', 'rejected'].map((status) => (
                    <button
                      key={status}
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-600 w-full text-left"
                      onClick={() => setFilter(status)}
                    >
                      {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Release
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Release Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredReleases.length > 0 ? (
                filteredReleases.map((release) => (
                  <tr 
                    key={release.id} 
                    className="hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => viewReleaseDetails(release)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                          <img 
                            className="h-10 w-10 object-cover" 
                            src={release.image} 
                            alt={release.title} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{release.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{release.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${release.statusColor} bg-opacity-10 ${getStatusColor(release.status)}`}>
                        {release.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {release.submittedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {release.releaseDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-400 hover:text-indigo-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewReleaseDetails(release);
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                    No releases found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Release details modal */}
      {selectedRelease && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={closeReleaseDetails}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="sm:flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                        Release Details
                      </h3>
                      <button 
                        type="button" 
                        className="bg-gray-700 rounded-md text-gray-400 hover:text-white"
                        onClick={closeReleaseDetails}
                      >
                        <span className="sr-only">Close</span>
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="mt-4 sm:flex">
                      <div className="flex-shrink-0 h-32 w-32 rounded-md overflow-hidden">
                        <img 
                          className="h-full w-full object-cover" 
                          src={selectedRelease.image} 
                          alt={selectedRelease.title} 
                        />
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-6">
                        <h4 className="text-xl font-bold text-white">{selectedRelease.title}</h4>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Type</p>
                            <p className="text-white">{selectedRelease.type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Status</p>
                            <p className={getStatusColor(selectedRelease.status)}>{selectedRelease.status}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Submitted Date</p>
                            <p className="text-white">{selectedRelease.submittedDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Release Date</p>
                            <p className="text-white">{selectedRelease.releaseDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-medium text-white mb-3">Platform Status</h4>
                      <div className="space-y-3">
                        {selectedRelease.platforms.map((platform, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-600 rounded-full mr-3"></div>
                              <span className="text-white">{platform.name}</span>
                            </div>
                            <span className={getStatusColor(platform.status)}>{platform.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 bg-gray-700 p-4 rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                          <Calendar className="h-5 w-5 text-gray-300" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Timeline</h4>
                          <p className="text-sm text-gray-400">Track the progress of your release</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="relative">
                          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-600"></div>
                          
                          <div className="relative pl-10 pb-6">
                            <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="text-white">Submitted for Distribution</p>
                              <p className="text-xs text-gray-400">{selectedRelease.submittedDate}</p>
                            </div>
                          </div>
                          
                          <div className="relative pl-10 pb-6">
                            <div className={`absolute left-0 top-1 w-8 h-8 rounded-full ${
                              ['Live', 'Processing', 'Review', 'Scheduled'].includes(selectedRelease.status) 
                                ? 'bg-green-500' 
                                : 'bg-gray-600'
                            } flex items-center justify-center`}>
                              {['Live', 'Processing', 'Review', 'Scheduled'].includes(selectedRelease.status) ? (
                                <Check className="h-4 w-4 text-white" />
                              ) : (
                                <span className="h-4 w-4"></span>
                              )}
                            </div>
                            <div>
                              <p className={['Live', 'Processing', 'Review', 'Scheduled'].includes(selectedRelease.status) ? 'text-white' : 'text-gray-500'}>
                                Processing
                              </p>
                              {['Live', 'Processing', 'Review', 'Scheduled'].includes(selectedRelease.status) && (
                                <p className="text-xs text-gray-400">Completed on {selectedRelease.submittedDate}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="relative pl-10 pb-6">
                            <div className={`absolute left-0 top-1 w-8 h-8 rounded-full ${
                              ['Live', 'Scheduled'].includes(selectedRelease.status) 
                                ? 'bg-green-500' 
                                : 'bg-gray-600'
                            } flex items-center justify-center`}>
                              {['Live', 'Scheduled'].includes(selectedRelease.status) ? (
                                <Check className="h-4 w-4 text-white" />
                              ) : (
                                <span className="h-4 w-4"></span>
                              )}
                            </div>
                            <div>
                              <p className={['Live', 'Scheduled'].includes(selectedRelease.status) ? 'text-white' : 'text-gray-500'}>
                                Scheduled for Release
                              </p>
                              {['Live', 'Scheduled'].includes(selectedRelease.status) && (
                                <p className="text-xs text-gray-400">Set for {selectedRelease.releaseDate}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="relative pl-10">
                            <div className={`absolute left-0 top-1 w-8 h-8 rounded-full ${
                              selectedRelease.status === 'Live' 
                                ? 'bg-green-500' 
                                : 'bg-gray-600'
                            } flex items-center justify-center`}>
                              {selectedRelease.status === 'Live' ? (
                                <Check className="h-4 w-4 text-white" />
                              ) : (
                                <span className="h-4 w-4"></span>
                              )}
                            </div>
                            <div>
                              <p className={selectedRelease.status === 'Live' ? 'text-white' : 'text-gray-500'}>
                                Live on All Platforms
                              </p>
                              {selectedRelease.status === 'Live' && (
                                <p className="text-xs text-gray-400">Released on {selectedRelease.releaseDate}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <BarChart className="h-5 w-5 mr-2" />
                  View Analytics
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeReleaseDetails}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongStatus;