import React from 'react';
import KanbanColumn from './KanbanColumn';
import useKanban from '../hooks/useKanban';

const KanbanBoard = () => {
  const { groupedAndSortedTickets } = useKanban(); // Using the custom hook

  return (
    <div className="kanban-board">
      {Object.entries(groupedAndSortedTickets).map(([groupName, tickets]) => (
        <KanbanColumn key={groupName} title={groupName} tickets={tickets} />
      ))}
    </div>
  );
};

  

export default KanbanBoard;
