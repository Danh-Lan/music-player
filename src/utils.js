export const convertDuration = (duration) => {
  const hour = Math.floor(duration / 3600);
  const minute = Math.floor((duration / 60) % 60);
  const second = Math.ceil(duration % 60);
  return (
    <span>
      {(hour > 0) ? hour + ':' : ''}
      {(minute < 10) ? '0' + minute : minute}
      :
      {(second < 10) ? '0' + second : second}
    </span>
  );
};