import * as React from 'react';
import axios from 'axios';
import Message from '../Message/Message';

const FileUpload = () => {
  const [file, setFile] = React.useState();
  const [fileName, setFileName] = React.useState('Choose File');
  const [uploadedFile, setUploadedFile] = React.useState();
  const [message, setMessage] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const upFile = e.target.files ? e.target.files[0] : null;

    if (upFile) {
      const upName = upFile.name;

      setFile(upFile);
      setFileName(upName);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Contant-Type': 'multipart/form-data'
        }
      });

      setUploadedFile({ ...res.data });
      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <React.Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            className="custom-file-input"
            type="file"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>

        <input
          className="btn btn-primary btn-block mt-4"
          type="submit"
          value="Upload"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              style={{ width: '100%' }}
              src={uploadedFile.filePath}
              alt={uploadedFile.filePath}
            />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default FileUpload;