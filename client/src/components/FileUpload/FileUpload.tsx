import * as React from 'react';
import Message from '../Message/Message';
import Progress from '../Progress/Progress';
import uploadFile from '../../services/uploadFile';

const FileUpload = () => {
  const [file, setFile] = React.useState();
  const [filename, setFilename] = React.useState('Choose File');
  const [uploadedFile, setUploadedFile] = React.useState();
  const [message, setMessage] = React.useState('');
  const [uploadPercentage, setUploadPercentage] = React.useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('file', file);

    uploadFile(formData, setUploadPercentage).then(
      data => {
        setUploadedFile({ ...data });
        setMessage('File Uploaded');
      },
      err => setMessage(err)
    );
  };

  return (
    <React.Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <button className="btn btn-primary btn-block mt-4" type="submit">
          Upload
        </button>
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default FileUpload;
