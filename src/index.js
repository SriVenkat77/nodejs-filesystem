const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const folderPath = path.join(__dirname, '../files');

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// Welcome message at the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js File System API');
});

// Endpoint to create a file with the current timestamp
app.post('/create-file', (req, res) => {
  const timestamp = new Date().toISOString();
  const filename = `${timestamp.replace(/:/g, '-')}.txt`;
  const filePath = path.join(folderPath, filename);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating file', error: err });
    }
    res.status(200).json({ message: 'File created', filename });
  });
});

// Endpoint to retrieve all files in the folder
app.get('/files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving files', error: err });
    }
    res.status(200).json({ files });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
