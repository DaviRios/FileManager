 📂 File Manager

A file management system built with Node.js and a web-based frontend.  
This application allows users to create, edit, view, and delete files through a simple UI.

 🚀 Technologies Used

- Frontend: React (TSX), TailwindCSS  
- Backend: Node.js, Express  
- HTTP Requests: Axios  
- Languages:  
  - JavaScript (41.0%)  
  - TypeScript (40.5%)  
  - CSS (16.1%)  
  - HTML (2.4%)  

 📌 Features

- 📁 Create new files with content  
- ✏️ Edit and save existing files  
- 📜 List available files  
- 👀 View file contents  
- 🗑 Delete files  

 🛠 Installation & Usage

1️⃣ Clone the repository  

bash
git clone https://github.com/DaviRios/MyTasks.git
cd MyTasks

2️⃣ Install dependencies
bash
Copiar
Editar
npm install

3️⃣ Start the backend
bash
Copiar
Editar
cd backend
npm start

4️⃣ Start the frontend
bash
Copiar
Editar
cd frontend
npm run dev

The project will be available at http://localhost:5173.

📡 API Endpoints

Method	Route	Description
GET	/files	List all files
GET	/files/:name	Get file content
POST	/files	Create a new file
PUT	/files/:name	Edit file content
DELETE	/files/:name	Delete a file

⚖️ License
This project is licensed under the MIT License. See LICENSE for details.
