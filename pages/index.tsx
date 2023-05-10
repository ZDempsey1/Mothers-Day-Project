// import React from 'react';
// import { NextPageContext } from 'next';
// import { getSession } from 'next-auth/react';

// import Link from 'next/link';
// import Navbar from '@/components/Navbar';
// import Billboard from '@/components/Billboard';
// import MovieList from '@/components/FlowerList';
// import InfoModal from '@/components/InfoModal';
// import useMovieList from '@/hooks/useFlowerList';
// import useFavorites from '@/hooks/useFavorites';
// import useInfoModalStore from '@/hooks/useInfoModalStore';

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }

// const Home = () => {
//   const { data: flowers = [] } = useMovieList();
//   const { data: favorites = [] } = useFavorites();
//   const {isOpen, closeModal} = useInfoModalStore();

//   return (
//     <>
//       <InfoModal visible={isOpen} onClose={closeModal} />
//       <Navbar />
//       <Billboard />
//       <div className="pb-40">
//         <MovieList name="Trending Now" data={flowers} />
//         <MovieList name="My Favorites" data={favorites} />
//       </div>
//     </>
//   )
// }

// export default Home;
import React, { useState } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import InfoModal from '@/components/InfoModal';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import FlowerList from '@/components/FlowerList';
import useFlowerList from '@/hooks/useFlowerList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';


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

const Home = () => {
  const { data: flowers = [] } = useFlowerList();
  const { data: favorites = [] } = useFavorites();

  return (
    <>
      <Navbar />
      <Billboard />
      <div>
        <FlowerList name="Trending Now" data={flowers} />
        <FlowerList name="My Favorites" data={favorites} />
      </div>
    </>
  )
}

export default Home;
