import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Heart, Share2, MapPin, Clock, Star, User, Package, Shield } from 'lucide-react';

const ProductDetailPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    id: 1,
    title: "Vintage Leather Jacket",
    description: "Beautiful vintage leather jacket in excellent condition. This classic piece features genuine leather construction with a timeless design that never goes out of style. Perfect for casual wear or adding an edge to any outfit.",
    fullDescription: "This stunning vintage leather jacket is a true wardrobe staple. Crafted from premium genuine leather, it features a classic biker-style design with asymmetrical zip closure, multiple pockets, and adjustable waist belt. The jacket has a soft, supple feel and beautiful patina that only improves with age.\n\nDetails:\n- Material: 100% Genuine Leather\n- Color: Rich Brown\n- Size: Medium (fits true to size)\n- Condition: Excellent (9/10)\n- Brand: Classic Vintage\n- Era: 1990s\n- Care: Professional leather cleaning recommended\n\nThis jacket has been stored in a smoke-free environment and comes from a pet-free home. It's perfect for anyone looking to add a timeless piece to their wardrobe.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop&sat=-100"
    ],
    pointsRequired: 150,
    availability: "available",
    condition: "Excellent",
    category: "Fashion",
    tags: ["vintage", "leather", "jacket", "brown", "medium"],
    uploadedDate: "2024-01-15",
    uploader: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b890?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      totalItems: 45,
      joinedDate: "2023-03-15",
      verified: true,
      location: "New York, NY"
    }
  };

  const previousListings = [
    { id: 1, title: "Vintage Camera", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop" },
    { id: 2, title: "Designer Handbag", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=200&fit=crop" },
    { id: 3, title: "Leather Boots", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=200&fit=crop" },
    { id: 4, title: "Wooden Guitar", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop" },

  ];

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'unavailable': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available': return 'Available for Swap';
      case 'pending': return 'Swap Pending';
      case 'unavailable': return 'No Longer Available';
      default: return 'Unknown';
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">
                Screen 7
              </div>
              <h1 className="text-xl font-semibold">Product Detail Page</h1>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={product.images[selectedImageIndex]} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                <button 
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {product.images.length}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-2 rounded-full transition-all ${
                        isWishlisted ? 'bg-red-50 text-red-600' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(product.availability)}`}>
                    {getAvailabilityText(product.availability)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Condition: <span className="font-medium">{product.condition}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Full Item Description</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.fullDescription}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Uploader Information</h3>
                <div className="flex items-center gap-3">
                  <img 
                    src={product.uploader.avatar} 
                    alt={product.uploader.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{product.uploader.name}</h4>
                      {product.uploader.verified && (
                        <Shield className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.uploader.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        <span>{product.uploader.totalItems} items</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{product.uploader.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.availability !== 'available'}
                >
                  Swap Request
                </button>
                <button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.availability !== 'available'}
                >
                  Redeem via Points ({product.pointsRequired} Points)
                </button>
              </div>

              <div className="text-sm text-gray-500 border-t pt-4">
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Listed on {new Date(product.uploadedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>Member since {new Date(product.uploader.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t p-6">
            <h3 className="text-lg font-semibold mb-6">Previous Listings:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {previousListings.map((listing) => (
                <div key={listing.id} className="group cursor-pointer">
                  <div className="bg-gray-100 rounded-lg overflow-hidden h-48 hover:shadow-md transition-all">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-sm text-gray-700 mt-2 font-medium">{listing.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;