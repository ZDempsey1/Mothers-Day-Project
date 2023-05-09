import React, { useCallback, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import FavoriteButton from "@/components/FavoriteButton";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useMovie from "@/hooks/useFlower";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  const { flowerId } = useInfoModalStore();
  const { data = {} } = useMovie(flowerId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <img src={data?.pic2} className="w-full object-cover h-full" />
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <XMarkIcon className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.name}
              </p>
            </div>
          </div>

          <div className="px-12 py-8">
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-row gap-4 items-center">
                <div className="flex flex-row gap-4 items-center">
                  <FavoriteButton flowerId={data?.id} />
                </div>
              </div>
              <div className="flex items-center gap-4 text-3xl">
                <p className="text-green-400 font-semibold">Family</p>
                <span className="text-white font-semibold">{data?.family}</span>
              </div>
              <div className="flex items-center gap-4 text-3xl">
                <p className="text-green-400 font-semibold">Type of plant</p>
                <span className="text-white font-semibold">
                  {data?.plantType}
                </span>
              </div>
              <div className="flex items-center gap-4 text-3xl">
                <p className="text-green-400 font-semibold">Size</p>
                <span className="text-white font-semibold">{data?.size}</span>
              </div>
              <div className="flex items-center gap-4 text-3xl">
                <p className="text-green-400 font-semibold">
                  Sunlight required
                </p>
                <span className="text-white font-semibold">{data?.sun}</span>
              </div>
              <div className="flex items-center gap-4 text-3xl">
                <p className="text-green-400 font-semibold">Soil type</p>
                <span className="text-white font-semibold">
                  {data?.soilType}
                </span>
              </div>
              <div className="flex items-center gap-4 text-3xl">
                <p className="text-green-400 font-semibold">Family</p>
                <span className="text-white font-semibold">{data?.family}</span>
              </div>
              <div className="flex items-center gap-4 text-3xl">
                <p className="text-green-400 font-semibold">Family</p>
                <span className="text-white font-semibold">{data?.family}</span>
              </div>
              <div className="flex items-center gap-4 text-3xl">
                <p className="text-green-400 font-semibold">Family</p>
                <span className="text-white font-semibold">{data?.family}</span>
              </div>
              <div className="flex items-center gap-4 text-3xl">
                <p className="text-green-400 font-semibold">Family</p>
                <span className="text-white font-semibold">{data?.family}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoModal;
