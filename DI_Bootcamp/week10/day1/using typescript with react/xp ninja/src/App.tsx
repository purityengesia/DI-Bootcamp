import React, { 
  useReducer, 
  useEffect, 
  useRef, 
  createContext, 
  useContext, 
  ReactNode, 
  ChangeEvent 
} from 'react';

// ==============================================================================
// EXERCISE 1: Managing User Profile with useReducer
// ==============================================================================

// 1. Define State and Action Types
type ProfileStatus = 'initial' | 'loading' | 'success' | 'error';

interface ProfileState {
  status: ProfileStatus;
  profile: { name: string; bio: string } | null;
  error: string | null;
}

type ProfileAction =
  | { type: 'START_UPDATE' }
  | { type: 'UPDATE_SUCCESS'; profile: { name: string; bio: string } }
  | { type: 'UPDATE_FAILURE'; error: string };

// 2. Initial State
const initialProfileState: ProfileState = {
  status: 'initial',
  profile: null,
  error: null,
};

// 3. Reducer Function
const profileReducer = (state: ProfileState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case 'START_UPDATE':
      return { ...state, status: 'loading', error: null };
    case 'UPDATE_SUCCESS':
      return { ...state, status: 'success', profile: action.profile };
    case 'UPDATE_FAILURE':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
};

const UserProfileManager = () => {
  const [state, dispatch] = useReducer(profileReducer, initialProfileState);

  const handleUpdate = () => {
    dispatch({ type: 'START_UPDATE' });
    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.2) {
        dispatch({ 
          type: 'UPDATE_SUCCESS', 
          profile: { name: 'John Doe', bio: 'React Developer' } 
        });
      } else {
        dispatch({ type: 'UPDATE_FAILURE', error: 'Failed to update profile.' });
      }
    }, 1500);
  };

  return (
    <div style={sectionStyle}>
      <h2>Exercise 1: User Profile</h2>
      <p>Status: <strong>{state.status}</strong></p>
      {state.status === 'initial' && (
        <button onClick={handleUpdate} style={buttonStyle}>Update Profile</button>
      )}
      {state.status === 'loading' && <p>Saving changes...</p>}
      {state.status === 'success' && (
        <div style={{ background: '#dcfce7', padding: '10px', borderRadius: '4px' }}>
          <p><strong>Name:</strong> {state.profile?.name}</p>
          <p><strong>Bio:</strong> {state.profile?.bio}</p>
          <button onClick={() => dispatch({ type: 'START_UPDATE' })} style={{ marginTop: '10px' }}>Edit Again</button>
        </div>
      )}
      {state.status === 'error' && (
        <p style={{ color: 'red' }}>Error: {state.error}</p>
      )}
    </div>
  );
};

// ==============================================================================
// EXERCISE 2: Managing Survey Feedback with useReducer
// ==============================================================================

// 1. Define State and Action Types
type SurveyStatus = 'initial' | 'submitting' | 'completed';

interface SurveyState {
  status: SurveyStatus;
  feedback: string;
}

type SurveyAction =
  | { type: 'START_SURVEY' }
  | { type: 'SUBMIT_FEEDBACK'; feedback: string }
  | { type: 'RESET' };

// 2. Initial State
const initialSurveyState: SurveyState = {
  status: 'initial',
  feedback: '',
};

// 3. Reducer Function
const surveyReducer = (state: SurveyState, action: SurveyAction): SurveyState => {
  switch (action.type) {
    case 'START_SURVEY':
      return { ...state, status: 'submitting', feedback: state.feedback }; // Keep feedback
    case 'SUBMIT_FEEDBACK':
      return { ...state, status: 'completed', feedback: action.feedback };
    case 'RESET':
      return { ...state, status: 'initial', feedback: '' };
    default:
      return state;
  }
};

const SurveyFeedback = () => {
  const [state, dispatch] = useReducer(surveyReducer, initialSurveyState);
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = () => {
    dispatch({ type: 'START_SURVEY' });
    // Simulate network request
    setTimeout(() => {
      dispatch({ type: 'SUBMIT_FEEDBACK', feedback: inputValue });
    }, 1000);
  };

  return (
    <div style={sectionStyle}>
      <h2>Exercise 2: Survey Feedback</h2>
      
      {state.status === 'initial' && (
        <div>
          <button onClick={() => {}} disabled style={{ opacity: 0.5, cursor: 'not-allowed', padding: '10px' }}>
            Start Survey (Ready)
          </button>
          <textarea 
            placeholder="Enter your feedback..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%', height: '80px', marginTop: '10px', padding: '8px' }}
          />
          <button onClick={handleSubmit} style={buttonStyle}>Submit Feedback</button>
        </div>
      )}

      {state.status === 'submitting' && <p>Submitting your feedback...</p>}

      {state.status === 'completed' && (
        <div style={{ background: '#e0e7ff', padding: '15px', borderRadius: '4px' }}>
          <h3>Thank you!</h3>
          <p>We received: "{state.feedback}"</p>
          <button onClick={() => { setInputValue(''); dispatch({ type: 'RESET' }); }} style={{ ...buttonStyle, backgroundColor: '#4b5563' }}>
            Reset Survey
          </button>
        </div>
      )}
    </div>
  );
};

// ==============================================================================
// EXERCISE 3: Managing Form State with useReducer
// ==============================================================================

// 1. Define State and Action Types
interface FormState {
  name: string;
  email: string;
  message: string;
}

type FormAction =
  | { type: 'updateField'; field: keyof FormState; value: string }
  | { type: 'resetForm' };

// 2. Initial State
const initialFormState: FormState = {
  name: '',
  email: '',
  message: '',
};

// 3. Reducer Function
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'updateField':
      return { ...state, [action.field]: action.value };
    case 'resetForm':
      return initialFormState;
    default:
      return state;
  }
};

const ContactForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({ 
      type: 'updateField', 
      field: e.target.name as keyof FormState, 
      value: e.target.value 
    });
  };

  return (
    <div style={sectionStyle}>
      <h2>Exercise 3: Form State with Reducer</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          name="name" 
          placeholder="Name" 
          value={state.name} 
          onChange={handleChange} 
          style={inputStyle} 
        />
        <input 
          name="email" 
          placeholder="Email" 
          value={state.email} 
          onChange={handleChange} 
          style={inputStyle} 
        />
        <textarea 
          name="message" 
          placeholder="Message" 
          value={state.message} 
          onChange={handleChange} 
          style={{ ...inputStyle, height: '80px' }} 
        />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" style={buttonStyle}>Send</button>
          <button type="button" onClick={() => dispatch({ type: 'resetForm' })} style={{ ...buttonStyle, backgroundColor: '#ef4444' }}>
            Reset Form
          </button>
        </div>
      </form>
      <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666' }}>
        Current State: {JSON.stringify(state)}
      </div>
    </div>
  );
};

// ==============================================================================
// EXERCISE 4: Using useContext for Global State Management
// ==============================================================================

// 1. Define Types for Context
interface Contact {
  id: number;
  name: string;
  email: string;
}

type ContactAction =
  | { type: 'addContact'; contact: Contact }
  | { type: 'removeContact'; id: number };

interface ContactContextType {
  contacts: Contact[];
  dispatch: React.Dispatch<ContactAction>;
}

// 2. Create Context
const ContactContext = createContext<ContactContextType | undefined>(undefined);

// 3. Reducer for Contacts
const contactReducer = (state: Contact[], action: ContactAction): Contact[] => {
  switch (action.type) {
    case 'addContact':
      return [...state, action.contact];
    case 'removeContact':
      return state.filter(c => c.id !== action.id);
    default:
      return state;
  }
};

// 4. Provider Component
const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, dispatch] = useReducer(contactReducer, [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ]);

  return (
    <ContactContext.Provider value={{ contacts, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

// 5. Custom Hook to Access Context
const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};

// 6. Consumer Components
const ContactList = () => {
  const { contacts, dispatch } = useContacts();

  const handleAdd = () => {
    const newId = contacts.length + 1;
    dispatch({ 
      type: 'addContact', 
      contact: { id: newId, name: `User ${newId}`, email: `user${newId}@example.com` } 
    });
  };

  return (
    <div style={sectionStyle}>
      <h2>Exercise 4: Global Contact List (useContext)</h2>
      <button onClick={handleAdd} style={{...buttonStyle, marginBottom: '10px'}}>Add Random Contact</button>
      <ul style={{ paddingLeft: '20px' }}>
        {contacts.map(contact => (
          <li key={contact.id} style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px', marginBottom: '5px' }}>
            <span>{contact.name} ({contact.email})</span>
            <button 
              onClick={() => dispatch({ type: 'removeContact', id: contact.id })}
              style={{ background: 'none', border: '1px solid red', color: 'red', cursor: 'pointer', borderRadius: '4px', padding: '2px 6px' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ==============================================================================
// EXERCISE 5: Managing DOM Elements with useRef
// ==============================================================================

const RefFocusExample = () => {
  // 1. Set Up a useRef Reference
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. Access the DOM Element on Component Mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 3. Handle a Button Click to Focus the Input
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.borderColor = '#3b82f6';
    }
  };

  return (
    <div style={sectionStyle}>
      <h2>Exercise 5: DOM Refs (useRef)</h2>
      <p>Click the button to focus the input below:</p>
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="I will auto-focus on mount..." 
        style={inputStyle} 
      />
      <button onClick={handleClick} style={buttonStyle}>Focus Input</button>
    </div>
  );
};

// ==============================================================================
// MAIN APP COMPONENT
// ==============================================================================

function App() {
  return (
    // 7. Wrap App with Provider (For Exercise 4)
    <ContactProvider>
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>React Hooks Exercises (TS)</h1>

        {/* Exercise 1 */}
        <UserProfileManager />
        <hr style={{ margin: '2rem 0', border: '0', borderTop: '1px solid #ddd' }} />

        {/* Exercise 2 */}
        <SurveyFeedback />
        <hr style={{ margin: '2rem 0', border: '0', borderTop: '1px solid #ddd' }} />

        {/* Exercise 3 */}
        <ContactForm />
        <hr style={{ margin: '2rem 0', border: '0', borderTop: '1px solid #ddd' }} />

        {/* Exercise 4 (Consuming Context) */}
        <ContactList />
        <hr style={{ margin: '2rem 0', border: '0', borderTop: '1px solid #ddd' }} />

        {/* Exercise 5 */}
        <RefFocusExample />

      </div>
    </ContactProvider>
  );
}

// Shared Styles
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
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box'
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default App;