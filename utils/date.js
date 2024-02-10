export const getFormattedDate = (date) => {
  // Manual way
  // `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  // Let js handle it
  return date.toISOString().slice(0, 10);
};

export const getDateMinusDays = (date, days) => {
  return new Date(
    date?.getFullYear(),
    date?.getMonth(),
    date?.getDate() - days
  );
};
