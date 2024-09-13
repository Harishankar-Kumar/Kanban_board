import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const KanbanContext = createContext();

// Create a provider component
export const KanbanProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [grouping, setGrouping] = useState('status'); // default grouping
    const [sorting, setSorting] = useState('priority'); // default sorting

    // Function to fetch tickets and users from the API
    const fetchTicketsAndUsers = async () => {
        // Mock API response
        const apiResponse = {
            tickets: [
                { "id": "CAM-1", "title": "Update User Profile Page UI", "tag": ["Feature request"], "userId": "usr-1", "status": "Todo", "priority": 4 }, { "id": "CAM-2", "title": "Add Multi-Language Support - Enable multi-language support within the application.", "tag": ["Feature Request"], "userId": "usr-2", "status": "In progress", "priority": 3 }, { "id": "CAM-3", "title": "Optimize Database Queries for Performance", "tag": ["Feature Request"], "userId": "usr-2", "status": "In progress", "priority": 1 }, { "id": "CAM-4", "title": "Implement Email Notification System", "tag": ["Feature Request"], "userId": "usr-1", "status": "In progress", "priority": 3 }, { "id": "CAM-5", "title": "Enhance Search Functionality", "tag": ["Feature Request"], "userId": "usr-5", "status": "In progress", "priority": 0 }, { "id": "CAM-6", "title": "Third-Party Payment Gateway", "tag": ["Feature Request"], "userId": "usr-2", "status": "Todo", "priority": 1 }, { "id": "CAM-7", "title": "Create Onboarding Tutorial for New Users", "tag": ["Feature Request"], "userId": "usr-1", "status": "Backlog", "priority": 2 }, { "id": "CAM-8", "title": "Implement Role-Based Access Control (RBAC)", "tag": ["Feature Request"], "userId": "usr-3", "status": "In progress", "priority": 3 }, { "id": "CAM-9", "title": "Upgrade Server Infrastructure", "tag": ["Feature Request"], "userId": "usr-5", "status": "Todo", "priority": 2 }, { "id": "CAM-10", "title": "Conduct Security Vulnerability Assessment", "tag": ["Feature Request"], "userId": "usr-4", "status": "Backlog", "priority": 1 }
            ],
            users: [
                { "id": "usr-1", "name": "Anoop sharma", "available": false }, { "id": "usr-2", "name": "Yogesh", "available": true }, { "id": "usr-3", "name": "Shankar Kumar", "available": true }, { "id": "usr-4", "name": "Ramesh", "available": true }, { "id": "usr-5", "name": "Suresh", "available": true }
            ],
        };

        // Assuming the API response has properties 'tickets' and 'users'
        setTickets(apiResponse.tickets);
        setUsers(apiResponse.users);
    };

    // Effect to fetch data on component mount
    useEffect(() => {
        fetchTicketsAndUsers();
    }, []);

    // Provide the context values that will be available to other components
    const contextValue = {
        tickets,
        setTickets,
        users,
        setUsers,
        grouping,
        setGrouping,
        sorting,
        setSorting,
    };

    return (
        <KanbanContext.Provider value={contextValue}>
            {children}
        </KanbanContext.Provider>
    );
};
