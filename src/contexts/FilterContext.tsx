import { createContext, useContext, useState, ReactNode } from 'react';
import { FilterOptions, Gender } from '../types/perfume';

interface FilterContextType {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  size100ml: boolean;
  setSize100ml: (value: boolean) => void;
  nicheFilter: boolean;
  setNicheFilter: (value: boolean) => void;
  newPerfumes: boolean;
  setNewPerfumes: (value: boolean) => void;
  toggleGenderFilter: (gender: Gender) => void;
  isGenderActive: (gender: Gender) => boolean;
  updateFilter: (key: keyof FilterOptions, value: any) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterOptions>({
    gender: 'none',
    notes: [],
    brand: 'all',
    search: '',
  });
  const [size100ml, setSize100ml] = useState(false);
  const [nicheFilter, setNicheFilter] = useState(false);
  const [newPerfumes, setNewPerfumes] = useState(false);

  const toggleGenderFilter = (gender: Gender) => {
    setFilters(prev => ({
      ...prev,
      gender: prev.gender === gender ? 'none' : gender
    }));
  };

  const isGenderActive = (gender: Gender) => {
    return filters.gender === gender;
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        size100ml,
        setSize100ml,
        nicheFilter,
        setNicheFilter,
        newPerfumes,
        setNewPerfumes,
        toggleGenderFilter,
        isGenderActive,
        updateFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  return context; // Return undefined if not in provider (optional)
}

