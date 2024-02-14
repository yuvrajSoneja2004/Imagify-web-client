import React, { useEffect, useState } from 'react';

interface TimeAgoProps {
  createdAt: Date; // Assuming createdAt is a string representing a date
  fs: 'sm' | 'lg';
}

const TimeAgo: React.FC<TimeAgoProps> = ({ createdAt, fs }) => {
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date();
      const postTime = new Date(createdAt);
      const timeDifference = Math.abs(currentTime - postTime); // Handle potential negative timeDifference

      if (timeDifference < 60000) {
        // Less than a minute
        setTimeAgo(`${Math.round(timeDifference / 1000)} secs`);
      } else if (timeDifference < 3600000) {
        // Less than an hour
        setTimeAgo(`${Math.round(timeDifference / 60000)} minutes`);
      } else if (timeDifference < 86400000) {
        // Less than a day
        setTimeAgo(`${Math.round(timeDifference / 3600000)} hours`);
      } else if (timeDifference < 31536000000) {
        // Less than a year (365 days)
        setTimeAgo(`${Math.round(timeDifference / 86400000)} days`);
      } else {
        // More than a year
        setTimeAgo(`${Math.round(timeDifference / 31536000000)} years`);
      }
    };

    // Initial calculation
    calculateTimeAgo();

    // Update the time every minute
    const intervalId = setInterval(calculateTimeAgo, 60000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [createdAt]);

  return <span style={{ fontSize: fs == 'sm' ? '13px' : '16px' }}>{`${timeAgo} ago`}</span>;
};

export default TimeAgo;
