import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
import { set } from 'date-fns';

function ExcelDataEntry() {
    const { adminId } = useParams();
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState(''); // Added for success/error styling
    const [selectedDataType, setSelectedDataType] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [Loading, setLoading] = useState(true);

    const navigationItems = [
        { root: '/', label: 'Home' },
        { root: `/admin-dashboard/${adminId}`, label: 'Dashboard' },
        { root: `/admin-data-entry/${adminId}`, label: 'Data Entry' },
    ];

    const handleDownloadClick = async () => {
        if (!selectedDataType) {
            showAlert("Please select a data type");
            return;
        }

        try {
            showAlert('Downloading...', "success");
            const response = await fetch(`http://localhost:3000/download-excel-template-${selectedDataType}`);
            if (!response.ok) {
                showAlert("Error downloading template");
                return;
            }

            const blob = await response.blob();
            const downloadLink = document.createElement("a");
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = `${selectedDataType}-template.xlsx`;
            downloadLink.click();
            showAlert('Download completed', "success");
        } catch (error) {
            showAlert(`Error: ${error.message}`);
        }
    };

    const handleUploadClick = () => {
        // Trigger file input click event
        if (!selectedDataType) {
            showAlert("Please select a data type");
            return;
        }
        fileTypeInputRef.current.click();
    };

    useEffect(() => {
        const uploadFile = async () => {
            if (Loading) {
                setLoading(false);
            } else if (!selectedFile || !selectedDataType) {
                showAlert("Please select a file and data type");

            } else {
                const formData = new FormData();
                formData.append('excelFile', selectedFile);

                try {
                    showAlert('Uploading...', "success");
                    const response = await fetch(`http://localhost:3000/upload-excel-file-${selectedDataType}`, {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        showAlert('Data uploaded and processed successfully', "success");
                        setSelectedFile(null);
                        setLoading(true);
                    } else {
                        const errorMessage = await response.text();
                        showAlert(`Error: ${errorMessage}`);
                    }
                } catch (error) {
                    showAlert(`Error: ${error.message}`);
                }
            }
        }

        uploadFile();
    }, [selectedFile]);



    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };


    const showAlert = (message, type = 'error') => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage('');
        }, 3000);
    };

    const fileTypeInputRef = React.createRef();

    return (
        <div className="bg-gray-200 h-screen overflow-hidden">
            <Navbar navItems={navigationItems} />
            <div className="flex justify-center items-center min-h-screen ">
                <div className="container max-w-md bg-white rounded-lg shadow-lg p-4 text-center mt-[-250px]">
                    <h1 className="text-2xl font-bold mb-4">Data Entry</h1>
                    {alertMessage && (
                        <div
                            className={`${alertType === 'success' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'
                                } p-2 rounded-md mb-4`}
                        >
                            {alertMessage}
                        </div>
                    )}
                    <div className="data-section">
                        <div className="select-container mb-5  text-left">
                            <label htmlFor="data-type">Select Data Type:</label>
                            <select
                                id="data-type"
                                className="mt-4 w-full p-2 border rounded-lg"
                                onChange={(e) => setSelectedDataType(e.target.value)}
                                value={selectedDataType}
                            >
                                <option value="">Choose...</option>
                                <option value="student">Students</option>
                                <option value="course">Courses</option>
                                <option value="department">Departments</option>
                                <option value="instructor">Instructors</option>
                                <option value="enrollments">Enrollments</option>
                                <option value="teachings">Teachings</option>
                            </select>
                        </div>
                        <button
                            className=" bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={handleDownloadClick}
                        >
                            Download Template
                        </button>
                        <input
                            type="file"
                            id="file-input"
                            accept=".xlsx"
                            className="hidden"
                            onChange={handleFileChange}
                            ref={fileTypeInputRef}
                        />

                        <button
                            className="ml-7 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={handleUploadClick}
                        >
                            Upload Filled File
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExcelDataEntry;
