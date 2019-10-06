import * as React from "react";

const UNITS: Array<[string, number]> = [
  ["years", 365 * 24 * 60 * 60 * 1000],
  ["months", 30 * 24 * 60 * 60 * 1000],
  ["days", 24 * 60 * 60 * 1000],
  ["hours", 60 * 60 * 1000],
  ["minutes", 60 * 1000],
  ["seconds", 1000]
];

export default function Duration(props: {
  startingTime: Date;
  endingTime?: Date | null | undefined;
}) {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    if (props.endingTime != null) {
      return;
    }

    const refresh = () => setNow(new Date());
    const interval = setInterval(refresh, 1000);
    refresh();
    return () => {
      clearInterval(interval);
    };
  }, [props.endingTime]);

  let duration =
    (props.endingTime || now).getTime() - props.startingTime.getTime();

  const parts: string[] = [];
  UNITS.forEach(([unit, milliseconds]) => {
    if (duration > milliseconds) {
      parts.push(`${Math.floor(duration / milliseconds)} ${unit}`);
      duration %= milliseconds;
    }
  });

  return (
    <span className="duration">
      {parts.length == 0
        ? "no time at all"
        : parts.length == 1
        ? parts[0]
        : parts.length == 2
        ? `${parts[0]} and ${parts[1]}`
        : `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`}
    </span>
  );
}
