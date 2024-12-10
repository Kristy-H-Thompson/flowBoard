import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import auth from '../utils/auth';
const boardStates = ['Todo', 'In Progress', 'Done'];
const Board = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };
    const fetchTickets = async () => {
        try {
            const data = await retrieveTickets();
            setTickets(data);
        }
        catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    };
    const deleteIndvTicket = async (ticketId) => {
        try {
            const data = await deleteTicket(ticketId);
            fetchTickets();
            return data;
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    useLayoutEffect(() => {
        checkLogin();
    }, []);
    useEffect(() => {
        if (loginCheck) {
            fetchTickets();
        }
    }, [loginCheck]);
    if (error) {
        return <ErrorPage />;
    }
    return (<>
    {!loginCheck ? (<div className='login-notice'>
          <h1>
            Login to create & view tickets
          </h1>
        </div>) : (<div className='board'>
            <button type='button' id='create-ticket-link'>
              <Link to='/create'>New Ticket</Link>
            </button>
            <div className='board-display'>
              {boardStates.map((status) => {
                const filteredTickets = tickets.filter(ticket => ticket.status === status);
                return (<Swimlane title={status} key={status} tickets={filteredTickets} deleteTicket={deleteIndvTicket}/>);
            })}
            </div>
          </div>)}
    </>);
};
export default Board;
