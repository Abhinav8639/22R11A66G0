const axios = require('axios');
const url = 'http://20.244.56.144/evaluation-service/logs';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMnIxMWE2NmcwQGdjZXQuZWR1LmluIiwiZXhwIjoxNzU0MTExNjc3LCJpYXQiOjE3NTQxMTA3NzcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIyMzkyNTliNy1kOGJiLTRlODQtODMyYy00OGYwYjYzNGIzNjciLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJkYXNhcmkgYWJoaW5hdiIsInN1YiI6IjZmMTZkNTY2LThkYTItNDFhNy04MTRjLTZmZDQ5YTdmZDE1YSJ9LCJlbWFpbCI6IjIycjExYTY2ZzBAZ2NldC5lZHUuaW4iLCJuYW1lIjoiZGFzYXJpIGFiaGluYXYiLCJyb2xsTm8iOiIyMnIxMWE2NmcwIiwiYWNjZXNzQ29kZSI6InpmVHF2ZyIsImNsaWVudElEIjoiNmYxNmQ1NjYtOGRhMi00MWE3LTgxNGMtNmZkNDlhN2ZkMTVhIiwiY2xpZW50U2VjcmV0IjoidHR6RFdyZkNFc0VUWmZaaCJ9.g8y-SWRCGRpG4HmSJ2JYe9ie6K0CTsSUL1SaGLjANmE';

async function affordmedLogger({ stack, level, package: pkg, message }) {
  try {
    await axios.post(url, { stack, level, package: pkg, message }, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.log('log failed:', err.message);
  }
}

module.exports = affordmedLogger;
