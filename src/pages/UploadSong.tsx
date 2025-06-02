import React, { useState } from 'react';
import { Check, Upload, X } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  logo: string;
  selected: boolean;
}

const UploadSong: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [isDraggingAudio, setIsDraggingAudio] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 'spotify', name: 'Spotify', logo: 'https://images.pexels.com/photos/2746823/pexels-photo-2746823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', selected: true },
    { id: 'apple', name: 'Apple Music', logo: 'https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', selected: true },
    { id: 'amazon', name: 'Amazon Music', logo: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', selected: true },
    { id: 'youtube', name: 'YouTube Music', logo: 'https://images.pexels.com/photos/1261578/pexels-photo-1261578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', selected: true },
    { id: 'deezer', name: 'Deezer', logo: 'https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', selected: false },
    { id: 'tidal', name: 'Tidal', logo: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', selected: false },
  ]);

  const togglePlatform = (id: string) => {
    setPlatforms(platforms.map(platform => 
      platform.id === id ? { ...platform, selected: !platform.selected } : platform
    ));
  };

  const handleCoverDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingCover(true);
  };

  const handleCoverDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingCover(false);
  };

  const handleCoverDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingCover(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setCoverImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingAudio(true);
  };

  const handleAudioDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingAudio(false);
  };

  const handleAudioDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingAudio(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
      }
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate upload
    setIsUploading(true);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setCurrentStep(4); // Move to success step
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Upload Your Track</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 transition-colors ${
                  isDraggingCover 
                    ? 'border-indigo-500 bg-indigo-500 bg-opacity-5' 
                    : 'border-gray-700 hover:border-indigo-500 hover:bg-gray-800'
                }`}
                onDragOver={handleCoverDragOver}
                onDragLeave={handleCoverDragLeave}
                onDrop={handleCoverDrop}
              >
                {coverPreview ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={coverPreview} 
                      alt="Cover preview" 
                      className="w-full h-full object-contain rounded"
                    />
                    <button 
                      className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 rounded-full p-1 hover:bg-red-500 transition-colors"
                      onClick={() => {
                        setCoverImage(null);
                        setCoverPreview(null);
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-500 mb-3" />
                    <p className="text-sm text-gray-400 text-center mb-2">
                      Drag & drop your cover art here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      3000 x 3000 pixels minimum, JPG or PNG
                    </p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      id="cover-upload"
                      onChange={handleCoverChange}
                    />
                    <label 
                      htmlFor="cover-upload" 
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      Select File
                    </label>
                  </>
                )}
              </div>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 transition-colors ${
                  isDraggingAudio 
                    ? 'border-indigo-500 bg-indigo-500 bg-opacity-5' 
                    : 'border-gray-700 hover:border-indigo-500 hover:bg-gray-800'
                }`}
                onDragOver={handleAudioDragOver}
                onDragLeave={handleAudioDragLeave}
                onDrop={handleAudioDrop}
              >
                {audioFile ? (
                  <div className="flex flex-col items-center justify-center w-full">
                    <div className="bg-gray-800 p-4 rounded-lg w-full flex items-center mb-4">
                      <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 truncate">
                        <p className="text-white text-sm truncate">{audioFile.name}</p>
                        <p className="text-gray-400 text-xs">
                          {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => setAudioFile(null)}
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <audio 
                      controls 
                      className="w-full"
                      src={URL.createObjectURL(audioFile)}
                    />
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-500 mb-3" />
                    <p className="text-sm text-gray-400 text-center mb-2">
                      Drag & drop your audio file here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      WAV or FLAC, 16 bit / 44.1 kHz or higher
                    </p>
                    <input 
                      type="file" 
                      accept="audio/*" 
                      className="hidden" 
                      id="audio-upload"
                      onChange={handleAudioChange}
                    />
                    <label 
                      htmlFor="audio-upload" 
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      Select File
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Track Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                  Track Title
                </label>
                <input 
                  type="text" 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter track title"
                />
              </div>
              
              <div>
                <label htmlFor="artist" className="block text-sm font-medium text-gray-400 mb-1">
                  Artist Name
                </label>
                <input 
                  type="text" 
                  id="artist" 
                  value={artist} 
                  onChange={(e) => setArtist(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter artist name"
                />
              </div>
              
              <div>
                <label htmlFor="album" className="block text-sm font-medium text-gray-400 mb-1">
                  Album/EP (Optional)
                </label>
                <input 
                  type="text" 
                  id="album" 
                  value={album} 
                  onChange={(e) => setAlbum(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter album name if applicable"
                />
              </div>
              
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-400 mb-1">
                  Genre
                </label>
                <select 
                  id="genre" 
                  value={genre} 
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a genre</option>
                  <option value="pop">Pop</option>
                  <option value="rock">Rock</option>
                  <option value="hiphop">Hip Hop</option>
                  <option value="rnb">R&B</option>
                  <option value="electronic">Electronic</option>
                  <option value="jazz">Jazz</option>
                  <option value="classical">Classical</option>
                  <option value="country">Country</option>
                  <option value="folk">Folk</option>
                  <option value="metal">Metal</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="release-date" className="block text-sm font-medium text-gray-400 mb-1">
                  Release Date
                </label>
                <input 
                  type="date" 
                  id="release-date" 
                  value={releaseDate} 
                  onChange={(e) => setReleaseDate(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Explicit Content?
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="explicit" 
                      value="no" 
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 bg-gray-800 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 text-white">No</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="explicit" 
                      value="yes" 
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 bg-gray-800 rounded"
                    />
                    <span className="ml-2 text-white">Yes</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Distribution Options</h2>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Select Platforms</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {platforms.map(platform => (
                  <div 
                    key={platform.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      platform.selected 
                        ? 'border-indigo-500 bg-indigo-500 bg-opacity-5' 
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => togglePlatform(platform.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={platform.logo} 
                            alt={platform.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-white">{platform.name}</span>
                      </div>
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                        platform.selected ? 'bg-indigo-500' : 'border border-gray-600'
                      }`}>
                        {platform.selected && <Check className="h-3 w-3 text-white" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Monetization Options</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 bg-gray-800 rounded"
                    defaultChecked
                  />
                  <span className="ml-2 text-white">Enable monetization on all platforms</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 bg-gray-800 rounded"
                    defaultChecked
                  />
                  <span className="ml-2 text-white">Allow for use in user-generated content</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 bg-gray-800 rounded"
                  />
                  <span className="ml-2 text-white">Make available for sync licensing opportunities</span>
                </label>
              </div>
            </div>
            
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Distribution Agreement</h3>
              <p className="text-sm text-gray-400 mb-3">
                By proceeding with this release, you confirm that:
              </p>
              <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
                <li>You own or have licensed all rights to this content</li>
                <li>This release doesn't infringe on anyone else's rights</li>
                <li>The content complies with all platform guidelines</li>
                <li>You accept our distribution terms and service agreement</li>
              </ul>
              <label className="flex items-center mt-4">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 bg-gray-800 rounded"
                  required
                />
                <span className="ml-2 text-white text-sm">I agree to the terms and conditions</span>
              </label>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Upload Successful!</h2>
            <p className="text-gray-400 mb-6">
              Your track has been uploaded and is being processed. 
              We'll notify you when it's ready for distribution.
            </p>
            
            <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-white mb-4">Release Details</h3>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-gray-400 text-sm">Track Title:</p>
                  <p className="text-white">{title || "Untitled Track"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Artist:</p>
                  <p className="text-white">{artist || "Unknown Artist"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Release Date:</p>
                  <p className="text-white">{releaseDate || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status:</p>
                  <p className="text-yellow-400">Processing</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={() => window.location.reload()}
              >
                Upload Another Track
              </button>
              <button 
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                onClick={() => window.location.href = '/status'}
              >
                View Release Status
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
      {currentStep < 4 && (
        <div className="p-4 sm:p-6 bg-gray-800 border-b border-gray-700">
          <div className="flex justify-between">
            <div className="flex space-x-2">
              {[1, 2, 3].map(step => (
                <div 
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step < currentStep 
                      ? 'bg-indigo-500 text-white' 
                      : step === currentStep 
                        ? 'bg-indigo-500 bg-opacity-20 text-indigo-400 border border-indigo-500' 
                        : 'bg-gray-700 text-gray-500'
                  }`}
                >
                  {step < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              Step {currentStep} of 3
            </div>
          </div>
        </div>
      )}
      
      <div className="p-6">
        {isUploading ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-white mb-4">Uploading Your Track</h3>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
              <div 
                className="bg-indigo-500 h-4 rounded-full transition-all duration-200 ease-in-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-400">
              {uploadProgress < 100 
                ? 'Please wait while we upload your track...' 
                : 'Upload complete! Finalizing...'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            {currentStep < 4 && (
              <div className="mt-8 flex justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    disabled={(currentStep === 1 && (!coverImage || !audioFile))}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Submit Release
                  </button>
                )}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default UploadSong;