import React, { useState } from 'react';
import FlowerList from '@/components/FlowerList';
import useFlowerList from '@/hooks/useFlowerList';
import Navbar from '@/components/Navbar';
import { FlowerInterface } from '@/types/index';

const PlantsIndex = () => {
  const { data: flowers = [] } = useFlowerList();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredFlowers = flowers.filter((flower: FlowerInterface) => {
    const name = flower.name ? flower.name.toLowerCase() : '';
    const bName = flower.bName ? flower.bName.toLowerCase() : '';
    const family = flower.family ? flower.family.toLowerCase() : '';
    const plantType = flower.plantType ? flower.plantType.toLowerCase() : '';

    return name.includes(searchTerm.toLowerCase()) ||
          bName.includes(searchTerm.toLowerCase()) ||
          family.includes(searchTerm.toLowerCase()) ||
          plantType.includes(searchTerm.toLowerCase());
  });


  return (
    <div className="flex flex-col pb-40">
      <Navbar />
      <div className="mt-20">
        <FlowerList
          name="Entire Plant List- More added daily!"
          data={filteredFlowers}
          renderHeader={() => (
            <input
  type="text"
  placeholder="Search for plants by common/botanical name, plant type, or plant family."
  value={searchTerm}
  onChange={handleSearchChange}
  className="your-input-class"
  style={{ height: '40px', width: "660px", padding: '8px' }}
/>

          )}
        />
      </div>
    </div>
  );
};
export default PlantsIndex;
