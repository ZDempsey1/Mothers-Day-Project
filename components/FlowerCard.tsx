import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FlowerInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface FlowerCardProps {
  data: FlowerInterface;
}

const FlowerCard: React.FC<FlowerCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        src={data.pic1.toString()}
        alt=""
        draggable={false}
        className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-md
          group-hover:opacity-90
          sm:group-hover:opacity-0
          w-full
          h-[12vw]
        "
      />
      <div className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
      ">
        <img
          src={data.pic2.toString()}
          alt=""
          draggable={false}
          className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-t-md
            w-full
            h-[12vw]
          "
        />
        <div className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
        ">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <FavoriteButton flowerId={data.id} />
            </div>
            <Link href={`/plants/${data.id}`}>
              <div className="flex items-center cursor-pointer text-white">
                <InformationCircleIcon className="w-4 md:w-7 mr-1" />
                More Details

                <div onClick={() => openModal(data?.id)} className="ml-2 group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
                  <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
                </div>
              </div>
            </Link>
          </div>

          <p className="text-green-400 font-semibold mt-4">
            Common name <span className="text-white">{data.name}</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-green-400 font-semibold text-[10px] lg:text-sm">
              Type of plant <span className="text-white">{data.plantType}</span>
          </p>
        </div>
      </div>
    </div>
</div>
  )
}

export default FlowerCard;
