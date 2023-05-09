// pages/plants/[plantId].tsx

import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import axios from 'axios';

const FlowerDetails = ({ flower }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Display flower details using the flower prop
  return (
    <div>
      <h1>{flower.name}</h1>
      {/* Add more styling and content here */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const flowerId = context.params?.flowerId;

  if (!flowerId) {
    return {
      notFound: true,
    };
  }

  try {
    const response = await axios.get(`/api/flowers/${flowerId}`);
    const flower = response.data;

    return {
      props: {
        flower,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
};

export default FlowerDetails;
