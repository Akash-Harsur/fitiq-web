interface StatsCardsProps {
  goal: string;
  weight: number;
  trainingDays: number;
}

export default function StatsCards({
  goal,
  weight,
  trainingDays,
}: StatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="text-gray-500">Goal</h3>

        <p className="mt-3 text-2xl font-bold capitalize">
          {goal}
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="text-gray-500">Weight</h3>

        <p className="mt-3 text-2xl font-bold">
          {weight} kg
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <h3 className="text-gray-500">Training Days</h3>

        <p className="mt-3 text-2xl font-bold">
          {trainingDays} / Week
        </p>
      </div>
    </div>
  );
}