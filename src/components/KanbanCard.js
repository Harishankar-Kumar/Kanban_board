import React, { useContext } from 'react';
import { KanbanContext } from '../context/KanbanContext';
import UserAvatar from './UserAvatar'; 

const KanbanCard = ({ ticket }) => {
  const { users } = useContext(KanbanContext);

  // Find the user assigned to this ticket
  const user = users.find((user) => user.id === ticket.userId);

  return (
    <div className="kanban-card">
      <div className="kanban-card-header">
        <span className="kanban-card-id">{ticket.id}</span>
        {user && <UserAvatar userId={user.id} />}
      </div>
      <h3 className="kanban-card-title">{ticket.title}</h3>
      <div className="kanban-card-tag">
        {ticket.tag.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default KanbanCard;
