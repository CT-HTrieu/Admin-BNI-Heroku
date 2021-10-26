import axios from 'axios';

export default async function upload(formData) {
  try {
    const { data } = await axios.post(
      'https://image-service.patitek.com/api/v1/images/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
}
