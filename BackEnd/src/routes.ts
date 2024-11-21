import {FastifyInstance,FastifyPluginOptions,FastifyRequest,FastifyReply} from "fastify"
import { CreateCustumerController } from "./Controllers/CreateCustumerController"
import { ListCustumersController } from "./Controllers/ListCustumersController"
import { DeleteCustumerController } from "./Controllers/DeleteCustumerController"

export async function Routes(fastify:FastifyInstance,options:FastifyPluginOptions) {

    fastify.get("/custumers",async (resquest: FastifyRequest, reply: FastifyReply) => {
        return new ListCustumersController().handle(resquest,reply)
    })
    
    fastify.post("/Custumer",async (request: FastifyRequest, reply:FastifyReply) => {
        return new CreateCustumerController().Handle(request,reply)
    })

    fastify.delete("/DeleteCustumers",async(request: FastifyRequest,reply:FastifyReply) => {
        return new DeleteCustumerController().handle(request,reply)
    })
}