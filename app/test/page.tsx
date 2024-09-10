"use client";
import React, { useState } from "react";

function DirectoryUpload() {
  const [files, setFiles] = useState<
    Array<{ name: string; path: string; url?: string }>
  >([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles).map((file) => {
        const url = URL.createObjectURL(file);
        return {
          name: file.name,
          path: file.webkitRelativePath || file.name,
          url, // Add a URL for image preview
        };
      });

      setFiles(fileArray);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <label
        htmlFor="directory-upload"
        className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded"
      >
        Upload Directory
      </label>
      <input
        id="directory-upload"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex-grow"></div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {files.map((file, index) => (
          <div key={index} className="mb-2">
            {file.url && (
              <img src={file.url} alt={file.name} className="max-w-xs h-auto" />
            )}
            <p>{file.path}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DirectoryUpload;
