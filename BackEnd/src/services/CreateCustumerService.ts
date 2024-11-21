import { error } from "console";
import prismaClient from "../Prisma";

interface CreateCustumerProps {
    name: string;
    email: string;
}

class CreateCustumerService {

    async execute({ name, email }: CreateCustumerProps) {

        if (!name || !email) {
            throw new Error("Preencha os campos")
        }

        const custumer = await prismaClient.customer.create({
            data:{
                name,
                email,
                Status: true
            }
        })

        return custumer
    }
}

export { CreateCustumerService }