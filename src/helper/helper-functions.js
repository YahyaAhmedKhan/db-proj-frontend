export function formatDate(inputDate) {
  const dateParts = inputDate.split("-");
  const year = dateParts[0];
  const month = new Date(inputDate).toLocaleString("default", {
    month: "short",
  });
  const day = dateParts[2];
  return `${day} ${month} ${year}`;
}
