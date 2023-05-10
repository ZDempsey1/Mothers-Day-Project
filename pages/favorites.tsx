import Navbar from '@/components/Navbar';
import useFavorites from '@/hooks/useFavorites';
import React from 'react';
import FlowerList from '@/components/FlowerList';


function FavoritesIndex() {

    const { data: favorites = [] } = useFavorites()
    return (
        <div className='flex flex-col'>
        <Navbar />
        <div className="mt-20">
        <FlowerList name="Favorite Plants" data={favorites} />
        </div>
        </div>
    )
}

export default FavoritesIndex;
