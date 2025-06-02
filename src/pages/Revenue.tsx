import React, { useState } from 'react';
import { ChevronDown, Download, Filter, HelpCircle, Info, Search } from 'lucide-react';

interface RevenueData {
  month: string;
  spotify: number;
  apple: number;
  amazon: number;
  youtube: number;
  other: number;
  total: number;
}

const Revenue: React.FC = () => {
  const [timeframe, setTimeframe] = useState('last-12-months');
  const [sortBy, setSortBy] = useState('month');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Mock data
  const revenueData: RevenueData[] = [
    { month: 'Jun 2023', spotify: 1245.32, apple: 856.12, amazon: 324.56, youtube: 178.90, other: 95.67, total: 2700.57 },
    { month: 'May 2023', spotify: 1189.45, apple: 798.34, amazon: 312.56, youtube: 165.23, other: 87.56, total: 2553.14 },
    { month: 'Apr 2023', spotify: 1078.67, apple: 765.23, amazon: 298.45, youtube: 154.67, other: 82.34, total: 2379.36 },
    { month: 'Mar 2023', spotify: 956.34, apple: 723.45, amazon: 267.34, youtube: 143.56, other: 76.98, total: 2167.67 },
    { month: 'Feb 2023', spotify: 876.45, apple: 687.23, amazon: 245.67, youtube: 132.45, other: 72.34, total: 2014.14 },
    { month: 'Jan 2023', spotify: 945.67, apple: 712.34, amazon: 256.78, youtube: 138.90, other: 74.56, total: 2128.25 },
    { month: 'Dec 2022', spotify: 1234.56, apple: 845.67, amazon: 312.45, youtube: 167.89, other: 92.45, total: 2653.02 },
    { month: 'Nov 2022', spotify: 987.45, apple: 732.56, amazon: 278.90, youtube: 145.67, other: 78.45, total: 2223.03 },
    { month: 'Oct 2022', spotify: 923.67, apple: 698.45, amazon: 256.78, youtube: 132.45, other: 74.56, total: 2085.91 },
    { month: 'Sep 2022', spotify: 876.45, apple: 654.32, amazon: 234.56, youtube: 124.67, other: 68.90, total: 1958.90 },
    { month: 'Aug 2022', spotify: 845.67, apple: 634.56, amazon: 223.45, youtube: 119.34, other: 65.78, total: 1888.80 },
    { month: 'Jul 2022', spotify: 823.45, apple: 612.34, amazon: 212.45, youtube: 114.56, other: 62.34, total: 1825.14 },
  ];
  
  // Calculate totals
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.total, 0);
  const platformTotals = {
    spotify: revenueData.reduce((acc, curr) => acc + curr.spotify, 0),
    apple: revenueData.reduce((acc, curr) => acc + curr.apple, 0),
    amazon: revenueData.reduce((acc, curr) => acc + curr.amazon, 0),
    youtube: revenueData.reduce((acc, curr) => acc + curr.youtube, 0),
    other: revenueData.reduce((acc, curr) => acc + curr.other, 0),
  };
  
  const percentages = {
    spotify: (platformTotals.spotify / totalRevenue) * 100,
    apple: (platformTotals.apple / totalRevenue) * 100,
    amazon: (platformTotals.amazon / totalRevenue) * 100,
    youtube: (platformTotals.youtube / totalRevenue) * 100,
    other: (platformTotals.other / totalRevenue) * 100,
  };
  
  // Sort data
  const sortedData = [...revenueData].sort((a, b) => {
    if (sortBy === 'month') {
      // Sort by date
      const dateA = new Date(a.month.split(' ').reverse().join(' '));
      const dateB = new Date(b.month.split(' ').reverse().join(' '));
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else {
      // Sort by numeric value
      const valueA = a[sortBy as keyof RevenueData] as number;
      const valueB = b[sortBy as keyof RevenueData] as number;
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }
  });
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    
    return sortOrder === 'asc' ? (
      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Revenue</h1>
          <p className="mt-1 text-gray-400">Track your earnings across all platforms</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center">
            <Download size={16} className="mr-2" />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Earnings Overview</h3>
            <div className="mt-3 sm:mt-0">
              <div className="relative">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center">
                  {timeframe === 'last-12-months' ? 'Last 12 Months' : 
                   timeframe === 'this-year' ? 'This Year' : 
                   timeframe === 'last-year' ? 'Last Year' : 'Custom Range'}
                  <ChevronDown size={16} className="ml-2" />
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-10 hidden">
                  <div className="py-1">
                    {['last-12-months', 'this-year', 'last-year', 'custom'].map((time) => (
                      <button
                        key={time}
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-600 w-full text-left"
                        onClick={() => setTimeframe(time)}
                      >
                        {time === 'last-12-months' ? 'Last 12 Months' : 
                         time === 'this-year' ? 'This Year' : 
                         time === 'last-year' ? 'Last Year' : 'Custom Range'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Chart placeholder - in a real app, this would be a chart component */}
            <div className="h-80 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Revenue Chart</p>
                <p className="text-white text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
                <p className="text-gray-400 mt-2">Total Revenue ({timeframe === 'last-12-months' ? 'Last 12 Months' : 
                   timeframe === 'this-year' ? 'This Year' : 
                   timeframe === 'last-year' ? 'Last Year' : 'Custom Range'})</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Platform Breakdown</h3>
            <button className="text-gray-400 hover:text-white">
              <Info size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Spotify
                </span>
                <span className="text-gray-400">{percentages.spotify.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${percentages.spotify}%` }}></div>
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">${platformTotals.spotify.toFixed(2)}</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  Apple Music
                </span>
                <span className="text-gray-400">{percentages.apple.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${percentages.apple}%` }}></div>
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">${platformTotals.apple.toFixed(2)}</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Amazon Music
                </span>
                <span className="text-gray-400">{percentages.amazon.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${percentages.amazon}%` }}></div>
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">${platformTotals.amazon.toFixed(2)}</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400 flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                  YouTube Music
                </span>
                <span className="text-gray-400">{percentages.youtube.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${percentages.youtube}%` }}></div>
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">${platformTotals.youtube.toFixed(2)}</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400 flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                  Others
                </span>
                <span className="text-gray-400">{percentages.other.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: `${percentages.other}%` }}></div>
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">${platformTotals.other.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-indigo-500 bg-opacity-10 p-2 rounded-full">
                <HelpCircle className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Monthly Breakdown</h3>
          <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full bg-gray-700 border-gray-600 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search months..."
              />
            </div>
            
            <div className="relative">
              <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center">
                <Filter size={16} className="mr-2" />
                Filter
                <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('month')}
                >
                  <div className="flex items-center">
                    Month {getSortIcon('month')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('spotify')}
                >
                  <div className="flex items-center">
                    Spotify {getSortIcon('spotify')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('apple')}
                >
                  <div className="flex items-center">
                    Apple Music {getSortIcon('apple')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('amazon')}
                >
                  <div className="flex items-center">
                    Amazon Music {getSortIcon('amazon')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('youtube')}
                >
                  <div className="flex items-center">
                    YouTube {getSortIcon('youtube')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('other')}
                >
                  <div className="flex items-center">
                    Other {getSortIcon('other')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('total')}
                >
                  <div className="flex items-center">
                    Total {getSortIcon('total')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {sortedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {item.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${item.spotify.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${item.apple.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${item.amazon.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${item.youtube.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ${item.other.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-400">
                    ${item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                  ${platformTotals.spotify.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                  ${platformTotals.apple.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                  ${platformTotals.amazon.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                  ${platformTotals.youtube.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                  ${platformTotals.other.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-400">
                  ${totalRevenue.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Revenue;