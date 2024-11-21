import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustumerService } from "../services/CreateCustumerService";


class CreateCustumerController {
    async Handle(request: FastifyRequest, reply: FastifyReply) {

        const {name,email} = request.body as {name: string, email:string};
        console.log(name," e ", email)


        const custumerService = new CreateCustumerService()

        const costumer = await custumerService.execute({name,email});

        reply.send(costumer)

    }
}

export {CreateCustumerController}