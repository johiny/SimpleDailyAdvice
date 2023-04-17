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
                name: body.name,
                advice: body.advice
            })
            return res.status(200).json(result)
          }
          catch (error){
              console.log(error)
          }
    }
    if(req.method === "GET") {
        try{
            const client = await clientPromise;
            const db = client.db(process.env.MONGODB_DB_NAME);
            const comments = db.collection("user_advices");
            const newestComments = await comments.find({name: req.query.name}).sort({date: -1}).limit(9).toArray()
            return res.status(200).json(newestComments)
    }
    catch(error){
        console.log(error)
    }
  }
}