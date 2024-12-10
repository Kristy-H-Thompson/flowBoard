import TicketCard from './TicketCard';
const Swimlane = ({ title, tickets, deleteTicket }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Todo':
                return 'swim-lane todo';
            case 'In Progress':
                return 'swim-lane inprogress';
            case 'Done':
                return 'swim-lane done';
            default:
                return 'swim-lane';
        }
    };
    return (<div className={`swimlane ${getStatusClass(title)}`}>
      <h2>{title}</h2>
      {tickets.map(ticket => (<TicketCard key={ticket.id} ticket={ticket} deleteTicket={deleteTicket}/>))}
    </div>);
};
export default Swimlane;
