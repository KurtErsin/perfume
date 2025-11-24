import { Link } from 'react-router-dom';
import { SprayCan, Star, Search, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { PerfumeCard } from '../components/PerfumeCard';
import { mockPerfumes } from '../data/mockPerfumes';
import heroImage from '../assets/mban1.webp';
import { useState } from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';

export function Home() {
  useScrollToTop();
  
  const featuredPerfumes = mockPerfumes.slice(0, 4);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/discover?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in">
          
            
            <h1 className="font-montserrat text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight ">
              Discover Your
              <span className="block" style={{ color: '#AF8F5C' }}>Perfect Scent</span>
            </h1>
            
            <p className="text-md text-muted-foreground mb-8 leading-relaxed">
              Explore our curated collection of luxury perfumes from the world's most prestigious brands. 
              Find fragrances that match your personality and style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                asChild 
                className="text-lg px-8 py-4 border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/discover">Browse by Category</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        
        
      </section>

      {/* Search Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#AF8F5C]/5 to-[#AF8F5C]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find Your Perfect Fragrance
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Search by brand, name, or notes to discover your ideal scent
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
                <Input
                  placeholder="Search for perfumes, brands, or notes (e.g., Chanel, woody, fresh)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 h-16 text-lg border-2 border-[#AF8F5C]/20 focus:border-[#AF8F5C] focus:ring-[#AF8F5C]/20 rounded-xl shadow-lg"
                />
                <Button 
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#AF8F5C] hover:bg-[#AF8F5C]/90 text-white px-6 py-2 rounded-lg"
                >
                  Search
                </Button>
              </div>
              
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="text-sm text-muted-foreground">Popular searches:</span>
                {['Chanel', 'Dior', 'woody', 'fresh', 'sweet'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      setTimeout(() => handleSearch(), 100);
                    }}
                    className="text-sm px-3 py-1 bg-[#AF8F5C]/10 text-[#AF8F5C] rounded-full hover:bg-[#AF8F5C]/20 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Fragrances
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our premium collection, 
              featuring the most beloved and iconic scents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredPerfumes.map((perfume, index) => (
              <div 
                key={perfume.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PerfumeCard perfume={perfume} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" className="text-lg px-8 py-3">
              <Link to="/discover" className="flex items-center gap-2">
                View All Fragrances
                <ArrowRight className="w-5 h-5" /> 
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4">
                <SprayCan className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-3">Premium Collection</h3>
              <p className="text-muted-foreground">
                Curated selection of the world's finest fragrances from prestigious brands.
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-3">Expert Curation</h3>
              <p className="text-muted-foreground">
                Each fragrance carefully selected by our perfume experts and enthusiasts.
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold mb-3">Easy Discovery</h3>
              <p className="text-muted-foreground">
                Advanced search and filtering to help you find your perfect match.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}