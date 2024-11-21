import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustumerService } from '../services/ListCustumerService'

class ListCustumersController {

    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listcustumer = new ListCustumerService();

        const custumer = await listcustumer.execute();

        reply.send(custumer);
    }

}

export { ListCustumersController }