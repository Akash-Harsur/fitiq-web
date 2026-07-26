import { Ruler, Weight } from "lucide-react";

import InputField from "./InputField";
import SectionTitle from "./SectionTitle";

type BodyStepProps = {
  height: string;
  weight: string;
  onChange: (field: string, value: string) => void;
};

export default function BodyStep({
  height,
  weight,
  onChange,
}: BodyStepProps) {
  return (
    <div>
      <SectionTitle
        title="Body Details"
        subtitle="Tell us about your current body measurements."
      />

      <div className="space-y-6">
        <InputField
          label="Height (cm)"
          icon={Ruler}
          type="number"
          placeholder="183"
          value={height}
          onChange={(e) =>
            onChange("height", e.target.value)
          }
        />

        <InputField
          label="Weight (kg)"
          icon={Weight}
          type="number"
          placeholder="96"
          value={weight}
          onChange={(e) =>
            onChange("weight", e.target.value)
          }
        />
      </div>
    </div>
  );
}