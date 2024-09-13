import { useContext } from 'react';
import { KanbanContext } from '../context/KanbanContext';

const useKanban = () => {
  const { tickets, users, grouping, sorting } = useContext(KanbanContext);

  // Group tickets based on the current grouping criteria
  const groupTickets = () => {
    if (grouping === 'user') {
      return users.reduce((acc, user) => {
        acc[user.name] = tickets.filter((ticket) => ticket.userId === user.id);
        return acc;
      }, {});
    } else if (grouping === 'status') {
      return tickets.reduce((acc, ticket) => {
        const statusGroup = ticket.status || 'No Status';
        if (!acc[statusGroup]) acc[statusGroup] = [];
        acc[statusGroup].push(ticket);
        return acc;
      }, {});
    } else {
      // Grouping by priority
      const priorityGroups = {
        'Urgent': [],
        'High': [],
        'Medium': [],
        'Low': [],
        'No priority': [],
      };
      tickets.forEach((ticket) => {
        const priorityGroup = getPriorityLabel(ticket.priority);
        priorityGroups[priorityGroup].push(ticket);
      });
      return priorityGroups;
    }
  };

  // Get a readable label for the ticket's priority
  const getPriorityLabel = (priority) => {
    const priorityLabels = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority',
    };
    return priorityLabels[priority] || 'No priority';
  };

  // Sort tickets based on the current sorting criteria
  const sortTickets = (groupedTickets) => {
    const sorted = { ...groupedTickets };
    for (const group in sorted) {
      if (sorting === 'priority') {
        sorted[group].sort((a, b) => b.priority - a.priority);
      } else if (sorting === 'title') {
        sorted[group].sort((a, b) => a.title.localeCompare(b.title));
      }
    }
    return sorted;
  };

  // Group and sort the tickets
  const groupedAndSortedTickets = sortTickets(groupTickets());

  return {
    groupedAndSortedTickets,
  };
};

export default useKanban;
