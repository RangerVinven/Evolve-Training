import React from 'react'
import Logo from './components/Logo'

import Title from './components/Title'

import { prisma } from "../lib/prisma";

export async function getServerSideProps(context: any) {
    let courses: Array<{}> = []
    let clients: Array<{}> = []

    prisma.courses.findMany().then(res => courses = res);
    prisma.clients.findMany().then(res => clients = res);

    return {
        props: {
            courses: courses,
            clients: clients
        }
    }
}

type Props = {
    courses: Array<{}>
    clients: Array<{}>
}

export default function allTrainees(props: Props) {
    return (
        <div>
            <Logo />
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center justify-center w-9/12">
                    <div className="mb-12">
                        <Title title="All Trainees" showDate={true} showBackButton={true} previousPage="/" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
