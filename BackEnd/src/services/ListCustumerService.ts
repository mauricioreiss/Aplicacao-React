import prismaClient from "../Prisma";


class ListCustumerService {
    async execute() {
        const custumers = await prismaClient.customer.findMany();

        return custumers;
    }
}

export {ListCustumerService}