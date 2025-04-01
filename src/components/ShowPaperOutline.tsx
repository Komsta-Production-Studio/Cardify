import { A4_PAPER_SIZE_IN_PIXELS } from "@/util/consts";

interface ShowPaperOutlineProps {
  showA4Outline: boolean;
  setShowA4Outline: (show: boolean) => void;
}

export default function ShowPaperOutline({
  showA4Outline,
  setShowA4Outline,
}: ShowPaperOutlineProps
) {
  return (
    <div className="mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={showA4Outline}
          onChange={() => setShowA4Outline(!showA4Outline)}
          className="mr-2"
        />
        Show A4 paper outline ({A4_PAPER_SIZE_IN_PIXELS.width} x{" "}
        {A4_PAPER_SIZE_IN_PIXELS.height})
      </label>
    </div>
  );
}