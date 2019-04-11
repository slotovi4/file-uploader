import axios from 'axios';

const uploadFile = async (
  data: FormData,
  setPercentage: (num: number) => void
) => {
  const axiosInstance = axios.create({
    validateStatus: status => {
      return status >= 200 && status <= 503;
    }
  });

  const res = await axiosInstance.post('/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: ({ loaded, total }) => {
      setPercentage(Math.round((loaded * 100) / total));

      // Clear percentage
      setTimeout(() => setPercentage(0), 10000);
    }
  });

  const resStatus = res.status;

  if (resStatus === 200) {
    return res.data;
  } else if (resStatus === 500) {
    return Promise.reject('There was a problem with the server');
  }

  return Promise.reject(res.statusText);
};

export default uploadFile;
