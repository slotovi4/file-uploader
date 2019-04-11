import * as React from 'react';

const FileUpload = () => {
  return (
    <form>
      <div className="custom-file mb-4">
        <input type="file" className="custom-file-input" id="customFile" />
        <label className="custom-file-label" htmlFor="customFile">
          Choose file
        </label>
      </div>

      <input
        className="btn btn-primary btn-block mt-4"
        type="submit"
        value="Upload"
      />
    </form>
  );
};

export default FileUpload;
