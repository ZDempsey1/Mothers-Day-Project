// // pages/plants/[plantId].tsx
// import { FlowerInterface } from '@/types';
// import { useRouter } from 'next/router';
// import { GetServerSideProps } from 'next';
// import axios from 'axios';

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
//     <div>
//       <h1>{flower.name}</h1>
//       {/* Add more styling and content here */}
//     </div>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const flowerId = context.params?.flowerId;

//   if (!flowerId) {
//     return {
//       notFound: true,
//     };
//   }

//   try {
//     const response = await axios.get(`/api/flowers/${flowerId}`);
//     const flower = response.data;

//     return {
//       props: {
//         flower,
//       },
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       notFound: true,
//     };
//   }
// };

// export default FlowerDetails;





// import { FlowerInterface } from '@/types';
// import { useRouter } from 'next/router';
// import { GetServerSideProps } from 'next';
// import axios from 'axios';

// interface FlowerDetailsProps {
//   flower: FlowerInterface;
// }

// const FlowerDetails: React.FC<FlowerDetailsProps> = ({ flower }) => {
//     const router = useRouter();

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   // Display flower details using the flower prop
//   return (
//     <div>
//       <h1>{flower.name}</h1>
//       {/* Add more styling and content here */}
//     </div>
//   );
// }


// export const getStaticProps: GetStaticProps = async (context) => {
//   const flowerId = context.params?.flowerId;

//   if (!flowerId) {
//     return {
//       notFound: true,
//     };
//   }

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const response = await axios.get(`${apiUrl}/api/flowers/${flowerId}`);
//     const flower = response.data;

//     return {
//       props: {
//         flower,
//       },
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       notFound: true,
//     };
//   }
// };

// export default FlowerDetails;


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

  // Display flower details using the flower prop
  return (
    <div>
      <h1>{flower.name}</h1>
      {/* Add more styling and content here */}
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
