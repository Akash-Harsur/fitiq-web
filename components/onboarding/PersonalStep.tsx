import { Calendar, User, Users } from "lucide-react";

import InputField from "./InputField";
import SelectCard from "./SelectCard";
import SectionTitle from "./SectionTitle";

type PersonalStepProps = {
  fullName: string;
  age: string;
  gender: string;
  onChange: (field: string, value: string) => void;
};

export default function PersonalStep({
  fullName,
  age,
  gender,
  onChange,
}: PersonalStepProps) {
  return (
    <div>
      <SectionTitle
        title="Personal Information"
        subtitle="Tell us a little about yourself."
      />

      <div className="space-y-6">
        <InputField
          label="Full Name"
          icon={User}
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) =>
            onChange("fullName", e.target.value)
          }
        />

        <InputField
          label="Age"
          icon={Calendar}
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) =>
            onChange("age", e.target.value)
          }
        />

        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Gender
          </label>

          <div className="grid grid-cols-2 gap-4">
            <SelectCard
              title="Male"
              icon={Users}
              selected={gender === "male"}
              onClick={() =>
                onChange("gender", "male")
              }
            />

            <SelectCard
              title="Female"
              icon={Users}
              selected={gender === "female"}
              onClick={() =>
                onChange("gender", "female")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}