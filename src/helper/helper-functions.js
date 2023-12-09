export function formatDate(inputDate) {
  const dateParts = inputDate.split("-");
  const year = dateParts[0];
  const month = new Date(inputDate).toLocaleString("default", {
    month: "short",
  });
  const day = dateParts[2];
  return `${day} ${month} ${year}`;
}

export function formatTimeToAMPM(timeString) {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes] = timeString.split(":");

  // Convert hours to a number
  const hour = parseInt(hours, 10);

  // Determine whether it's AM or PM
  const period = hour >= 12 ? "PM" : "AM";

  // Calculate the adjusted hour for AM/PM format
  const formattedHour = hour > 12 ? hour - 12 : hour;
  const formattedTime = `${formattedHour.toString().padStart(2, "0")}:${minutes} ${period}`;

  return formattedTime;
}

export function timeDifference(time1, time2) {
  // Function to convert time string to minutes
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Convert both times to minutes
  const minutes1 = timeToMinutes(time1);
  const minutes2 = timeToMinutes(time2);

  // Calculate the difference in minutes
  let diff = Math.abs(minutes2 - minutes1);

  // Convert the difference back to hours and minutes
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return `${hours}hr ${minutes}mins`;
}

export function formatPrice(price) {
  return parseFloat(price.toFixed(2)).toFixed(2);
}
