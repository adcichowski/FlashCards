import BlooperSVG from "./BlooperSVG/BlooperSVG";

export default function QuestionBoard({
  blooperColors,
}: {
  blooperColors: string;
}) {
  return (
    <div>
      <BlooperSVG fill={blooperColors} />
    </div>
  );
}
