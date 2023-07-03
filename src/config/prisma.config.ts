import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'], });
/* 
const tesPrisma = async () => {
    await prisma.user.create({
        data: {
            email: 'alice@mail.com',
            name: 'Alice',
            password: '12345678',
            username: 'alice',
        },
    });
    await prisma.user.create({
        data: {
            email: 'bob@mail.com',
            name: 'Bob',
            password: '12345678',
            username: 'bob',
        },
    });
    const allUsers = await prisma.user.findMany();

    await prisma.friendship.create({
        data: {
            status: 0,
            user: {
                connect: {
                    id: allUsers[0].id,
                }
            },
            friend: {
                connect: {
                    id: allUsers[1].id,
                }
            },
        }
    });
    // console.log(allUsers);
};

// tesPrisma();

const tesPrisma2 = async () => {
    const allUsers = await prisma.user.findMany({
        include: {
            friends: true,
            friendOfs: true
        }
    });
    console.log(allUsers);
};

tesPrisma2(); */

export default prisma;