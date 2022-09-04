import React from 'react'
import Logo from './components/Logo'

import Title from './components/Title'
import Client from './components/Client';

import { prisma } from "../lib/prisma";

function getTraineesFromCourses(courses: any[], clients: any[]) {
    let clientsOfCourse = [];
    let newCoursesAndClients = [];

    // Loops through the courses
    for(let i = 0; i < courses.length; i++) {
        let courseID = courses[i].id;

        // Adds the clients for the current course
        for (let x = 0; x < clients.length; x++) {
            if(clients[x].course === courseID) {
                clientsOfCourse.push(clients[x]);
            } else if (clients[x].course === courseID) {
                break;
            }
        }     
        
        if(clientsOfCourse.length !== 0) newCoursesAndClients.push({
            course: courses[i].name,
            clients: clientsOfCourse
        });

        clientsOfCourse = [];
    }  
    
    return newCoursesAndClients;    
}

export async function getServerSideProps(context: any) {
    let courses: Array<{}> = []
    let clients: Array<{}> = []

    await prisma.courses.findMany().then(res => courses = res);
    await prisma.clients.findMany({
        orderBy: [
            {
                course: "asc",
            },
            {
                name: "asc"
            }
        ]
    }).then(res => clients = res);    

    const coursesAndClients = getTraineesFromCourses(courses, clients);

    return {
        props: {
            coursesAndClients: coursesAndClients
        }
    };
}

type Props = {
    coursesAndClients: Array<{
        course: string,
        client: {}[]
    }>
}

type Course = {
    id: number,
    name: string
}

export default function allTrainees(props: Props) {

    return (
        <div>
            <Logo />
            <div className="flex justify-center items-center mt-10">
                <div className="flex flex-col items-center justify-center w-9/12">
                    <div className="mb-12">
                        <Title title="All Trainees" showDate={true} showBackButton={true} previousPage="/" />
                    </div>
                    <Course coursesAndClients={props.coursesAndClients} />
                </div>
            </div>
        </div>
    )
};

function Course(props: Props) {
    return props.coursesAndClients.map((course: any) => {        
        return <div className="flex flex-col justify-center items-center">
            <h3 key={course.name} className="text-darkblue text-center text-3xl font-semibold mb-1">{course.course}</h3>
            <div className="flex flex-wrap justify-center mb-5">
                {
                    course.clients.map((client: any)=> {
                        return <Client key={client.name+"-"+client.company} name={client.name} company={client.company} />
                    })
                }
            </div>
        </div>
    })
};