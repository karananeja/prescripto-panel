const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formatDate = (slotDate: string) => {
  const [date, month, year] = slotDate.split('_');
  return `${date}, ${MONTHS[+month - 1]}, ${year}`;
};
