
import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import FlowerList from '@/components/FlowerList';
import useFlowerList from '@/hooks/useFlowerList';
import useFavorites from '@/hooks/useFavorites';


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
