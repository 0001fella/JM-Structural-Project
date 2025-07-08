import fs from 'fs';
import path from 'path';

export const validateFileType = (filePath, allowedExtensions) => {
  const ext = path.extname(filePath).toLowerCase();
  return allowedExtensions.includes(ext);
};

export const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Error deleting file: ${filePath}`, err);
  });
};

export const readFileMetadata = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) return reject(err);
      resolve({
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime
      });
    });
  });
};