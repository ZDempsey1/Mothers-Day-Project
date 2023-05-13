import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { HeartIcon } from '@heroicons/react/20/solid';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
    flowerId: string;
}

const FavoriteButtonDetails: React.FC<FavoriteButtonProps> = ({ flowerId }) => {
    const { mutate: mutateFavorites } = useFavorites();

    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(flowerId);
    }, [currentUser, flowerId]);

    const toggleFavorites = useCallback(async () => {
        let response;

        if (isFavorite) {
        response = await axios.delete('/api/favorite', { data: { flowerId } });
        } else {
        response = await axios.post('/api/favorite', { flowerId });
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
        ...currentUser,
        favoriteIds: updatedFavoriteIds,
        });
        mutateFavorites();
    }, [flowerId, isFavorite, currentUser, mutate, mutateFavorites]);

    return (
        <div className="flex items-center space-x-1 lg:space-x-2">
        <button
            onClick={toggleFavorites}
            className={`p-2 rounded-full transition-colors ${
            isFavorite ? 'bg-red-500' : 'bg-gray-500'
            } hover:bg-red-600 focus:outline-none focus:bg-red-600`}
        >
            <HeartIcon
            className={`text-white w-6 h-6 lg:w-8 lg:h-8 ${
                isFavorite ? 'text-black' : 'text-gray-200'
            }`}
            />
        </button>
        <button
            onClick={toggleFavorites}
            className="text-black text-xl focus:outline-none "
        >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        </div>
    );
};

export default FavoriteButtonDetails;
