import { A4_PAPER_SIZE_IN_PIXELS } from "@/util/consts";
import { RangeSize } from "./Range";
import { CardSize as CardSizeType } from "@/pages";
import { Dispatch, SetStateAction } from "react";

interface CardSizeProps {
  className?: string;
  cardSize: CardSizeType;
  setCardSize: Dispatch<SetStateAction<{ width: number; height: number }>>;
}

export default function CardSize({ className = "", cardSize, setCardSize }: CardSizeProps) {
  return (
    <div className={"mb-4 " + className}>
      <label className="block mb-2">Card Size:</label>
      <RangeSize
        size={cardSize}
        setSize={setCardSize}
        maxSize={A4_PAPER_SIZE_IN_PIXELS}
      />
    </div>
  );
}