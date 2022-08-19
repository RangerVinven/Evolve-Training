import React from 'react'
import { useRouter } from 'next/router'

import Logo from '../components/Logo';
import Form from '../components/Form';

import { prisma } from "../../lib/prisma";

export async function getServerSideProps() {
	const clients = await prisma.clients.findMany({orderBy: [{ name: "asc" }]});

	return {
		props: {
			clients
		}
	}
}

export default function signIn(props: any) {

    const router = useRouter();
    const course = router.query.course;

    return (
        <div>
            <Logo />
            <div className="flex justify-center items-center h-96">
                <div className="flex flex-col items-center justify-center 6/12">
                    <select className="w-96 h-12 bg-green pl-1 text-white font-bold text-2xl" name="client">
                        <option selected disabled>Your Name</option>
                        {
                            props.clients.map((client: any) => {
                                return (
                                    <option key={client.id} value={client.name}>{client.name}</option>
                                )
                            })
                        }
                    </select>
                    <button className="bg-darkblue text-2xl w-fit p-1 px-2 mt-8 font-bold text-white rounded-md">Sign Out</button>
                </div>
            </div>
        </div>
    );
}
