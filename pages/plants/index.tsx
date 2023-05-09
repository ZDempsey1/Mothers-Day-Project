import React, { useState } from 'react';
import FlowerList from '@/components/FlowerList';
import useFlowerList from '@/hooks/useFlowerList';
import Navbar from '@/components/Navbar';

const PlantsIndex = () => {
  const { data: flowers = [] } = useFlowerList();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFlowers = flowers.filter((flower) =>
    flower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col pb-40">
      <Navbar />
      <div className="mt-8">
        <FlowerList
          name="Trending Now"
          data={filteredFlowers}
          renderHeader={() => (
            <input
              type="text"
              placeholder="Search for plants..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="your-input-class"
            />
          )}
        />
      </div>
    </div>
  );
};
export default PlantsIndex;
