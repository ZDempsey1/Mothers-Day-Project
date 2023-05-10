import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { FlowerInterface } from '@/types';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';

interface FlowerDetailsProps {
  flower: FlowerInterface;
}

const FlowerDetails: React.FC<FlowerDetailsProps> = ({ flower }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const [selectedImage, setSelectedImage] = useState(flower.pic1);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // Display flower details using the flower prop
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="p-4 shadow-md rounded-md mt-20 flex">
        <div className="flex-1 mt-2">
          <div className='mr-12 ml-12' style={{ marginRight: '58px' }}>

          <h2 className="text-2xl font-bold">Common Name- {flower.name}</h2>
          <p className="mt-4 text-xl">
          <span className="font-bold">Plant Family-</span> {flower.family}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Botanical Name-</span> {flower.bName}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Type of Plant-</span> {flower.plantType}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Size Range-</span> {flower.size}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Sunlight Requirements-</span> {flower.sun}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Type of Soil-</span> {flower.soilType}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Soil PH-</span> {flower.soilPh}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Bloom Period-</span> {flower.bloom}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Typical Flower Color-</span> {flower.flowerColor}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Bloom Period-</span> {flower.nativeArea}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Toxicity-</span> {flower.toxic}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Toxic Information-</span> {flower.toxicD}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Light Requirements-</span> {flower.lightD}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Soil Needs-</span> {flower.soilD}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Watering Needs-</span> {flower.waterD}
        </p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Temperature and Humidity-</span> {flower.temp}
        </p>

        {/* <p className="mt-2 text-xl">
          <span className="font-bold">{flower.name} Care- </span>{flower.care}</p> */}
          </div>
        </div>
        <div className="flex-1">
          <img
            src={selectedImage.toString()}
            alt="Selected"
            className="w-3/4 object-cover rounded-md mt-4"
          />
          <div className="flex mt-4">
            <img
              src={flower.pic1.toString()}
              alt=""
              className="w-24 h-24 object-cover rounded-md mr-4 cursor-pointer"
              onClick={() => handleImageClick(flower.pic1.toString())}
            />
            <img
              src={flower.pic2.toString()}
              alt=""
              className="w-24 h-24 object-cover rounded-md mr-4 cursor-pointer"
              onClick={() => handleImageClick(flower.pic2.toString())}
            />
            <img
              src={flower.pic3.toString()}
              alt=""
              className="w-24 h-24 object-cover rounded-md cursor-pointer"
              onClick={() => handleImageClick(flower.pic3.toString())}
            />
          </div>
          <p className="mt-10 text-xl mr-10">
          <span className="font-bold">{flower.name}</span><span> Care- </span>{flower.care}</p>
          <p className="mt-4 text-xl">
          <span className="font-bold">Fertilizer-</span> {flower.fertilizer}
        </p>
        </div>
      </div>
    </div>
  );

}

export const getStaticProps: GetStaticProps = async (context) => {
  const flowerId = context.params?.plantId;

  if (!flowerId) {
    return {
      notFound: true,
    };
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/api/flowers/${flowerId}`);
    const flower = await response.json();

    return {
      props: {
        flower,
      },
      revalidate: 60, // Optional: revalidate the data every 60 seconds
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/api/flowers`);
    const flowers = await response.json();

    const paths = flowers.map((flower: FlowerInterface) => ({
      params: { plantId: flower.id },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error(error);

    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export default FlowerDetails;
