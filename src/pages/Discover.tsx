import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PerfumeCard } from '../components/PerfumeCard';
import { mockPerfumes, getBrands } from '../data/mockPerfumes';
import { FilterOptions, Gender, NoteType } from '../types/perfume';
import { useSearchParams } from 'react-router-dom';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useFilters } from '../contexts/FilterContext';

const noteOptions: NoteType[] = [
  'woody', 'sweet', 'spicy', 'citrus', 'fresh', 'floral', 'white floral', 'amber', 'musky', 'powdery', 
  'vanilla', 'aromatic', 'fresh spicy', 'warm spicy', 'leather', 'fruity', 'green', 'patchouli', 'rose', 
  'iris', 'earthy', 'animalic', 'oud', 'smoky', 'tobacco', 'honey', 'cinnamon', 'almond', 'cherry', 
  'nutty', 'balsamic', 'rum', 'mineral', 'ozonic', 'aquatic', 'marine', 'soapy', 'tropical', 'coconut', 
  'salty', 'caramel', 'chocolate', 'coffee', 'tuberose', 'yellow floral', 'mossy', 'herbal', 'sand', 
  'violet', 'cacao', 'anis', 'lactonic', 'aldehydic', 'metallic', 'soft spicy', 'lavender', 'saffron', 
  'neroli', 'black pepper', 'mandarin', 'pepper', 'sage', 'cardamom', 'black currant', 'tea', 'bergamot'
];
const genderOptions: (Gender | 'all')[] = ['all', 'male', 'female', 'unisex'];

export function Discover() {
  useScrollToTop();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const filtersContext = useFilters();

  // Use context if available, otherwise use local state (fallback)
  const [localFilters, setLocalFilters] = useState<FilterOptions>({
    gender: 'none',
    notes: [],
    brand: 'all',
    search: urlSearch,
  });
  const [localSize100ml, setLocalSize100ml] = useState(false);
  const [localNicheFilter, setLocalNicheFilter] = useState(false);
  const [localNewPerfumes, setLocalNewPerfumes] = useState(false);

  const filters = filtersContext?.filters || localFilters;
  const setFilters = filtersContext?.setFilters || setLocalFilters;
  const size100ml = filtersContext?.size100ml ?? localSize100ml;
  const setSize100ml = filtersContext?.setSize100ml || setLocalSize100ml;
  const nicheFilter = filtersContext?.nicheFilter ?? localNicheFilter;
  const setNicheFilter = filtersContext?.setNicheFilter || setLocalNicheFilter;
  const newPerfumes = filtersContext?.newPerfumes ?? localNewPerfumes;
  const setNewPerfumes = filtersContext?.setNewPerfumes || setLocalNewPerfumes;

  const [showFilters, setShowFilters] = useState(false);
  const [expandedBrands, setExpandedBrands] = useState<string[]>([]);
  const brands = getBrands();

  // Update filters when URL changes
  useEffect(() => {
    if (urlSearch !== filters.search) {
      if (filtersContext) {
        filtersContext.updateFilter('search', urlSearch);
      } else {
        setLocalFilters(prev => ({ ...prev, search: urlSearch }));
      }
    }
  }, [urlSearch]);

  const filteredPerfumes = useMemo(() => {
    return mockPerfumes.filter(perfume => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesName = perfume.name.toLowerCase().includes(searchTerm);
        const matchesBrand = perfume.brand.toLowerCase().includes(searchTerm);
        const matchesNotes = perfume.notes.some(note => note.toLowerCase().includes(searchTerm));
        
        if (!matchesName && !matchesBrand && !matchesNotes) {
          return false;
        }
      }

      // Gender filter
      if (filters.gender !== 'none') {
        if (filters.gender === 'male' && perfume.gender !== 'male' && perfume.gender !== 'unisex') {
          return false;
        }
        if (filters.gender === 'female' && perfume.gender !== 'female' && perfume.gender !== 'unisex') {
          return false;
        }
        if (filters.gender === 'unisex' && perfume.gender !== 'unisex') {
          return false;
        }
      }

      // Notes filter - intersection logic (all selected notes must be present)
      if (filters.notes.length > 0 && !filters.notes.every(note => perfume.notes.includes(note))) {
        return false;
      }

      // Brand filter
      if (filters.brand && filters.brand !== 'all' && perfume.brand !== filters.brand) {
        return false;
      }

      // Niche filter
      if (nicheFilter && !perfume.isNiche) {
        return false;
      }

      // 100ml filter
      if (size100ml && !perfume.is100ml) {
        return false;
      }

      // New perfumes filter
      if (newPerfumes && !perfume.isNew) {
        return false;
      }

      return true;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [filters, nicheFilter, size100ml, newPerfumes]);

  // Group perfumes by brand and sort alphabetically
  const perfumesByBrand = useMemo(() => {
    const grouped: { [key: string]: typeof filteredPerfumes } = {};
    filteredPerfumes.forEach(perfume => {
      if (!grouped[perfume.brand]) {
        grouped[perfume.brand] = [];
      }
      grouped[perfume.brand].push(perfume);
    });
    
    // Sort brands alphabetically
    const sortedBrands = Object.keys(grouped).sort((a, b) => a.localeCompare(b));
    const sortedGrouped: { [key: string]: typeof filteredPerfumes } = {};
    
    sortedBrands.forEach(brand => {
      sortedGrouped[brand] = grouped[brand];
    });
    
    return sortedGrouped;
  }, [filteredPerfumes]);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    if (filtersContext) {
      filtersContext.updateFilter(key, value);
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
    
    // Update URL for search
    if (key === 'search') {
      if (value) {
        setSearchParams({ search: value });
      } else {
        setSearchParams({});
      }
    }
  };

  const toggleGenderFilter = filtersContext?.toggleGenderFilter || ((gender: Gender) => {
    setFilters(prev => ({
      ...prev,
      gender: prev.gender === gender ? 'none' : gender
    }));
  });

  // Helper function to check if a gender filter is active
  const isGenderActive = filtersContext?.isGenderActive || ((gender: Gender) => {
    return filters.gender === gender;
  });

  const toggleNote = (note: NoteType) => {
    setFilters(prev => ({
      ...prev,
      notes: prev.notes.includes(note)
        ? prev.notes.filter(n => n !== note)
        : [...prev.notes, note]
    }));
  };

  const toggleBrand = (brand: string) => {
    setExpandedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    if (filtersContext) {
      filtersContext.setFilters({
        gender: 'none',
        notes: [],
        brand: 'all',
        search: '',
      });
      filtersContext.setSize100ml(false);
      filtersContext.setNicheFilter(false);
      filtersContext.setNewPerfumes(false);
    } else {
      setFilters({
        gender: 'none',
        notes: [],
        brand: 'all',
        search: '',
      });
      setSize100ml(false);
      setNicheFilter(false);
      setNewPerfumes(false);
    }
    setSearchParams({});
  };

  const hasActiveFilters = filters.notes.length > 0 || (filters.brand && filters.brand !== 'all') || filters.search || size100ml || nicheFilter || newPerfumes;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-2 animate-fade-in">
        </div>

        {/* Search and Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-slide-up">
          <div className="relative flex-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-lg p-[2px] animate-pulse">
                <div className="bg-background rounded-lg h-full"></div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                <Input
                  placeholder="Search by name, brand, or notes..."
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="pl-10 h-12 relative z-10 bg-transparent border-0 focus:ring-0 focus:ring-offset-0"
                />
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {Object.values(filters).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length}
              </Badge>
            )}
          </Button>
        </div>


        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-card border rounded-lg animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <Select value={filters.gender} onValueChange={(value) => updateFilter('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Genders" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map(gender => (
                      <SelectItem key={gender} value={gender}>
                        {gender === 'all' ? 'All Genders' : gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">- Inspired by Brand (For reference use only)</label>
                <Select value={filters.brand} onValueChange={(value) => updateFilter('brand', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Inspired by Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Inspired by Brands</SelectItem>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes Filter */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-2">Main Accords (Notes)</label>
                <div className="space-y-4">
                  {/* Popular Notes */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Popular</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['woody', 'sweet', 'floral', 'fresh', 'citrus', 'musky', 'vanilla', 'aromatic', 'fresh citrus'] as NoteType[]).map(note => (
                        <Badge
                          key={note}
                          variant={filters.notes.includes(note) ? "default" : "outline"}
                          className={`cursor-pointer capitalize transition-colors ${
                            filters.notes.includes(note) 
                              ? 'bg-[#AF8F5C] text-white border-[#AF8F5C]' 
                              : 'hover:bg-[#AF8F5C]/10 hover:border-[#AF8F5C]/30'
                          }`}
                          onClick={() => toggleNote(note)}
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Spicy Notes */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Spicy</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['spicy', 'fresh spicy', 'warm spicy', 'soft spicy', 'cinnamon', 'black pepper', 'pepper', 'cardamom', 'saffron'] as NoteType[]).map(note => (
                        <Badge
                          key={note}
                          variant={filters.notes.includes(note) ? "default" : "outline"}
                          className={`cursor-pointer capitalize transition-colors ${
                            filters.notes.includes(note) 
                              ? 'bg-[#AF8F5C] text-white border-[#AF8F5C]' 
                              : 'hover:bg-[#AF8F5C]/10 hover:border-[#AF8F5C]/30'
                          }`}
                          onClick={() => toggleNote(note)}
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Floral Notes */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Floral</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['floral', 'white floral', 'rose', 'iris', 'yellow floral', 'tuberose', 'violet', 'neroli', 'lavender'] as NoteType[]).map(note => (
                        <Badge
                          key={note}
                          variant={filters.notes.includes(note) ? "default" : "outline"}
                          className={`cursor-pointer capitalize transition-colors ${
                            filters.notes.includes(note) 
                              ? 'bg-[#AF8F5C] text-white border-[#AF8F5C]' 
                              : 'hover:bg-[#AF8F5C]/10 hover:border-[#AF8F5C]/30'
                          }`}
                          onClick={() => toggleNote(note)}
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Fruity & Gourmand */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Fruity & Gourmand</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['fruity', 'cherry', 'mandarin', 'black currant', 'tropical', 'coconut', 'caramel', 'chocolate', 'coffee', 'honey', 'almond', 'nutty', 'cacao'] as NoteType[]).map(note => (
                        <Badge
                          key={note}
                          variant={filters.notes.includes(note) ? "default" : "outline"}
                          className={`cursor-pointer capitalize transition-colors ${
                            filters.notes.includes(note) 
                              ? 'bg-[#AF8F5C] text-white border-[#AF8F5C]' 
                              : 'hover:bg-[#AF8F5C]/10 hover:border-[#AF8F5C]/30'
                          }`}
                          onClick={() => toggleNote(note)}
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Amber & Resinous */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Amber & Resinous</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['amber', 'myrrh', 'balsamic', 'rum'] as NoteType[]).map(note => (
                        <Badge
                          key={note}
                          variant={filters.notes.includes(note) ? "default" : "outline"}
                          className={`cursor-pointer capitalize transition-colors ${
                            filters.notes.includes(note) 
                              ? 'bg-[#AF8F5C] text-white border-[#AF8F5C]' 
                              : 'hover:bg-[#AF8F5C]/10 hover:border-[#AF8F5C]/30'
                          }`}
                          onClick={() => toggleNote(note)}
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Earthy & Woody */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Earthy & Woody</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['earthy', 'patchouli', 'oud', 'leather', 'tobacco', 'smoky', 'mossy', 'herbal', 'sage', 'tea', 'bergamot', 'vetiver'] as NoteType[]).map(note => (
                        <Badge
                          key={note}
                          variant={filters.notes.includes(note) ? "default" : "outline"}
                          className={`cursor-pointer capitalize transition-colors ${
                            filters.notes.includes(note) 
                              ? 'bg-[#AF8F5C] text-white border-[#AF8F5C]' 
                              : 'hover:bg-[#AF8F5C]/10 hover:border-[#AF8F5C]/30'
                          }`}
                          onClick={() => toggleNote(note)}
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Aquatic & Fresh */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Aquatic & Fresh</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['aquatic', 'marine', 'ozonic', 'mineral', 'soapy', 'salty', 'green', 'anis', 'cannabis'] as NoteType[]).map(note => (
                        <Badge
                          key={note}
                          variant={filters.notes.includes(note) ? "default" : "outline"}
                          className={`cursor-pointer capitalize transition-colors ${
                            filters.notes.includes(note) 
                              ? 'bg-[#AF8F5C] text-white border-[#AF8F5C]' 
                              : 'hover:bg-[#AF8F5C]/10 hover:border-[#AF8F5C]/30'
                          }`}
                          onClick={() => toggleNote(note)}
                        >
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Other Notes */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Other</h4>
                <div className="flex flex-wrap gap-2">
                      {(['powdery', 'animalic', 'lactonic', 'aldehydic', 'metallic', 'sand'] as NoteType[]).map(note => (
                    <Badge
                      key={note}
                      variant={filters.notes.includes(note) ? "default" : "outline"}
                      className={`cursor-pointer capitalize transition-colors ${
                        filters.notes.includes(note) 
                              ? 'bg-[#AF8F5C] text-white border-[#AF8F5C]' 
                              : 'hover:bg-[#AF8F5C]/10 hover:border-[#AF8F5C]/30'
                      }`}
                      onClick={() => toggleNote(note)}
                    >
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t">
                <Button onClick={clearFilters} variant="outline" size="sm">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 animate-slide-up">
          <div>
            <p className="text-muted-foreground">
              Showing {filteredPerfumes.length} perfume{filteredPerfumes.length !== 1 ? 's' : ''} in {Object.keys(perfumesByBrand).length} brand{Object.keys(perfumesByBrand).length !== 1 ? 's' : ''}
            </p>
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-2">
                {filters.gender !== 'all' && filters.gender !== 'none' && (
                  <Badge variant="secondary" className="capitalize">
                    {filters.gender}
                  </Badge>
                )}
                {filters.brand && filters.brand !== 'all' && (
                  <Badge variant="secondary">
                    {filters.brand}
                  </Badge>
                )}
                {size100ml && (
                  <Badge variant="secondary">
                    100ml
                  </Badge>
                )}
                {nicheFilter && (
                  <Badge variant="secondary">
                    Niche
                  </Badge>
                )}
                {newPerfumes && (
                  <Badge variant="secondary">
                    New
                  </Badge>
                )}
                {filters.notes.map(note => (
                  <Badge key={note} variant="secondary" className="capitalize">
                    {note}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Accordion Brands */}
        {Object.keys(perfumesByBrand).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(perfumesByBrand).map(([brand, perfumes], brandIndex) => {
              const isExpanded = expandedBrands.includes(brand);
              return (
                <div key={brand} className="border rounded-lg overflow-hidden animate-fade-in" style={{ animationDelay: `${brandIndex * 0.1}s` }}>
                  {/* Brand Header */}
                  <button
                    onClick={() => toggleBrand(brand)}
                    className="w-full p-3 bg-card hover:bg-accent/50 transition-colors flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{brand}</h3>
                        <p className="text-sm text-muted-foreground">
                          {perfumes.length} perfume{perfumes.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Brand Perfumes */}
                  {isExpanded && (
                    <div className="border-t bg-background">
                      <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {perfumes.map((perfume, index) => (
              <div 
                key={perfume.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <PerfumeCard perfume={perfume} />
              </div>
            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-montserrat text-xl font-semibold mb-2">No perfumes found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}