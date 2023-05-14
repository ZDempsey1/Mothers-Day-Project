// import Navbar from '@/components/Navbar';
// import useFavorites from '@/hooks/useFavorites';
// import React from 'react';
// import FlowerList from '@/components/FlowerList';

// const FavoritesIndex = () => {
//     const { data: favorites = [] } = useFavorites();

//     return (
//         <div className="flex flex-col">
//         <Navbar />
//         <div className="mt-20">
//             <FlowerList name="Favorite Plants" data={favorites} />
//         </div>
//         </div>
//     );
// };

// export default FavoritesIndex;

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import useFavorites from '@/hooks/useFavorites';
import FlowerList from '@/components/FlowerList';
import { FlowerInterface } from '@/types/index';

const FavoritesIndex = () => {
  const { data: favorites = [] } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredFavorites = favorites.filter((flower: FlowerInterface) => {
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
    <div className="flex flex-col">
      <Navbar />
      <div className="mt-20">
        <FlowerList
          name="Favorite Plants"
          data={filteredFavorites}
          renderHeader={() => (
            <input
              type="text"
              placeholder="Search your favorites by common/botanical name, plant type, or plant family."
              value={searchTerm}
              onChange={handleSearchChange}
              className="your-input-class mb-10 mt-3"
              style={{
                height: '40px',
                width: '100%',
                maxWidth: '660px',
                padding: '8px',
                boxSizing: 'border-box',
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default FavoritesIndex;
