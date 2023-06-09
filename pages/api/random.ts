// import { NextApiRequest, NextApiResponse } from "next";
// import prismadb from '@/libs/prismadb';
// import serverAuth from "@/libs/serverAuth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     if (req.method !== 'GET') {
//       return res.status(405).end();
//     }

//     await serverAuth(req, res);

//     const plantCount = await prismadb.flower.count();
//     const randomIndex = Math.floor(Math.random() * plantCount);

//     const randomPlant = await prismadb.flower.findMany({
//       take: 1,
//       skip: randomIndex
//     });

//     return res.status(200).json(randomPlant[0]);
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

    await serverAuth(req, res);

    const plantCount = await prismadb.flower.count({
      where: {
        name: {
          not: undefined,
        },
      },
    });

    if (plantCount === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const randomIndex = Math.floor(Math.random() * plantCount);

    const randomPlant = await prismadb.flower.findMany({
      take: 1,
      skip: randomIndex,
      where: {
        name: {
          not: undefined,
        },
      },
    });

    return res.status(200).json(randomPlant[0]);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
