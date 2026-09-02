import Image from "next/image";

type StepHeaderProps = {
  title: string;
  subtitle: string;
};

export default function StepHeader({
  title,
  subtitle,
}: StepHeaderProps) {
  return (
    <div className="mb-10 text-center">
      <div className="mb-6 flex justify-center">
        <Image
          src="/image/logo.jpeg"
          alt="FitIQ Logo"
          width={140}
          height={45}
          priority
          className="fitiq-logo rounded-xl"
        />
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        {title}
      </h1>

      <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}