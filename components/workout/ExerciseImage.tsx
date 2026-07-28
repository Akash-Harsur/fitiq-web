import Image from "next/image";

interface ExerciseImageProps {
  image: string;
  exerciseName: string;
}

export default function ExerciseImage({
  image,
  exerciseName,
}: ExerciseImageProps) {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

      <div className="relative aspect-video">

        <Image
          src={image}
          alt={exerciseName}
          fill
          priority
          className="object-contain p-6 transition duration-300 hover:scale-105"
        />

      </div>

    </div>
  );
}