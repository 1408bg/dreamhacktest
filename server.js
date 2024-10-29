const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  const { url } = req.query;

  // URL이 제공되지 않은 경우
  if (!url) {
    return res.status(400).send('URL is required');
  }

  // curl 명령어 실행
  exec(`curl ${url}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send('Error executing curl: ' + stderr);
    }
    res.send(stdout);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
