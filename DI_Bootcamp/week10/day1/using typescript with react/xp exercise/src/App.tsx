import React, { useState, useEffect } from 'react';

// ==========================================
// EXERCISE 2: Greeting Component
// ==========================================
interface GreetingProps {
  name: string;
  messageCount: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, messageCount }) => {
  return (
    <div style={cardStyle}>
      <h3>Exercise 2: Greeting</h3>
      <p>Hello <strong>{name}</strong>!</p>
      <p>You have <strong>{messageCount}</strong> unread messages.</p>
    </div>
  );
};

// ==========================================
// EXERCISE 3: Counter Component
// ==========================================
const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    setLastAction("Incremented (+1)");
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
    setLastAction("Decremented (-1)");
  };

  return (
    <div style={cardStyle}>
      <h3>Exercise 3: Counter</h3>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
      </div>
      {lastAction && <p style={{ marginTop: '10px', color: '#666' }}>Last Action: {lastAction}</p>}
    </div>
  );
};

// ==========================================
// EXERCISE 4: UserCard with Optional Props
// ==========================================
interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

const UserCard: React.FC<UserCardProps> = ({ 
  name = "Guest User", 
  age = 0, 
  role = "Visitor" 
}) => {
  return (
    <div style={{...cardStyle, borderLeft: '5px solid #3b82f6'}}>
      <h4>{name}</h4>
      <p>Role: {role}</p>
      {age > 0 && <p>Age: {age}</p>}
      {age === 0 && <p style={{color: '#999', fontStyle: 'italic'}}>No age provided</p>}
    </div>
  );
};

// ==========================================
// EXERCISE 5: UserList with useEffect
// ==========================================
interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch');
        const data: User[] = await response.json();
        setUsers(data.slice(0, 5)); // Limit to 5 for display purposes
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={cardStyle}>
      <h3>Exercise 5: User List (API Fetch)</h3>
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
  // Common style for the page layout
  const pageStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '2rem',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '1rem'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

  return (
    <div style={pageStyle}>
      
      {/* EXERCISE 1: SETUP INDICATOR */}
      <div style={headerStyle}>
        <h1>React + TypeScript Exercises</h1>
        <div style={{ marginTop: '10px' }}>
          <span style={{ background: '#dcfce7', color: '#166534', padding: '5px 10px', borderRadius: '15px', fontSize: '0.9rem' }}>
            ✅ Exercise 1: Vite Project Running
          </span>
        </div>
        <p style={{ color: '#64748b', marginTop: '10px' }}>
          TypeScript configuration loaded. Server active.
        </p>
      </div>

      {/* EXERCISE 2 & 3: ROW 1 */}
      <div style={gridStyle}>
        <Greeting name="Alice" messageCount={12} />
        <Counter />
      </div>

      {/* EXERCISE 4: USER CARDS */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Exercise 4: Optional Props</h2>
        <div style={gridStyle}>
          {/* Full Props */}
          <UserCard name="John Doe" age={30} role="Admin" />
          {/* Missing Age */}
          <UserCard name="Jane Smith" role="Editor" />
          {/* Missing All (Defaults) */}
          <UserCard />
        </div>
      </div>

      {/* EXERCISE 5: USER LIST */}
      <div>
        <UserList />
      </div>

    </div>
  );
}

// Simple CSS object for reuse
const cardStyle: React.CSSProperties = {
  background: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  border: '1px solid #e2e8f0'
};

export default App;