import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/files";

interface FileData {
    files: string[];
}

const FileManager = () => {
    const [files, setFiles] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [fileContent, setFileContent] = useState<string>("");

    //Load Files
    const fetchFiles = async () => {
        try {
            const response = await axios.get<FileData>(API_URL);
            setFiles(response.data.files);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const createFile = async () => {
        if (!fileName) return alert("File name is required!");
        try {
            await axios.post(API_URL, { name: fileName, content: fileContent });
            setFileName("");
            setFileContent("");
            fetchFiles();
        } catch (error) {
            console.error("Error creating file:", error);
        }
    };

    const editFile = async (name: string) => {
        const newContent = prompt(`Edit content of ${name}:`);
        if (newContent !== null) {
            try {
                await axios.put(`${API_URL}/${name}`, { content: newContent });
                fetchFiles();
            } catch (error) {
                console.error("Error editing file:", error);
            }
        }
    };

    const deleteFile = async (name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                await axios.delete(`${API_URL}/${name}`);
                fetchFiles();
            } catch (error) {
                console.error("Error deleting file:", error);
            }
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">📂 File Manager</h2>
    
            <div className="mb-4 w-full flex flex-col">
                <input
                    className="border p-2 w-full mb-2"
                    type="text"
                    placeholder="File Name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
            </div>
            <div className="mb-4 w-full flex flex-col">
                <textarea
                    id="fileContent"
                    className="border p-2 w-full"
                    placeholder="File Content"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white p-2 mt-2 w-full rounded"
                    onClick={createFile}
                >
                    Create File
                </button>
            </div>
    
            <table className="mt-4 w-full flex flex-col">
                {files.length ? (
                    files.map((file) => (
                        <tr
                            key={file}
                            className="flex flex-col items-start border-b p-2 bg-white shadow-sm"
                        >
                            <span>{file}</span>
                            <div className="flex flex-col gap-2 mt-2">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    onClick={() => editFile(file)}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => deleteFile(file)}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </tr>
                    ))
                ) : (
                    <p>No files found.</p>
                )}
            </table>
        </div>
    );
    
};

export default FileManager;