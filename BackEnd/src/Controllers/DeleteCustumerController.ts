import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustumerService } from "../services/DeleteCustumerService";


class DeleteCustumerController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.query as { id: string }

        const DeleteCustumer = new DeleteCustumerService();

        const custumer = await DeleteCustumer.execute({id});

        reply.send(custumer);

    }

}

export {DeleteCustumerController}