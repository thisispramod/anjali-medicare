import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Setup multer for file uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Database connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'anjali_medicare',
});

// Create tables if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS service_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    machine_name VARCHAR(255) NOT NULL,
    issue_description TEXT NOT NULL,
    file_path VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error("Error creating table service_requests: ", err);
  else console.log("Table 'service_requests' ready.");
});

db.query(`
  CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    product VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Cold',
    followUp VARCHAR(50),
    assignedTo VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error("Error creating table leads: ", err);
  else console.log("Table 'leads' ready.");
});

// API endpoint to post a service request
app.post('/api/service-requests', upload.single('file'), (req, res) => {
  const { machine_name, issue_description } = req.body;
  const file_path = req.file ? req.file.path : null;

  if (!machine_name || !issue_description) {
    return res.status(400).json({ error: 'Machine name and issue description are required.' });
  }

  const query = 'INSERT INTO service_requests (machine_name, issue_description, file_path) VALUES (?, ?, ?)';
  db.query(query, [machine_name, issue_description, file_path], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Service request created', id: results.insertId });
  });
});

app.get('/api/service-requests', (req, res) => {
  db.query('SELECT * FROM service_requests ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

// Leads Endpoints
app.post('/api/leads/bulk', (req, res) => {
  const leads = req.body; // Expecting an array
  if (!Array.isArray(leads) || leads.length === 0) {
    return res.status(400).json({ error: 'Array of leads required' });
  }

  const values = leads.map(l => [
    l.name, l.phone, l.company, l.product, l.status, l.followUp, l.assignedTo
  ]);

  const query = 'INSERT INTO leads (name, phone, company, product, status, followUp, assignedTo) VALUES ?';
  db.query(query, [values], (err, results) => {
    if (err) {
      console.error("Bulk insert failed:", err.message);
      return res.status(500).json({ 
        error: 'Database error during bulk insert', 
        details: err.message 
      });
    }
    console.log(`Successfully imported ${results.affectedRows} leads.`);
    res.status(201).json({ message: 'Bulk leads imported', count: results.affectedRows });
  });
});

app.post('/api/leads', (req, res) => {
  const { name, phone, company, product, status, followUp, assignedTo } = req.body;

  const query = 'INSERT INTO leads (name, phone, company, product, status, followUp, assignedTo) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, phone, company, product, status, followUp, assignedTo], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: results.insertId, name, phone, company, product, status, followUp, assignedTo });
  });
});

app.get('/api/leads', (req, res) => {
  db.query('SELECT * FROM leads ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on port ${PORT}`);
});
