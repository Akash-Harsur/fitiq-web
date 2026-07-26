import {
  Target,
  Dumbbell,
  Scale,
  Trophy,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import SelectCard from "./SelectCard";

type GoalStepProps = {
  goal: string;
  onChange: (field: string, value: string) => void;
};

export default function GoalStep({
  goal,
  onChange,
}: GoalStepProps) {
  return (
    <div>
      <SectionTitle
        title="Choose Your Goal"
        subtitle="Select the primary goal you want to achieve."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <SelectCard
          title="Fat Loss"
          description="Lose body fat while maintaining muscle mass."
          icon={Target}
          selected={goal === "fat-loss"}
          onClick={() =>
            onChange("goal", "fat-loss")
          }
        />

        <SelectCard
          title="Muscle Gain"
          description="Build lean muscle and increase your strength."
          icon={Dumbbell}
          selected={goal === "muscle-gain"}
          onClick={() =>
            onChange("goal", "muscle-gain")
          }
        />

        <SelectCard
          title="Body Recomposition"
          description="Reduce fat and gain muscle at the same time."
          icon={Scale}
          selected={goal === "body-recomposition"}
          onClick={() =>
            onChange("goal", "body-recomposition")
          }
        />

        <SelectCard
          title="Strength"
          description="Increase power and improve overall performance."
          icon={Trophy}
          selected={goal === "strength"}
          onClick={() =>
            onChange("goal", "strength")
          }
        />
      </div>
    </div>
  );
}