import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';

// ==============================================================================
// EXERCISE 1: Form Management Custom Hook
// ==============================================================================

// 1. Types for the Hook
interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => FormErrors;
  onSubmit: (values: T) => void;
}

// 2. The Custom Hook
function useForm<T extends Record<string, string>>({ 
  initialValues, 
  validate, 
  onSubmit 
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await onSubmit(values);
      setValues(initialValues); // Reset on success
    }
    setIsSubmitting(false);
  };

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}

// 3. Registration Component using the Hook
const RegistrationForm = () => {
  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.email.includes('@')) errors.email = 'Invalid email address';
    if (values.password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const submitForm = async (values: FormValues) => {
    console.log('Submitting:', values);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
    alert('Registration Successful!');
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    validate,
    onSubmit: submitForm
  });

  return (
    <div style={sectionStyle}>
      <h2>Exercise 1: Form Management Hook</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        <div>
          <label>Email:</label>
          <input name="email" type="email" value={values.email} onChange={handleChange} style={inputStyle} />
          {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" value={values.password} onChange={handleChange} style={inputStyle} />
          {errors.password && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password}</span>}
        </div>
        <button type="submit" disabled={isSubmitting} style={buttonStyle}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

// ==============================================================================
// EXERCISE 2: Generic Data Table Component
// ==============================================================================

// 1. Interfaces for Generic Table
type SortDirection = 'asc' | 'desc' | null;

interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode; // Optional custom renderer
}

interface DataTableProps<T extends { id: number | string }> {
  data: T[];
  columns: TableColumn<T>[];
  onSelect?: (selectedIds: (string | number)[]) => void;
}

// 2. The Generic Component
function DataTable<T extends { id: number | string }>({ 
  data, 
  columns, 
  onSelect 
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: SortDirection }>({ key: 'id', direction: null });
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  // Sorting Logic
  const sortedData = useMemo(() => {
    if (!sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  // Selection Logic
  const handleSelectRow = (id: string | number) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
    onSelect?.(Array.from(newSelection));
  };

  const handleSelectAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map(d => d.id)));
    }
  };

  return (
    <div style={sectionStyle}>
      <h2>Exercise 2: Generic Data Table</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead style={{ background: '#f4f4f4' }}>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>
              <input type="checkbox" checked={selectedIds.size === data.length && data.length > 0} onChange={handleSelectAll} />
            </th>
            {columns.map((col) => (
              <th 
                key={String(col.key)} 
                onClick={() => col.sortable && handleSort(col.key)}
                style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', cursor: col.sortable ? 'pointer' : 'default' }}
              >
                {col.title} {sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input type="checkbox" checked={selectedIds.has(row.id)} onChange={() => handleSelectRow(row.id)} />
              </td>
              {columns.map((col) => (
                <td key={String(col.key)} style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: '10px' }}>Selected IDs: {Array.from(selectedIds).join(', ') || 'None'}</p>
    </div>
  );
}

// Mock Data for Table Demo
interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
}

const mockUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'User' },
];

// ==============================================================================
// EXERCISE 3: Data Fetching and Caching System
// ==============================================================================

// 1. Cache Storage (Module level to persist between renders)
const CACHE = new Map<string, { data: any; timestamp: number }>();

interface FetchConfig {
  maxAge: number; // in milliseconds
}

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  invalidateCache: () => void;
}

// 2. The Custom Hook with Caching
function useDataFetch<T>(url: string, config: FetchConfig): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      const now = Date.now();
      const cached = CACHE.get(url);

      // Check if cache exists and is valid
      if (!forceRefresh && cached && (now - cached.timestamp < config.maxAge)) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      // Fetch if no cache or expired
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();

      // Update Cache
      CACHE.set(url, { data: result, timestamp: now });
      setData(result);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]); // Re-run if url changes

  const refetch = () => fetchData(true); // Force refresh
  const invalidateCache = () => {
    CACHE.delete(url);
    fetchData(true);
  };

  return { data, loading, error, refetch, invalidateCache };
}

// 3. Demo Component
const DataFetchDemo = () => {
  const { data, loading, error, refetch, invalidateCache } = useDataFetch<any[]>(
    'https://jsonplaceholder.typicode.com/users',
    { maxAge: 30000 } // 30 seconds cache
  );

  return (
    <div style={sectionStyle}>
      <h2>Exercise 3: Data Fetching & Caching</h2>
      <p>Status: {loading ? 'Loading...' : error ? error : 'Success (Cached or Fresh)'}</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => refetch()} style={{ ...buttonStyle, marginRight: '10px' }}>
          Refresh (Bypass Cache)
        </button>
        <button onClick={() => invalidateCache()} style={{ ...buttonStyle, backgroundColor: '#eab308' }}>
          Clear Cache & Fetch
        </button>
      </div>

      {data && (
        <ul style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
          {data.slice(0, 3).map((u: any) => (
            <li key={u.id}>{u.name} - {u.email}</li>
          ))}
          <li style={{ color: '#666', fontSize: '0.8rem' }}>...and more (Simulated)</li>
        </ul>
      )}
    </div>
  );
};

// ==============================================================================
// MAIN APP COMPONENT
// ==============================================================================

function App() {
  // Table Columns Definition
  const userColumns: TableColumn<User>[] = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { 
      key: 'role', 
      title: 'Role', 
      sortable: true,
      render: (value: string) => <span style={{ color: value === 'Admin' ? 'red' : 'green', fontWeight: 'bold' }}>{value}</span>
    }
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Advanced React + TypeScript Exercises</h1>

      {/* Exercise 1 */}
      <RegistrationForm />
      <hr style={{ margin: '2rem 0', border: '0', borderTop: '1px solid #ddd' }} />

      {/* Exercise 2 */}
      <DataTable data={mockUsers} columns={userColumns} />
      <hr style={{ margin: '2rem 0', border: '0', borderTop: '1px solid #ddd' }} />

      {/* Exercise 3 */}
      <DataFetchDemo />

    </div>
  );
}

// Simple Styles
const sectionStyle: React.CSSProperties = {
  background: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  marginBottom: '1rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  marginTop: '5px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 15px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default App;