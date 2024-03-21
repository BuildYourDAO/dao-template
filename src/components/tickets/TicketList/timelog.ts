interface MemberLog {
  date: string; // Date format: "YYYY-MM-DD"
  hoursLogged: number; // Hours logged by the member on that date
}

export function calculateAvailabilityAndEfficiency(logs: MemberLog[]): {
  availability: number;
  efficiency: number;
} {
  const totalLoggedHours = logs.reduce(
    (total, log) => total + log.hoursLogged,
    0
  );
  const totalAvailableHours = 40; // Total available hours in a week

  const availability = Math.min(totalLoggedHours / totalAvailableHours, 1); // Cap at 1 if more than 100%
  const efficiency = totalLoggedHours / (logs.length * 8); // Assuming 8 hours of work per day

  return { availability, efficiency };
}

// Example usage:
const logs: MemberLog[] = [
  { date: '2023-07-22', hoursLogged: 6 },
  { date: '2023-07-23', hoursLogged: 7 },
  { date: '2023-07-24', hoursLogged: 8 },
  { date: '2023-07-25', hoursLogged: 6 },
  { date: '2023-07-26', hoursLogged: 7 },
  { date: '2023-07-27', hoursLogged: 6 },
  { date: '2023-07-28', hoursLogged: 5 },
];

const { availability, efficiency } = calculateAvailabilityAndEfficiency(logs);
console.log('Availability:', availability);
console.log('Efficiency:', efficiency);
