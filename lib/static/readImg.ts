import fs from 'fs';
import path from 'path';
export const readImg = () => {
  const FILE_PATH = './default_user.png';
  console.log(FILE_PATH);
  try {
    const imageData = fs.readFileSync(FILE_PATH);
    // Convert the binary data to base64
    const base64Data = imageData.toString('base64');
    return base64Data;
  } catch (error) {
    console.error('Error reading or converting the image:', error);
    return error;
  }
};
