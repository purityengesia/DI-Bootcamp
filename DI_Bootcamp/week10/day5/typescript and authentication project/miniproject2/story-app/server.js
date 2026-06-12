/* 
  FULL STACK COLLABORATIVE STORY APP (Monolith Simulation)
  
  Concepts Covered:
  - Node.js/Express Backend
  - JWT Access & Refresh Tokens (with httpOnly cookies)
  - Bcrypt Password Hashing
  - CRUD Operations (REST)
  - "Redux-Logic" State Management
  - DaisyUI/Tailwind Styling
  - TypeScript-style JSDoc typing
*/

require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// --- CONFIGURATION ---
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_access_key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'supersecret_refresh_key';

// --- MIDDLEWARE ---
app.use(cors({ origin: true, credentials: true })); // Allow cookies
app.use(express.json());

// --- MOCK DATABASE (PostgreSQL Simulation) ---
const db = {
  users: [],
  stories: [],
  contributors: []
};

// Seed Admin User
(async () => {
  const hash = await bcrypt.hash('password123', 10);
  db.users.push({ id: 1, username: 'AdminUser', email: 'admin@test.com', password_hash: hash });
  db.stories.push({ 
    id: 101, 
    title: 'The First Story', 
    content: 'Once upon a time...', 
    author_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  });
})();

// --- BACKEND CONTROLLERS & ROUTES ---

// 1. AUTH: REGISTER
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "All fields required." });

    // Check duplicate
    if (db.users.find(u => u.email === email)) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash Password (Security Requirement)
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const newUser = {
      id: db.users.length + 1,
      username,
      email,
      password_hash
    };
    db.users.push(newUser);

    // Auto-login (Generate tokens)
    const { accessToken, refreshToken } = generateTokens(newUser.id);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
    
    res.status(201).json({ user: { id: newUser.id, username, email }, accessToken });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 2. AUTH: LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db.users.find(u => u.email === email);

    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    // Verify Password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    const { accessToken, refreshToken } = generateTokens(user.id);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ user: { id: user.id, username: user.username, email: user.email }, accessToken });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 3. AUTH: REFRESH TOKEN
app.post('/api/refresh', (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(403);

  jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  });
});

// Helper: Generate Tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// Middleware: Authenticate JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// 4. STORIES: CRUD
app.get('/api/stories', authenticateToken, (req, res) => {
  // Join logic simulation
  const storiesWithAuthors = db.stories.map(s => {
    const author = db.users.find(u => u.id === s.author_id);
    return { ...s, author };
  });
  res.json(storiesWithAuthors);
});

app.post('/api/stories', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const newStory = {
    id: db.stories.length + 101,
    title,
    content,
    author_id: req.user.userId,
    created_at: new Date(),
    updated_at: new Date()
  };
  db.stories.push(newStory);
  res.status(201).json(newStory);
});

app.patch('/api/stories/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const story = db.stories.find(s => s.id == id);

  // Authorization: Author only
  if (story.author_id !== req.user.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  story.content = content;
  story.updated_at = new Date();
  
  // Broadcast for collaboration
  io.emit('story_update', story);
  
  res.json(story);
});

// --- FRONTEND (React + Redux-Logic + DaisyUI) ---
const frontendHTML = `
<!DOCTYPE html>
<html data-theme="dark" lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Collaborative Stories</title>
  <!-- Tailwind + DaisyUI -->
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.4.19/dist/full.min.css" rel="stylesheet" type="text/css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- React & Babel -->
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="/socket.io/socket.io.js"></script>
</head>
<body>
  <div id="root"></div>
  
  <script type="text/babel">
    const { useState, useEffect, useContext, createContext } = React;
    const socket = io();

    // --- REDUX-LIKE STORE (State Management) ---
    // Using Context to mimic Redux Toolkit Slices
    
    const StoreContext = createContext();

    const initialState = {
      user: null, // { id, username, email }
      token: null, // Access token (in memory)
      stories: [],
      loading: false,
      view: 'home', // 'home', 'login', 'story', 'register'
      activeStory: null
    };

    const reducer = (state, action) => {
      switch (action.type) {
        case 'SET_USER': return { ...state, user: action.payload };
        case 'SET_TOKEN': return { ...state, token: action.payload };
        case 'SET_STORIES': return { ...state, stories: action.payload };
        case 'SET_VIEW': return { ...state, view: action.payload };
        case 'SET_ACTIVE_STORY': return { ...state, activeStory: action.payload };
        case 'LOGOUT': return { ...state, user: null, token: null, view: 'login' };
        default: return state;
      }
    };

    const StoreProvider = ({ children }) => {
      const [state, dispatch] = React.useReducer(reducer, initialState);
      return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
    };

    const useStore = () => useContext(StoreContext);

    // --- API UTILS (With Refresh Token Logic) ---
    
    const api = async (endpoint, method = 'GET', body = null) => {
      const { state, dispatch } = useStore(); // Note: This is a simplification. 
      // In real Redux, this would be a Thunk outside the component.
      
      let token = state.token;
      
      const makeRequest = async (tok) => {
        const headers = { 'Content-Type': 'application/json' };
        if (tok) headers['Authorization'] = \`Bearer \${tok}\`;

        const res = await fetch(endpoint, {
          method,
          headers,
          credentials: 'include', // Vital for httpOnly cookies
          body: body ? JSON.stringify(body) : null
        });
        return res;
      };

      let res = await makeRequest(token);

      // 403/401 Handling: Try Refresh
      if (res.status === 403 || res.status === 401) {
        console.log("Token expired, refreshing...");
        const refreshRes = await fetch('/api/refresh', { method: 'POST', credentials: 'include' });
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          dispatch({ type: 'SET_TOKEN', payload: data.accessToken });
          res = await makeRequest(data.accessToken); // Retry original request
        } else {
          dispatch({ type: 'LOGOUT' });
          return null;
        }
      }
      return res.json().catch(() => null);
    };

    // --- COMPONENTS ---

    const Navbar = () => {
      const { state, dispatch } = useStore();
      
      return (
        <div className="navbar bg-base-100 shadow-lg">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl" onClick={() => dispatch({type: 'SET_VIEW', payload: 'home'})}>StoryApp</a>
          </div>
          <div className="flex-none gap-2">
            {state.user ? (
              <>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img alt="Avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li><a>Profile</a></li>
                    <li><a onClick={() => dispatch({type: 'LOGOUT'})}>Logout</a></li>
                  </ul>
                </div>
              </>
            ) : (
              <button className="btn btn-primary" onClick={() => dispatch({type: 'SET_VIEW', payload: 'login'})}>Login</button>
            )}
          </div>
        </div>
      );
    };

    const AuthForm = ({ mode }) => {
      const { dispatch } = useStore();
      const [formData, setFormData] = useState({ username: '', email: '', password: '' });

      const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = mode === 'login' ? '/api/login' : '/api/register';
        const body = mode === 'login' 
          ? { email: formData.email, password: formData.password }
          : formData;

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          credentials: 'include'
        });
        
        const data = await res.json();
        if (res.ok) {
          dispatch({ type: 'SET_USER', payload: data.user });
          dispatch({ type: 'SET_TOKEN', payload: data.accessToken });
          dispatch({ type: 'SET_VIEW', payload: 'home' });
        } else {
          alert(data.message);
        }
      };

      return (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold">{mode === 'login' ? 'Login' : 'Register'}</h2>
                
                {mode === 'register' && (
                  <div className="form-control">
                    <label className="label"><span className="label-text">Username</span></label>
                    <input type="text" placeholder="username" className="input input-bordered" 
                      value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
                  </div>
                )}

                <div className="form-control">
                  <label className="label"><span className="label-text">Email</span></label>
                  <input type="email" placeholder="email" className="input input-bordered" 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text">Password</span></label>
                  <input type="password" placeholder="password" className="input input-bordered" 
                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
                </div>

                <div className="text-center mt-2">
                  {mode === 'login' 
                    ? <span className="link link-hover" onClick={() => dispatch({type:'SET_VIEW', payload:'register'})}>No account? Register</span>
                    : <span className="link link-hover" onClick={() => dispatch({type:'SET_VIEW', payload:'login'})}>Have account? Login</span>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };

    const StoryEditor = ({ story }) => {
      const [content, setContent] = useState(story.content);
      
      // Real-time Socket listener
      useEffect(() => {
        socket.on('story_update', (updatedStory) => {
          if (updatedStory.id === story.id) {
            setContent(updatedStory.content);
          }
        });
        return () => socket.off('story_update');
      }, [story.id]);

      const handleSave = async () => {
        // In real app, we would call api('/api/stories/...', 'PATCH', { content })
        await fetch(\`/api/stories/\${story.id}\`, {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${localStorage.getItem('token')}\` // Simplified access for demo
          },
          body: JSON.stringify({ content }),
          credentials: 'include'
        });
        alert("Saved!");
      };

      return (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Editing: {story.title}</h3>
          <textarea className="textarea textarea-bordered w-full h-64" value={content} onChange={e => setContent(e.target.value)}></textarea>
          <button className="btn btn-accent mt-2" onClick={handleSave}>Save Changes</button>
        </div>
      );
    };

    const Home = () => {
      const { state, dispatch } = useStore();

      useEffect(() => {
        // Fetch Stories
        (async () => {
          const res = await fetch('/api/stories', {
            headers: { 'Authorization': \`Bearer \${state.token}\` },
            credentials: 'include'
          });
          if(res.ok) {
            const data = await res.json();
            dispatch({ type: 'SET_STORIES', payload: data });
          }
        })();
      }, [state.token, dispatch]);

      if (!state.user) return <div className="p-10">Please Login to view stories</div>;

      return (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">All Stories</h2>
            <button className="btn btn-primary" onClick={() => alert("Create Story Modal would open here")}>+ New Story</button>
          </div>
          
          {state.activeStory ? (
            <StoryEditor story={state.activeStory} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.stories.map(story => (
                <div key={story.id} className="card bg-base-100 shadow-xl cursor-pointer hover:bg-base-200" 
                     onClick={() => dispatch({ type: 'SET_ACTIVE_STORY', payload: story })}>
                  <div className="card-body">
                    <h2 className="card-title">{story.title}</h2>
                    <p>By {story.author?.username || 'Unknown'}</p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">Collaboration</div> 
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {state.activeStory && (
             <button className="btn btn-sm mt-4" onClick={() => dispatch({ type: 'SET_ACTIVE_STORY', payload: null })}>Back to List</button>
          )}
        </div>
      );
    };

    const App = () => {
      const { state } = useStore();
      
      // Persist Token Check on Load (in a real app, this checks localstorage or hits /refresh)
      // For this demo, we start logged out.

      if (state.view === 'login' || state.view === 'register') return <AuthForm mode={state.view} />;
      
      return (
        <div className="min-h-screen bg-base-200">
          <Navbar />
          <main>
            <Home />
          </main>
        </div>
      );
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );
  </script>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.send(frontendHTML);
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Mock DB initialized`);
});