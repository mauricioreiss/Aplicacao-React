import prismaClient from "../Prisma";


interface DeleteCustumerProps {
    id: string;
}

class DeleteCustumerService {
    async execute({ id }: DeleteCustumerProps) {

        if (!id) {
            throw new Error("Invalido ")
        }

        const Findcustumers = await prismaClient.customer.findFirst({
            where: {
                id: id
            }
        })

        if (!Findcustumers) {
            throw new Error("Cliente Inexistente ")
        }

        await prismaClient.customer.delete({
            where: {
                id: Findcustumers.id
            }
        })
        return {message:"deletado"};
    }
}

export { DeleteCustumerService }