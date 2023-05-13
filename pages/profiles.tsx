import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

const images = [
  '/images/flower icon.png',
  '/images/flowersicon.png',
  '/images/flower-pot.png',
  '/images/planting icon.png',
  '/images/cactus.png',
  '/images/sunflower icon.png',
  '/images/watering-plants.png',
  '/images/potting.png',

]

interface UserCardProps {
  name: string;
  imgSrc: string;
  selectedImage: string;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}


const UserCard: React.FC<UserCardProps> = ({ name, imgSrc, selectedImage }) => {
  return (
    <div className="group flex flex-col items-center w-44 mx-auto">
      <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        <img
          draggable={false}
          className="object-cover max-w-full max-h-full"
          src={selectedImage || imgSrc}
          alt=""
        />
      </div>
      <div className="mt-4 text-black text-2xl text-center group-hover:text-gray-400">{name}</div>
      <div className="flex">
      </div>
    </div>
  );
};

const App = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const [selectedImage, setSelectedImage] = useState(currentUser?.profileImage || images[0]);

  const selectProfile = useCallback(() => {
    router.push('/');
  }, [router]);


  const handleImageSelect = async (image: string) => {
    setSelectedImage(image);


    if (currentUser?.id) {
      try {
        const response = await fetch('/api/updateProfileImage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser.id, imageUrl: image }),
        });

        if (!response.ok) {
          throw new Error('Failed to update profile image');
        }
      } catch (error) {
        console.error('Error updating profile image:', error);
      }
    }
  };


  const renderImageOptions = () => {
    return (
      <div className="image-options flex flex-wrap gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Option ${index}`}
            className="w-20 h-20 cursor-pointer object-contain"
            onClick={() => handleImageSelect(image)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-black text-center">Who&#39;s Planting?</h1>
        <div className="object-contain w-full h-full gap-8 mt-10">
        <div onClick={() => selectProfile()}>
          <UserCard
              name={currentUser?.name}
              imgSrc={selectedImage}
              selectedImage={selectedImage || currentUser?.profileImage}
            />
          </div>
        </div>
        <h1 className="text-center text-2xl mt-10">Select an icon below and click the image to proceed </h1>
        <h1 className="text-center text-2xl mt-5">You can update your icon later if you can't decide from all the awesomeness!</h1>
        <div className="mt-8">{renderImageOptions()}</div>
      </div>
    </div>
  );
}

export default App;
