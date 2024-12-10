import Auth from '../utils/auth';
const retrieveTickets = async () => {
    try {
        const response = await fetch('/api/tickets/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval: ', err);
        return [];
    }
};
const retrieveTicket = async (id) => {
    try {
        const response = await fetch(`/api/tickets/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Could not invalid API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval: ', err);
        return Promise.reject('Could not fetch singular ticket');
    }
};
const createTicket = async (body) => {
    try {
        const response = await fetch('/api/tickets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(body)
        });
        const data = response.json();
        if (!response.ok) {
            throw new Error('invalid API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from Ticket Creation: ', err);
        return Promise.reject('Could not create ticket');
    }
};
const updateTicket = async (ticketId, body) => {
    try {
        const response = await fetch(`/api/tickets/${ticketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.error('Update did not work', err);
        return Promise.reject('Update did not work');
    }
};
const deleteTicket = async (ticketId) => {
    try {
        const response = await fetch(`/api/tickets/${ticketId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.error('Error in deleting ticket', err);
        return Promise.reject('Could not delete ticket');
    }
};
export { createTicket, deleteTicket, retrieveTickets, retrieveTicket, updateTicket };
