import * as React from 'react';

interface IProps {
  msg: string;
}

const Message = ({ msg }: IProps) => (
  <div className="alert alert-info alert-dismissible fade show" role="alert">
    {msg}
    <button
      className="close"
      type="button"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

export default Message;
