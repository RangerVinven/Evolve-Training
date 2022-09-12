// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from "../../lib/prisma";

type Data = {
    coursesAndClients?: {}[],
    error?: String
}

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

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    return new Promise((resolve: any, reject: any) => {
        if(req.method !== "GET") return res.status(405).json({ error: "Only GET is allowed" });

        let courses: Array<{}> = []
        let clients: Array<{}> = []

        prisma.courses.findMany().then((result: any) => {
            courses = result;

            prisma.clients.findMany({
                orderBy: [
                    {
                        course: "asc",
                    },
                    {
                        name: "asc"
                    }
                ]
            }).then((result: any) => {
                clients = result
                const coursesAndClients = getTraineesFromCourses(courses, clients);

                return res.status(200).json({
                    coursesAndClients: coursesAndClients,
                });
            }).catch((err: any) => {
                return res.status(500).json({
                    error: "Something Went Wrong"
                });
            });
        }).catch((err: any) => {
            return res.status(500).json({
                error: "Something Went Wrong"
            });
        });
    });
}
