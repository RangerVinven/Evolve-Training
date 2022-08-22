import React, { useEffect } from 'react'
import ReactLoading from 'react-loading';
import Logo from './Logo';

type Props ={
    course: string,
}

type Clients = {
	clients: Array<{}>,
	setSelectedClientID: Function,
	selectedClientID: number
}

export default function SignOutForm(props: Props) {

	let [clients, setClients] = React.useState([{
		"Clients Not Loaded": "Clients Not Loaded",
	}]);

	let [selectedClientID, setSelectedClientID] = React.useState(0);

	useEffect(() => {
		fetch("/api/GetClientsOfACourse", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"course": props.course
			})
		}).then(res => res.json()).then(data => {
			setClients(data.clients);                                        
		});
	}, [])

	if(clients.length === 1) {
		if(clients[0].hasOwnProperty("Clients Not Loaded")) {
			return (
				<div>
                    <Logo />
                    <div className="h-450 flex justify-center items-center">
                        <ReactLoading type="spinningBubbles" color="#1F5C78" height={100} width={100} />
                    </div>
                </div>
			);
		} else {
			return (
				<SelectAndSubmitComponent clients={clients} setSelectedClientID={setSelectedClientID} selectedClientID={selectedClientID}  />
			);
		}
	} else {
		return (
			<SelectAndSubmitComponent clients={clients} setSelectedClientID={setSelectedClientID} selectedClientID={selectedClientID} />
		);
	}
}

function SelectAndSubmitComponent(props: Clients) {
	return (
		<div>
			<select onChange={(event) => {
				props.setSelectedClientID(Number(event.target.value));
			}} defaultValue="Your Name" className="w-96 h-12 bg-green pl-1 rounded-md text-white font-bold text-2xl" name="client">
				<option disabled>Your Name</option>
				{
					props.clients.map((client: any) => {
						return (
							<option key={client.id} value={client.id}>{client.name} - {client.company}</option>
						)
					})
				}
			</select>
			<button onClick={() => {
				fetch("/api/RemoveClient", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"clientID": props.selectedClientID,
					})
				});
			}} className="bg-darkblue text-2xl w-fit p-1 px-2 mt-8 font-bold text-white rounded-md">Sign Out</button>
		</div>
	)
}
