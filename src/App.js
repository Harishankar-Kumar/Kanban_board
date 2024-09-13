import React, { useState, useEffect, useContext, useRef } from 'react';
import { KanbanProvider, KanbanContext } from './context/KanbanContext';
import KanbanBoard from './components/KanbanBoard';
import './App.css';
import logo from "./icons_FEtask/Display.svg";
import down from "./icons_FEtask/down.svg";

const AppContent = () => {
  const { setTickets, setUsers, setGrouping, setSorting } = useContext(KanbanContext);
  const apiUrl = "https://api.quicksell.co/v1/internal/frontend-assignment";
  const [showDisplayOptions, setShowDisplayOptions] = useState(false);
  const [loading, setLoading] = useState(true); // State to show a loading spinner
  const [error, setError] = useState(null); // State to show error if fetch fails

  const dropdownRef = useRef(null); // Ref for closing dropdown when clicked outside

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDisplayOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Show loading state
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const fetchedTickets = data.tickets || [];
        const fetchedUsers = data.users || [];
        setTickets(fetchedTickets);
        setUsers(fetchedUsers);
      } catch (error) {
        setError(error.message); // Set error state
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    fetchData();
  }, [setTickets, setUsers]);

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSorting(event.target.value);
  };

  const toggleDisplayOptions = () => {
    setShowDisplayOptions(!showDisplayOptions);
  };

  return (
    <div>
      <header className="App-header">
        <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
          <button onClick={toggleDisplayOptions} className="display-button">
            <img src={logo} alt="" />
            Display
            <img src={down} alt="" />
          </button>
          {showDisplayOptions && (
            <div className="dropdown-options">
              <div style={{ marginBottom: '8px', display: 'flex' }}>
                <label>Grouping: </label>
                <select onChange={handleGroupingChange}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div style={{ marginBottom: '8px', display: 'flex' }}>
                <label>Ordering: </label>
                <select onChange={handleSortingChange}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>
      <main>
        {loading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <KanbanBoard />
        )}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <KanbanProvider>
      <div className="App">
        <AppContent />
      </div>
    </KanbanProvider>
  );
};

export default App;
