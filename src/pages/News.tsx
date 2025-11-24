import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Star, 
  Heart, 
  TrendingUp, 
  Calendar, 
  Clock, 
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Gift,
  Award,
  Users,
  Zap,
  Plus,
  Filter,
  Search,
  Clock3,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockPerfumes } from "@/data/mockPerfumes";
import { PerfumeCard } from "@/components/PerfumeCard";
import woodyImage from "@/assets/woody.webp";
import freshSpicyImage from "@/assets/freshspicy.webp";
import floralImage from "@/assets/floral.webp";
import amberImage from "@/assets/amber.webp";
import pro1Image from "@/assets/pro1.png";
import pro2Image from "@/assets/pro2.png";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const News = () => {
  useScrollToTop();
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [showFilters, setShowFilters] = useState(false);

  // Filter perfumes to show only ones marked as "new"
  const newPerfumes = mockPerfumes.filter(perfume => perfume.isNew === true);
  const featuredNewPerfumes = newPerfumes.slice(0, 6);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredNewPerfumes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, featuredNewPerfumes.length]);

  // Hero image navigation functions
  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % 2);
  };

  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + 2) % 2);
  };

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedItems(newLiked);
  };

  const categories = [
            { value: "male", label: "Male Fragrances" },
            { value: "female", label: "Female Fragrances" },
    { value: "unisex", label: "Unisex Fragrances" },
    { value: "limited", label: "Limited Edition" },
  ];

  const trendingNotes = [
    { name: "Woody Notes", trend: "+45%", src: woodyImage, color: "bg-amber-500" },
    { name: "Fresh Spicy", trend: "+32%", src: freshSpicyImage, color: "bg-red-500" }, 
    { name: "Floral Bouquets", trend: "+28%", src: floralImage, color: "bg-pink-500" },
    { name: "Amber & Vanilla", trend: "+38%", src: amberImage, color: "bg-yellow-500" },
  ];

  const filteredPerfumes = newPerfumes.filter(perfume => {
    const matchesSearch = perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         perfume.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'none' || perfume.gender === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? 'none' : category);
  };

  // Helper function to check if a category filter is active
  const isCategoryActive = (category: string) => {
    return selectedCategory === category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#AF8F5C]/5 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#AF8F5C]/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <Badge className="bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-800 border-0 font-bold text-base px-4 py-1">
                New Arrivals
              </Badge>
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
            
            {/* Hero Images */}
            <div className="relative h-96 mb-8 overflow-hidden rounded-2xl">
              <div className="absolute inset-0">
                <img 
                  src={currentHeroImage === 0 ? pro1Image : pro2Image} 
                  alt={currentHeroImage === 0 ? "New Perfume Collection" : "Latest Fragrances"} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevHeroImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextHeroImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <button
                  onClick={() => setCurrentHeroImage(0)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentHeroImage === 0 ? 'bg-white' : 'bg-white/50'}`}
                  aria-label="Go to first image"
                ></button>
                <button
                  onClick={() => setCurrentHeroImage(1)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentHeroImage === 1 ? 'bg-white' : 'bg-white/50'}`}
                  aria-label="Go to second image"
                ></button>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              New Perfumes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the latest fragrances and newest arrivals in our exclusive collection
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card border border-[#AF8F5C]/20 rounded-lg p-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search new perfumes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 h-12"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Gender Filters */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex flex-wrap gap-3">
                                                                                                                       <Button
                   variant={isCategoryActive('male') ? "default" : "outline"}
                   size="sm"
                   onClick={() => toggleCategoryFilter('male')}
                   className={`transition-all duration-200 ${
                     isCategoryActive('male')
                       ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                       : 'hover:bg-blue-600/10 hover:border-blue-600/30'
                   }`}
                 >
                   {isCategoryActive('male') ? '✓ Male' : 'Male'} Fragrances
                 </Button>
                 <Button
                   variant={isCategoryActive('female') ? "default" : "outline"}
                   size="sm"
                   onClick={() => toggleCategoryFilter('female')}
                   className={`transition-all duration-200 ${
                     isCategoryActive('female')
                       ? 'bg-pink-500 text-white border-pink-500 shadow-md' 
                       : 'hover:bg-pink-500/10 hover:border-pink-500/30'
                   }`}
                 >
                   {isCategoryActive('female') ? '✓ Female' : 'Female'} Fragrances
                 </Button>
                 <Button
                   variant={isCategoryActive('unisex') ? "default" : "outline"}
                   size="sm"
                   onClick={() => toggleCategoryFilter('unisex')}
                   className={`transition-all duration-200 ${
                     isCategoryActive('unisex')
                       ? 'bg-purple-600 text-white border-purple-600 shadow-md' 
                       : 'hover:bg-purple-600/10 hover:border-purple-600/30'
                   }`}
                 >
                   {isCategoryActive('unisex') ? '✓ Unisex' : 'Unisex'} Fragrances
                 </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured New Perfumes Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">Featured New Arrivals</h2>
                <p className="text-muted-foreground font-medium">Latest additions to our collection</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="border-yellow-400/40 hover:border-yellow-400 hover:bg-yellow-50"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentSlide(0)}
                  className="border-yellow-400/40 hover:border-yellow-400 hover:bg-yellow-50"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {featuredNewPerfumes.slice(currentSlide, currentSlide + 3).map((perfume, index) => (
                  <Link key={perfume.id} to={`/perfume/${perfume.slug}`}>
                    <Card className="group hover:shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 border-2 border-yellow-400/40 hover:border-yellow-400 bg-gradient-to-br from-yellow-50/50 to-amber-50/30 cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-800 font-bold">
                              {perfume.gender}
                            </Badge>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">
                              NEW
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLike(perfume.id);
                            }}
                            className={`p-1 h-auto ${likedItems.has(perfume.id) ? 'text-red-500' : 'text-muted-foreground'}`}
                          >
                            <Heart className={`w-4 h-4 ${likedItems.has(perfume.id) ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="font-semibold mb-2 group-hover:text-amber-600 transition-colors">
                          {perfume.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 font-medium">{perfume.brand}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {perfume.notes.slice(0, 3).map((note) => (
                            <Badge key={note} variant="outline" className="text-xs border-amber-400/60 text-amber-700">
                              {note}
                            </Badge>
                          ))}
                        </div>
                        <Button className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-800 font-bold">
                          View Details <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {featuredNewPerfumes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Notes Section */}
      <section className="py-16 bg-gradient-to-r from-[#AF8F5C]/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Trending Notes in New Perfumes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingNotes.map((trend, index) => (
                <motion.div
                  key={trend.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300 border-[#AF8F5C]/20 hover:border-[#AF8F5C]/40">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-3">
                        <img src={trend.src} alt={trend.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <h3 className="font-semibold mb-2">{trend.name}</h3>
                      <div className="flex items-center justify-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-500 font-semibold">{trend.trend}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* All New Perfumes Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">All New Perfumes</h2>
                <p className="text-muted-foreground">
                  Showing {filteredPerfumes.length} of {newPerfumes.length} new arrivals
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 className="w-5 h-5 text-[#AF8F5C]" />
                <span className="text-sm text-muted-foreground">Updated daily</span>
              </div>
            </div>

            {filteredPerfumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPerfumes.map((perfume, index) => (
                  <motion.div
                    key={perfume.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="relative"
                  >
                    <PerfumeCard perfume={perfume} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No new perfumes found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                                                   <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("none");
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-[#AF8F5C]/10 to-[#AF8F5C]/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <Gift className="w-12 h-12 mx-auto mb-4 text-[#AF8F5C]" />
            <h2 className="text-3xl font-bold mb-4">Be the First to Know</h2>
            <p className="text-muted-foreground mb-8">
              Get notified about new perfume releases, exclusive launches, and special offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-[#AF8F5C]/20 focus:border-[#AF8F5C] focus:ring-[#AF8F5C]/20 outline-none"
              />
              <Button className="bg-[#AF8F5C] hover:bg-[#AF8F5C]/90 text-white">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default News; 