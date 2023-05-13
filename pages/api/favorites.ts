// import { NextApiRequest, NextApiResponse } from "next";

// import prismadb from '@/libs/prismadb';
// import serverAuth from "@/libs/serverAuth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     if (req.method !== 'GET') {
//       return res.status(405).end();
//     }

//     const { currentUser } = await serverAuth(req, res);

//     const favoritedFlowers = await prismadb.flower.findMany({
//       where: {
//         id: {
//           in: currentUser?.favoriteIds,
//         }
//       }
//     });

//     return res.status(200).json(favoritedFlowers)
//   } catch (error) {
//     console.log(error);
//     return res.status(500).end();
//   }
// }
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    if (!currentUser?.favoriteIds || currentUser.favoriteIds.length === 0) {
      return res.status(200).json([]);
    }

    const favoritedFlowers = await prismadb.flower.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds,
        },
      },
    });

    const filteredFavorites = favoritedFlowers.filter((flower) => flower.name);

    return res.status(200).json(filteredFavorites);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
