const months = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May.',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
];

const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getDay(date: Date): string {
  return `${day[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`;
}

function getTimeofDay(date: Date): string {
  return `${getHours(date)}:${getMinutes(date)} ${getAMorPM(date)}`;
}

function getTwelveHour(date: Date): number {
  return date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
}

function getAMorPM(date: Date): string {
  return date.getHours() > 12 ? 'PM' : 'AM';
}

function getHours(date: Date): string {
  return `${getTwelveHour(date)}`;
}

function getMinutes(date: Date): string {
  return `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
}

export default function getCurrentTime(): string {
  const date = new Date();

  return `${getDay(date)} at ${getTimeofDay(date)}`;
}
