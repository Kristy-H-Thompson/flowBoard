import { Ticket } from '../models/ticket.js';
import { User } from '../models/user.js';
export const getAllTickets = async (_req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [
                {
                    model: User,
                    as: 'assignedUser',
                    attributes: ['username'],
                },
            ],
        });
        res.json(tickets);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'assignedUser',
                    attributes: ['username'],
                },
            ],
        });
        if (ticket) {
            res.json(ticket);
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createTicket = async (req, res) => {
    const { name, status, description, assignedUserId } = req.body;
    try {
        const newTicket = await Ticket.create({ name, status, description, assignedUserId });
        res.status(201).json(newTicket);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { name, status, description, assignedUserId } = req.body;
    try {
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            ticket.name = name;
            ticket.status = status;
            ticket.description = description;
            ticket.assignedUserId = assignedUserId;
            await ticket.save();
            res.json(ticket);
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            await ticket.destroy();
            res.json({ message: 'Ticket deleted' });
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
