import { createElement, useEffect, useState } from "react";
import axios from "axios";
import {  toast } from "react-toastify";


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
            toast.error("Error fetching file:");

        }
    };

    const createFile = async () => {
        if (!fileName) return toast.warning("File name is required!");
        try {
            await axios.post(API_URL, { name: fileName, content: fileContent });
            setFileName("");
            setFileContent("");
            fetchFiles();
            toast.success("File created!");
        } catch (error) {
            console.error("Error creating file:", error);
            toast.error("Error creating file:");

        }
    };
    
    const saveFile = async () => {
        if (!fileName) return toast.warning("No file selected!");
    
        const fileEditContent = document.getElementById("fileContentArea") as HTMLTextAreaElement;
        
        if (!fileEditContent) return;
    
        try {
            await axios.put(`${API_URL}/${fileName}`, { content: fileEditContent.value });
            setFileContent(fileEditContent.value); 
            fetchFiles(); 
            toast.success("Changes Saved!");

        } catch (error) {
            console.error("Error saving file:", error);
            toast.error("Error saving file:");

        }
    };
    

    const deleteFile = async (name: string) => {
        setFileName("");
        setFileContent("");
        try {
            await axios.delete(`${API_URL}/${name}`);
            fetchFiles();
            toast.success("File deleted!");
        } catch (error) {
            console.error("Error deleting file:", error);
            toast.error("Error deleting file:");

        }
    };

    const showFile = async (name: string) => {
        try {
            const response = await axios.get(`${API_URL}/${encodeURIComponent(name)}`);
            setFileName(name);
            setFileContent(response.data.content || "");
        } catch (error) {
            console.error("Error fetching file content:", error);
            toast.error("Error fetching file:");

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
                    id="fileContentArea"
                    className="border p-2 w-full"
                    placeholder="File content here..."
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                />
                
                
            </div>

            <div className="mb-4 w-full flex flex-col">
            <button
                    id = "createButton"
                    className="bg-blue-500 text-white p-2 mt-2 w-full rounded"
                    onClick={createFile}
                >
                    Create File
                </button>
            </div>

            <table className="mt-4 w-full flex flex-col">
                <tbody>
                    {files.length ? (
                        files.map((file) => (
                            <tr key={file} className="border-b p-2 bg-white shadow-sm">
                                <td>
                                    <button className="text-blue-500" onClick={() => showFile(file)}>
                                        {file}
                                    </button>
                                </td>

                                <td>
                                <button
        className="bg-yellow-500 text-white p-2 mt-2 w-full rounded"
        onClick={saveFile}  
    >
        ✍️ Save Changes
    </button>
                                </td>
                                <td>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                        onClick={() => deleteFile(file)}
                                    >
                                        🗑️ Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} className="text-center p-4">No files found.</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );

};

export default FileManager;