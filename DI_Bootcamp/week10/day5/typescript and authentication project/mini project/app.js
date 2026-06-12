const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// --- 1. IN-MEMORY DATABASE (MOCK) ---
const db = {
  users: [
    { id: 1, username: 'AdminUser', email: 'admin@story.com', avatar: 'https://i.pravatar.cc/150?img=11' }
  ],
  stories: [
    { 
      id: 101, 
      title: 'The Beginning', 
      content: 'Once upon a time...', 
      authorId: 1, 
      commentsEnabled: true 
    }
  ],
  comments: [], // { id, storyId, userId, text, timestamp }
  versions: []  // { id, storyId, content, timestamp }
};

// --- 2. BACKEND MIDDLEWARE ---
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- 3. API ENDPOINTS ---

// COMMENTS SYSTEM
app.get('/api/comments/:storyId', (req, res) => {
  const storyComments = db.comments.filter(c => c.storyId == req.params.storyId);
  res.json(storyComments);
});

app.post('/api/comments', (req, res) => {
  const { storyId, text } = req.body;
  const newComment = {
    id: Date.now(),
    storyId: parseInt(storyId),
    userId: 1, // Hardcoded for demo
    text,
    timestamp: new Date().toISOString()
  };
  db.comments.push(newComment);
  res.json(newComment);
});

app.patch('/api/comments/:id', (req, res) => {
  const comment = db.comments.find(c => c.id == req.params.id);
  if (comment && comment.userId === 1) {
    comment.text = req.body.text;
    res.json(comment);
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
});

app.delete('/api/comments/:id', (req, res) => {
  const index = db.comments.findIndex(c => c.id == req.params.id);
  if (index > -1) {
    const comment = db.comments[index];
    // Allow delete if author OR story author
    if (comment.userId === 1 || db.stories.find(s => s.id === comment.storyId).authorId === 1) {
      db.comments.splice(index, 1);
      res.json({ success: true });
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// VERSION CONTROL
app.get('/api/versions/:storyId', (req, res) => {
  const versions = db.versions
    .filter(v => v.storyId == req.params.storyId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  res.json(versions);
});

app.post('/api/stories/:id/restore/:versionId', (req, res) => {
  const story = db.stories.find(s => s.id == req.params.id);
  const version = db.versions.find(v => v.id == req.params.versionId);
  if (story && version) {
    story.content = version.content;
    // Broadcast update to all clients
    io.emit('story_update', story);
    res.json(story);
  } else {
    res.status(404).send("Not found");
  }
});

// USER PROFILE
app.get('/api/profile', (req, res) => {
  // Mock aggregations
  const user = db.users[0];
  const storiesCreated = db.stories.filter(s => s.authorId === user.id).length;
  res.json({ ...user, stats: { storiesCreated } });
});

// STORY CRUD (Saves version automatically)
app.put('/api/stories/:id', (req, res) => {
  const story = db.stories.find(s => s.id == req.params.id);
  if (story) {
    // Create Version before saving
    db.versions.push({
      id: Date.now(),
      storyId: story.id,
      content: story.content,
      timestamp: new Date().toISOString()
    });

    // Update story
    story.content = req.body.content;
    
    // Broadcast Real-time update
    io.emit('story_update', story);
    res.json(story);
  }
});

app.get('/api/stories/:id', (req, res) => {
  const story = db.stories.find(s => s.id == req.params.id);
  res.json(story);
});

// --- 4. REAL-TIME COLLABORATION (WEBSOCKETS) ---
io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a specific story room
  socket.on('join_story', (storyId) => {
    socket.join(storyId);
  });

  // Handle cursor movement
  socket.on('cursor_move', (data) => {
    socket.to(data.storyId).emit('remote_cursor', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// --- 5. FRONTEND (REACT) ---
// We serve the HTML as a string to keep it in one file
const frontendHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Collab Story App</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="/socket.io/socket.io.js"></script>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f4f4f9; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;}
    .editor { width: 100%; height: 200px; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; }
    .section-title { margin-top: 30px; border-bottom: 2px solid #333; padding-bottom: 5px; }
    .comment-box { background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 4px; border: 1px solid #eee; }
    .version-item { cursor: pointer; padding: 5px; border-bottom: 1px solid #eee; }
    .version-item:hover { background: #f0f0f0; }
    .cursor { position: absolute; width: 2px; height: 20px; background: red; pointer-events: none; }
    .cursor-label { position: absolute; top: -20px; left: 0; background: red; color: white; font-size: 10px; padding: 2px; border-radius: 2px; }
  </style>
</head>
<body>
  <div id="root"></div>
  
  <script type="text/babel">
    const { useState, useEffect, useRef } = React;
    const socket = io();

    // --- COMPONENTS ---

    const Profile = () => {
      const [user, setUser] = useState(null);
      useEffect(() => {
        fetch('/api/profile').then(r => r.json()).then(setUser);
      }, []);

      if (!user) return <div>Loading Profile...</div>;
      return (
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <img src={user.avatar} alt="Avatar" style={{width: 50, height: 50, borderRadius: '50%'}} />
          <div>
            <strong>{user.username}</strong><br/>
            <small>Stories: {user.stats?.storiesCreated}</small>
          </div>
          <button onClick={() => alert('Shared to X!')}>Share</button>
        </div>
      );
    };

    const VersionControl = ({ storyId }) => {
      const [versions, setVersions] = useState([]);
      
      const loadVersions = () => {
        fetch(\`/api/versions/\${storyId}\`).then(r => r.json()).then(setVersions);
      };

      const restore = (vid) => {
        if(confirm("Restore this version? Current edits will be saved as a new version.")) {
          fetch(\`/api/stories/\${storyId}/restore/\${vid}\`, { method: 'POST' })
            .then(() => window.location.reload());
        }
      };

      return (
        <div>
          <h3 className="section-title">Version Control</h3>
          <button onClick={loadVersions}>Load History</button>
          <ul>
            {versions.map(v => (
              <li key={v.id} className="version-item" onClick={() => restore(v.id)}>
                {new Date(v.timestamp).toLocaleTimeString()}: {v.content.substring(0, 30)}...
              </li>
            ))}
          </ul>
        </div>
      );
    };

    const Comments = ({ storyId }) => {
      const [comments, setComments] = useState([]);
      const [text, setText] = useState("");

      const loadComments = () => {
        fetch(\`/api/comments/\${storyId}\`).then(r => r.json()).then(setComments);
      };

      // Optimistic Update: Add to UI immediately, then sync
      const postComment = async () => {
        if(!text) return;
        const tempId = Date.now();
        const optimisticComment = { id: tempId, text, userId: 999, timestamp: new Date() };
        
        setComments(prev => [...prev, optimisticComment]); // 1. Update UI
        
        await fetch('/api/comments', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ storyId, text })
        }); // 2. Server request
        
        setText("");
        loadComments(); // 3. Refresh to get true server state
      };

      useEffect(() => { loadComments(); }, [storyId]);

      return (
        <div>
          <h3 className="section-title">Comments</h3>
          <div style={{display: 'flex', gap: '10px'}}>
            <input value={text} onChange={e => setText(e.target.value)} placeholder="Write a comment..." style={{flex:1}} />
            <button onClick={postComment}>Post</button>
          </div>
          {comments.map(c => (
            <div key={c.id} className="comment-box">
              <small>{new Date(c.timestamp).toLocaleString()}</small>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      );
    };

    const App = () => {
      const [story, setStory] = useState({ content: "" });
      const [remoteCursors, setRemoteCursors] = useState([]);
      const textareaRef = useRef(null);

      // Load Initial Story
      useEffect(() => {
        fetch('/api/stories/101').then(r => r.json()).then(setStory);
        socket.emit('join_story', 101);
      }, []);

      // Real-time Socket Listeners
      useEffect(() => {
        // Listen for text updates from other users
        socket.on('story_update', (updatedStory) => {
           // Avoid overwriting if user is typing (simple conflict avoidance for demo)
           if(document.activeElement !== textareaRef.current) {
             setStory(updatedStory);
           }
        });

        // Listen for cursors
        socket.on('remote_cursor', (data) => {
           setRemoteCursors(prev => {
             const filtered = prev.filter(c => c.userId !== data.userId);
             return [...filtered, data];
           });
           // Remove cursor after 2 seconds of inactivity
           setTimeout(() => {
             setRemoteCursors(prev => prev.filter(c => c.userId !== data.userId));
           }, 2000);
        });

        return () => socket.disconnect();
      }, []);

      // Handle Text Change
      const handleChange = (e) => {
        const newContent = e.target.value;
        setStory({ ...story, content: newContent });
        
        // Debounce API Save
        clearTimeout(window.saveTimer);
        window.saveTimer = setTimeout(() => {
          fetch('/api/stories/101', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ content: newContent })
          });
        }, 1000);

        // Emit cursor pos
        socket.emit('cursor_move', { userId: 'remote_user', pos: e.target.selectionStart, storyId: 101 });
      };

      return (
        <div className="container">
          <div className="header">
            <h1>Advanced Story App</h1>
            <Profile />
          </div>
          
          <textarea 
            ref={textareaRef}
            className="editor" 
            value={story.content} 
            onChange={handleChange} 
            placeholder="Start typing..."
          />

          <div style={{display: 'flex', justifyContent: 'space-between'}}>
             <span style={{color: 'green'}}>Auto-saving...</span>
             <span>Real-time collaboration active</span>
          </div>

          <Comments storyId={101} />
          <VersionControl storyId={101} />
        </div>
      );
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.send(frontendHTML);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});