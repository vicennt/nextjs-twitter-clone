import { useEffect, useState } from "react";

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const getDateDiffs = (timestamp) => {
  const now = Date.now();
  const elapsed = (timestamp - now) / 1000; // convertimos a segundos

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "seconds") {
      const value = Math.floor(elapsed / secondsInUnit);
      console.log(value, unit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => {
    return getDateDiffs(timestamp);
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp);
      setTimeago(newTimeAgo);
    }, 1000);
    return () => clearInterval(timeout);
  }, [timestamp]);

  const relativeTimeFormat = new Intl.RelativeTimeFormat("es", {
    style: "short",
  });
  const { value, unit } = timeago;
  return relativeTimeFormat.format(value, unit);
}
