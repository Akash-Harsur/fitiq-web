export function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      title: "Good Morning",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      title: "Good Afternoon",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      title: "Good Evening",
    };
  }

  return {
    title: "Good Night",
  };
}