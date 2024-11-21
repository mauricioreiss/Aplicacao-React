import fastify from "fastify";
import Cors from "@fastify/cors";
import { Routes } from "./routes";



const app = fastify({logger: true})


const start = async () => {

    await app.register(Cors);
    await app.register(Routes);

try{

    await app.listen({ port:3333})

}catch(err){
    process.exit(1)
}

}


start();