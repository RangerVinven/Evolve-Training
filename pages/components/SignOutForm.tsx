import React from 'react'
// import Logo from './Logo';
// import Title from './Title';

// type Props ={
//     course: string
//     clients: {}[]
// }

// export default function SignOutForm(props: Props) {
//     return (
//         <div>
//             <Logo />
//             <div className="flex justify-center items-center h-96">
//                 <div className="flex flex-col items-center justify-center 6/12">
//                     <div className="mb-12">
//                             <Title title={props.course} showDate={true} showBackButton={true} previousPage="/" />
//                     </div>
//                     <select defaultValue="Your Name" className="w-96 h-12 bg-green pl-1 rounded-md text-white font-bold text-2xl" name="client">
//                         <option disabled>Your Name</option>
//                         {
//                             props.clients.map((client: any) => {
//                                 return (
//                                     <option key={client.id} value={client.name}>{client.name} - {client.company}</option>
//                                 )
//                             })
//                         }
//                     </select>
//                     <button className="bg-darkblue text-2xl w-fit p-1 px-2 mt-8 font-bold text-white rounded-md">Sign Out</button>
//                 </div>
//             </div>
//         </div>
//     );
// }
