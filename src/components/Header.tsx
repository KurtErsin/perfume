import { Link, useLocation } from 'react-router-dom';
import { SprayCan } from 'lucide-react';
import { Button } from './ui/button';
import logo from '../assets/perfumes/logo.webp';
import { useFilters } from '../contexts/FilterContext';

export function Header() {
  const location = useLocation();
  const isDiscoverPage = location.pathname === '/' || location.pathname === '/discover';
  const filtersContext = useFilters();
  const filters = isDiscoverPage && filtersContext ? filtersContext : null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="PATERMO PERFUMES" className="h-10 md:h-14 w-auto group-hover:scale-105 transition-transform duration-300" />
            </Link>
            <p className="text-[8px] sm:text-[10px] text-[#AF8F5C] font-bold leading-tight">
              Inspired by luxury scents, our products are independently created and not associated with the original brands
            </p>
          </div>

          {isDiscoverPage && filters ? (
            <nav className="hidden md:flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                size="default"
                onClick={() => filters.toggleGenderFilter('male')}
                className={`transition-all duration-300 border-2 text-sm ${
                  filters.isGenderActive('male')
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/30 font-bold' 
                    : 'border-blue-500 hover:border-blue-600 hover:bg-blue-600/10 hover:shadow-md hover:scale-105'
                }`}
              >
                {filters.isGenderActive('male') ? '✓ Male' : 'Male'}
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => filters.toggleGenderFilter('female')}
                className={`transition-all duration-300 border-2 text-sm ${
                  filters.isGenderActive('female')
                    ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white border-transparent shadow-lg shadow-pink-500/30 font-bold' 
                    : 'border-pink-500 hover:border-pink-600 hover:bg-pink-600/10 hover:shadow-md hover:scale-105'
                }`}
              >
                {filters.isGenderActive('female') ? '✓ Female' : 'Female'}
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => filters.toggleGenderFilter('unisex')}
                className={`transition-all duration-300 border-2 text-sm ${
                  filters.isGenderActive('unisex')
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white border-transparent shadow-lg shadow-purple-500/30 font-bold' 
                    : 'border-purple-500 hover:border-purple-600 hover:bg-purple-600/10 hover:shadow-md hover:scale-105'
                }`}
              >
                {filters.isGenderActive('unisex') ? '✓ Unisex' : 'Unisex'}
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => filters.setSize100ml(!filters.size100ml)}
                className={`transition-all duration-300 border-2 text-sm ${
                  filters.size100ml
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-transparent shadow-lg shadow-emerald-500/30 font-bold' 
                    : 'border-emerald-500 hover:border-emerald-600 hover:bg-emerald-600/10 hover:shadow-md hover:scale-105'
                }`}
              >
                {filters.size100ml ? '✓ 100ml' : '100ml'}
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => filters.setNicheFilter(!filters.nicheFilter)}
                className={`transition-all duration-300 border-2 text-sm ${
                  filters.nicheFilter
                    ? 'bg-gradient-to-r from-amber-600 to-orange-500 text-white border-transparent shadow-lg shadow-amber-500/30 font-bold' 
                    : 'border-amber-500 hover:border-amber-600 hover:bg-amber-600/10 hover:shadow-md hover:scale-105'
                }`}
              >
                {filters.nicheFilter ? '✓ Niche' : 'Niche'}
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => filters.setNewPerfumes(!filters.newPerfumes)}
                className={`transition-all duration-300 border-2 text-sm ${
                  filters.newPerfumes
                    ? 'bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-800 border-transparent shadow-lg shadow-yellow-300/40 font-bold' 
                    : 'border-yellow-400 hover:border-yellow-500 hover:bg-yellow-300/20 hover:shadow-md hover:scale-105'
                }`}
              >
                {filters.newPerfumes ? '✓ New' : 'New'}
              </Button>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold' 
                    : 'text-muted-foreground hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent'
                }`}
              >
                Discover
              </Link>
              <Link
                to="/home"
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  isActive('/home') 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-bold' 
                    : 'text-muted-foreground hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent'
                }`}
              >
                Home
              </Link>
              <Link
                to="/news"
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  isActive('/news') 
                    ? 'bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent font-bold' 
                    : 'text-muted-foreground hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-500 hover:bg-clip-text hover:text-transparent'
                }`}
              >
                New Perfumes
              </Link>
            </nav>
          )}

        </div>

        {/* Mobile Navigation */}
        {isDiscoverPage && filters ? (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => filters.toggleGenderFilter('male')}
              className={`transition-all duration-300 border-2 text-xs ${
                filters.isGenderActive('male')
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/30 font-bold' 
                  : 'border-blue-500 hover:border-blue-600 hover:bg-blue-600/10 hover:shadow-md hover:scale-105'
              }`}
            >
              {filters.isGenderActive('male') ? '✓ Male' : 'Male'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => filters.toggleGenderFilter('female')}
              className={`transition-all duration-300 border-2 text-xs ${
                filters.isGenderActive('female')
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white border-transparent shadow-lg shadow-pink-500/30 font-bold' 
                  : 'border-pink-500 hover:border-pink-600 hover:bg-pink-600/10 hover:shadow-md hover:scale-105'
              }`}
            >
              {filters.isGenderActive('female') ? '✓ Female' : 'Female'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => filters.toggleGenderFilter('unisex')}
              className={`transition-all duration-300 border-2 text-xs ${
                filters.isGenderActive('unisex')
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white border-transparent shadow-lg shadow-purple-500/30 font-bold' 
                  : 'border-purple-500 hover:border-purple-600 hover:bg-purple-600/10 hover:shadow-md hover:scale-105'
              }`}
            >
              {filters.isGenderActive('unisex') ? '✓ Unisex' : 'Unisex'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => filters.setSize100ml(!filters.size100ml)}
              className={`transition-all duration-300 border-2 text-xs ${
                filters.size100ml
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-transparent shadow-lg shadow-emerald-500/30 font-bold' 
                  : 'border-emerald-500 hover:border-emerald-600 hover:bg-emerald-600/10 hover:shadow-md hover:scale-105'
              }`}
            >
              {filters.size100ml ? '✓ 100ml' : '100ml'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => filters.setNicheFilter(!filters.nicheFilter)}
              className={`transition-all duration-300 border-2 text-xs ${
                filters.nicheFilter
                  ? 'bg-gradient-to-r from-amber-600 to-orange-500 text-white border-transparent shadow-lg shadow-amber-500/30 font-bold' 
                  : 'border-amber-500 hover:border-amber-600 hover:bg-amber-600/10 hover:shadow-md hover:scale-105'
              }`}
            >
              {filters.nicheFilter ? '✓ Niche' : 'Niche'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => filters.setNewPerfumes(!filters.newPerfumes)}
              className={`transition-all duration-300 border-2 text-xs ${
                filters.newPerfumes
                  ? 'bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-800 border-transparent shadow-lg shadow-yellow-300/40 font-bold' 
                  : 'border-yellow-400 hover:border-yellow-500 hover:bg-yellow-300/20 hover:shadow-md hover:scale-105'
              }`}
            >
              {filters.newPerfumes ? '✓ New' : 'New'}
            </Button>
              </div>
            </nav>
          </div>
        ) : (
          <nav className="md:hidden flex items-center gap-6 mt-4 pt-4 border-t border-border">
            <Link
              to="/"
              className={`font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold' 
                  : 'text-muted-foreground hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent'
              }`}
            >
              Discover
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}