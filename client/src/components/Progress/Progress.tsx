import * as React from 'react';

interface IProps {
  percentage: number;
}

const Progress = ({ percentage }: IProps) => (
  <div className="progress">
    <div
      className="progress-bar progress-bar-striped bg-success"
      role="progressbar"
      style={{ width: `${percentage}%` }}
    >
      {percentage}%
    </div>
  </div>
);

export default Progress;
