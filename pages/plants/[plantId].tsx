// import Navbar from '@/components/Navbar';
// import { FlowerInterface } from '@/types';
// import { useRouter } from 'next/router';
// import { GetStaticProps, GetStaticPaths } from 'next';

// interface FlowerDetailsProps {
//   flower: FlowerInterface;
// }

// const FlowerDetails: React.FC<FlowerDetailsProps> = ({ flower }) => {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   // Display flower details using the flower prop
//   return (
//     <div className="flex flex-col bg-grey">
//       <Navbar />
//     <div className="p-4 bg-white shadow-md rounded-md mt-20">
//       <h2 className="text-2xl font-bold">Common Name- {flower.name}</h2>
//       <p className="mt-4 text-gray-500">Plant Family- {flower.family}</p>
//       <p className="mt-2">Caring- {flower.care}</p>
//       <div className="flex mt-4">
//         <img src={flower.pic1.toString()} alt="" className="w-24 h-24 object-cover rounded-md mr-4" />
//         <img src={flower.pic2.toString()} alt="" className="w-24 h-24 object-cover rounded-md mr-4" />
//         <img src={flower.pic3.toString()} alt="" className="w-24 h-24 object-cover rounded-md" />
//       </div>
//     </div>
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const flowerId = context.params?.plantId;

//   if (!flowerId) {
//     return {
//       notFound: true,
//     };
//   }

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const response = await fetch(`${apiUrl}/api/flowers/${flowerId}`);
//     const flower = await response.json();

//     return {
//       props: {
//         flower,
//       },
//       revalidate: 60, // Optional: revalidate the data every 60 seconds
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       notFound: true,
//     };
//   }
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const response = await fetch(`${apiUrl}/api/flowers`);
//     const flowers = await response.json();

//     const paths = flowers.map((flower: FlowerInterface) => ({
//       params: { plantId: flower.id },
//     }));

//     return {
//       paths,
//       fallback: 'blocking',
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       paths: [],
//       fallback: 'blocking',
//     };
//   }
// };

// export default FlowerDetails;
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
    <div className="flex flex-col bg-grey">
      <Navbar />
      <div className="p-4 bg-white shadow-md rounded-md mt-20">
        <h2 className="text-2xl font-bold">Common Name- {flower.name}</h2>
        <p className="mt-4 text-gray-500">Plant Family- {flower.family}</p>
        <p className="mt-2">Caring- {flower.care}</p>
        <img
          src={selectedImage.toString()}
          alt="Selected"
          className="w-48 h-48 object-cover rounded-md mt-4"
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
      </div>
    </div>
  );
};

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
