const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;
const BASE_DIRECTORY = path.join(__dirname, 'files'); // Diretório onde os arquivos serão salvos

app.use(cors()); // Permite comunicação com o frontend
app.use(express.json()); // Permite receber JSON no body das requisições

// 📂 Listar arquivos
app.get('/files', async (req, res) => {
    try {
        const files = await fs.readdir(BASE_DIRECTORY);
        res.json({ files });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✍️ Criar arquivo
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

// ✏️ Editar arquivo
app.put('/files/:name', async (req, res) => {
    const { content } = req.body;
    const filePath = path.join(BASE_DIRECTORY, req.params.name);

    try {
        await fs.access(filePath); // Verifica se o arquivo existe
        await fs.writeFile(filePath, content || '');
        res.json({ message: '✅ File edited successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🗑️ Deletar arquivo
app.delete('/files/:name', async (req, res) => {
    const filePath = path.join(BASE_DIRECTORY, req.params.name);

    try {
        await fs.unlink(filePath);
        res.json({ message: '✅ File deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🚀 Iniciar servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
