export function getGreeting(name: string) {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      title: `Good Morning, ${name} 👋`,
      subtitle: "Let's start your day strong 💪",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      title: `Good Afternoon, ${name} 👋`,
      subtitle: "Keep pushing, you're doing great 🔥",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      title: `Good Evening, ${name} 👋`,
      subtitle: "Finish today stronger than yesterday ⚡",
    };
  }

  return {
    title: `Good Night, ${name} 👋`,
    subtitle: "Great work today. Recover well 😴",
  };
}