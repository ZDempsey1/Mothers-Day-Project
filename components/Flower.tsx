import React from 'react';

import { FlowerInterface } from '@/types';
import FlowerCard from '@/components/FlowerCard';
import { isEmpty } from 'lodash';

interface FlowerProps {
    data: FlowerInterface[];
    name: string;
}

const Flower: React.FC<FlowerProps> = ({ data, name }) => {
    if (isEmpty(data)) {
        return null;
    }

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
        <div>
            <p className="text-black text-md md:text-xl lg:text-2xl font-semibold mb-4">{name}</p>
            <div className="grid grid-cols-4 gap-2">
            {data.map((flower) => (
                <FlowerCard key={flower.id} data={flower} />
            ))}
            </div>
        </div>
        </div>
    );
}

export default Flower;
