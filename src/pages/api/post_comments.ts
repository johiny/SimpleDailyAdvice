import clientPromise from "@/utils/mongo";
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function postComment(
  req: NextApiRequest,
  res: NextApiResponse
) 

{
    if(req.method === "POST"){
        try{
            const body = JSON.parse(req.body);
            const client = await clientPromise;
            const db = client.db(process.env.MONGODB_DB_NAME);
            const comments = db.collection("user_advices");
            const result = await comments.insertOne({
                date: new Date(),
                advice: body.advice
            })
            res.status(200).json(result)
          }
          catch (error){
              console.log(error)
          }
    }
}