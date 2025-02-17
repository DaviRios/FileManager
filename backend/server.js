const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;
const BASE_DIRECTORY = path.join(__dirname, 'files'); // Default directory save

app.use(cors()); // Com. frontend
app.use(express.json()); // Json body access

// 📂 File List
app.get('/files', async (req, res) => {
    try {
        const files = await fs.readdir(BASE_DIRECTORY); 
        res.json({ files });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📂 File content search
app.get('/files/:name', async (req, res) => {
    const fileName = decodeURIComponent(req.params.name);
    const filePath = path.join(BASE_DIRECTORY, fileName); 
    
    try {
        const content = await fs.readFile(filePath, 'utf8'); 
        res.json({ content });
    } catch (err) {
        res.status(404).json({ error: "File not found" });
    }
});

// ✍️ Create File
app.post('/files', async (req, res) => {
    const { name, content } = req.body;
    if (!name) return res.status(400).json({ error: 'File name is required' });

    const filePath = path.join(BASE_DIRECTORY, name);
    try {
        await fs.mkdir(BASE_DIRECTORY, { recursive: true });
        await fs.writeFile(filePath, content || '');
        res.json({ message: '✅ File created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✏️ Edit File
app.put('/files/:name', async (req, res) => {
    const { content } = req.body;
    const filePath = path.join(BASE_DIRECTORY, req.params.name);

    try {
        await fs.access(filePath); // Verify if file exists
        await fs.writeFile(filePath, content || ''); 
        res.json({ message: '✅ File edited successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🗑️ Delete File
app.delete('/files/:name', async (req, res) => {
    const filePath = path.join(BASE_DIRECTORY, req.params.name);

    try {
        await fs.unlink(filePath); 
        res.json({ message: '✅ File deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🚀 Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
