"use client";

import { useEffect, useState } from "react";
import { Ruler, Weight } from "lucide-react";

import InputField from "./InputField";

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
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  // Convert saved CM value to feet + inches when needed
  useEffect(() => {
    if (heightUnit === "ft" && height) {
      const totalInches = Number(height) / 2.54;

      const ft = Math.floor(totalInches / 12);
      const inch = Math.round(totalInches - ft * 12);

      setFeet(String(ft));
      setInches(String(inch));
    }
  }, [heightUnit]);

  const handleHeightUnitChange = (
    unit: "cm" | "ft"
  ) => {
    if (unit === heightUnit) return;

    if (unit === "ft") {
      // CM -> FT + INCH
      if (height) {
        const totalInches = Number(height) / 2.54;

        const ft = Math.floor(totalInches / 12);
        const inch = Math.round(
          totalInches - ft * 12
        );

        setFeet(String(ft));
        setInches(String(inch));
      }

      setHeightUnit("ft");
      return;
    }

    // FT + INCH -> CM
    const totalInches =
      Number(feet || 0) * 12 +
      Number(inches || 0);

    if (totalInches > 0) {
      const cm = totalInches * 2.54;

      onChange(
        "height",
        cm.toFixed(1)
      );
    }

    setHeightUnit("cm");
  };

  const handleFeetChange = (value: string) => {
    setFeet(value);

    const totalInches =
      Number(value || 0) * 12 +
      Number(inches || 0);

    if (totalInches > 0) {
      onChange(
        "height",
        (totalInches * 2.54).toFixed(1)
      );
    } else {
      onChange("height", "");
    }
  };

  const handleInchesChange = (value: string) => {
    setInches(value);

    const totalInches =
      Number(feet || 0) * 12 +
      Number(value || 0);

    if (totalInches > 0) {
      onChange(
        "height",
        (totalInches * 2.54).toFixed(1)
      );
    } else {
      onChange("height", "");
    }
  };

  const handleWeightUnitChange = (
    unit: "kg" | "lbs"
  ) => {
    if (unit === weightUnit) return;

    if (unit === "lbs") {
      // KG -> LBS for display
      if (weight) {
        const lbs = Number(weight) * 2.20462;

        onChange(
          "weight",
          lbs.toFixed(1)
        );
      }

      setWeightUnit("lbs");
      return;
    }

    // LBS -> KG
    if (weight) {
      const kg = Number(weight) / 2.20462;

      onChange(
        "weight",
        kg.toFixed(1)
      );
    }

    setWeightUnit("kg");
  };

  return (
    <div className="space-y-6">

      {/* Height */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Height
          </label>

          <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={() =>
                handleHeightUnitChange("cm")
              }
              className={`px-3 py-1.5 text-xs font-medium transition ${
                heightUnit === "cm"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              cm
            </button>

            <button
              type="button"
              onClick={() =>
                handleHeightUnitChange("ft")
              }
              className={`px-3 py-1.5 text-xs font-medium transition ${
                heightUnit === "ft"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              ft / in
            </button>
          </div>
        </div>

        {heightUnit === "cm" ? (
          <InputField
            label=""
            icon={Ruler}
            type="number"
            placeholder="183"
            value={height}
            onChange={(e) =>
              onChange(
                "height",
                e.target.value
              )
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label=""
              icon={Ruler}
              type="number"
              placeholder="6"
              value={feet}
              onChange={(e) =>
                handleFeetChange(
                  e.target.value
                )
              }
            />

            <InputField
              label=""
              icon={Ruler}
              type="number"
              placeholder="0"
              value={inches}
              onChange={(e) =>
                handleInchesChange(
                  e.target.value
                )
              }
            />
          </div>
        )}

        <p className="mt-2 text-xs text-gray-500">
          {heightUnit === "cm"
            ? "Enter height in centimeters"
            : "Enter feet and inches"}
        </p>
      </div>

      {/* Weight */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Weight
          </label>

          <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={() =>
                handleWeightUnitChange("kg")
              }
              className={`px-3 py-1.5 text-xs font-medium transition ${
                weightUnit === "kg"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              kg
            </button>

            <button
              type="button"
              onClick={() =>
                handleWeightUnitChange("lbs")
              }
              className={`px-3 py-1.5 text-xs font-medium transition ${
                weightUnit === "lbs"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              lbs
            </button>
          </div>
        </div>

        <InputField
          label=""
          icon={Weight}
          type="number"
          placeholder={
            weightUnit === "kg"
              ? "96"
              : "212"
          }
          value={
            weightUnit === "kg"
              ? weight
              : weight
                ? (Number(weight) * 2.20462).toFixed(1)
                : ""
          }
          onChange={(e) => {
            const value = e.target.value;

            if (weightUnit === "kg") {
              onChange(
                "weight",
                value
              );
            } else {
              const kg =
                Number(value || 0) /
                2.20462;

              onChange(
                "weight",
                value
                  ? kg.toFixed(1)
                  : ""
              );
            }
          }}
        />

        <p className="mt-2 text-xs text-gray-500">
          {weightUnit === "kg"
            ? "Weight in kilograms"
            : "Weight in pounds"}
        </p>
      </div>

    </div>
  );
}