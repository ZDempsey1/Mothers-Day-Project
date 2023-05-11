import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

const images = [
  '/images/flower icon.png',
  '/images/flowersicon.png',
  '/images/planting icon.png',
  '/images/sunflower icon.png'
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
    <div className="group flex-row w-44 mx-auto">
      <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        <img draggable={false} className="w-max h-max object-contain" src={selectedImage || imgSrc} alt="" />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
    </div>
  );
}

const App = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const selectProfile = useCallback(() => {
    router.push('/');
  }, [router]);


  const handleImageSelect = async (image: string) => {
    setSelectedImage(image);

    // Call the API route to update the profile image in the database
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
        <h1 className="text-3xl md:text-6xl text-black text-center">Who&#39;s watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
        <div onClick={() => selectProfile()}>
          <UserCard
              name={currentUser?.name}
              imgSrc={selectedImage}
              selectedImage={selectedImage || currentUser?.profileImage}
            />
          </div>
        </div>
        <div className="mt-8">{renderImageOptions()}</div>
      </div>
    </div>
  );
}

export default App;
