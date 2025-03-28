
import React from 'react';

interface MobileSearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MobileSearchInput = ({ searchQuery, setSearchQuery }: MobileSearchInputProps) => {
  return (
    <div className="mb-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Buscar..."
          className="rounded-md bg-secondary/70 pl-9 pr-4 py-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MobileSearchInput;
