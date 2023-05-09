import React from 'react';
import Link from 'next/link';
import { FlowerInterface } from '@/types';
import FlowerCard from '@/components/FlowerCard';
import { isEmpty } from 'lodash';

// interface FlowerListProps {
//   data: FlowerInterface[];
//   name: string;
// }

// const FlowerList: React.FC<FlowerListProps> = ({ data, name }) => {
//   if (isEmpty(data)) {
//     return null;
//   }

//   return (
//     <div className="px-4 md:px-12 mt-4 space-y-8">
//       <div>
//         <p className="text-black text-md md:text-xl lg:text-2xl font-semibold mb-4">{name}</p>
//         <div className="grid grid-cols-4 gap-2">
//           {data.map((flower) => (
//             <Link key={flower.id} href={`/plants/${flower.id}`}>
//                 <FlowerCard data={flower} />
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
interface FlowerListProps {
  data: FlowerInterface[];
  name: string;
  renderHeader?: () => React.ReactNode;
}

const FlowerList: React.FC<FlowerListProps> = ({ data, name, renderHeader }) => {

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-black text-md md:text-xl lg:text-2xl font-semibold mb-4">{name}</p>
        {renderHeader && renderHeader()}
        <div className="grid grid-cols-4 gap-2">
        {data.map((flower) => (
            <div key={flower.id}>
                <FlowerCard data={flower} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FlowerList;
