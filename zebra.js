const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function printZpl(zpl) {
  return new Promise((resolve, reject) => {
    const tmpFilePath = path.join(__dirname, 'print.zpl');
    const printerShareName = 'Zebra'; // Adjust this if needed

    fs.writeFile(tmpFilePath, zpl, (err) => {
      if (err) return reject(err);

      const command = `copy /B "${tmpFilePath}" \\\\localhost\\${printerShareName}`;
      exec(command, (error, stdout, stderr) => {
        fs.unlinkSync(tmpFilePath); // Cleanup file

        if (error) return reject(stderr || error.message);
        resolve(stdout);
      });
    });
  });
}

module.exports = { printZpl };
