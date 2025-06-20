import { useDesignFileOperations } from "@/hooks/useDesignFileOperations";
import {
  Border,
  CardSize,
  CardText,
  CardTextPosition,
  TextStyles,
} from "@/pages";

interface FileOperationsProps {
  // All the state and setter props
  cardRows: number;
  setCardRows: (rows: number) => void;
  cardCols: number;
  setCardCols: (cols: number) => void;
  showA4Outline: boolean;
  setShowA4Outline: (show: boolean) => void;
  cardText: CardText;
  setCardText: (text: CardText) => void;
  border: Border;
  setBorder: (border: Border) => void;
  textStyles: TextStyles;
  setTextStyles: (styles: TextStyles) => void;
  cardSize: CardSize;
  setCardSize: (size: CardSize) => void;
  bgImage: string | null;
  setBgImage: (image: string | null) => void;
  positions: CardTextPosition;
  setPositions: (positions: CardTextPosition) => void;
  useSerialNumber: boolean;
  setUseSerialNumber: (use: boolean) => void;
  serialStart: number;
  setSerialStart: (start: number) => void;
  serialEnd: number;
  setSerialEnd: (end: number) => void;
  serialPrefix: string;
  setSerialPrefix: (prefix: string) => void;
  serialSuffix: string;
  setSerialSuffix: (suffix: string) => void;
  serialDigits: number;
  setSerialDigits: (digits: number) => void;
  // Extra prop for print functionality
  printCard: () => void;
}

export default function FileOperations({
  cardRows,
  setCardRows,
  cardCols,
  setCardCols,
  showA4Outline,
  setShowA4Outline,
  cardText,
  setCardText,
  border,
  setBorder,
  textStyles,
  setTextStyles,
  cardSize,
  setCardSize,
  bgImage,
  setBgImage,
  positions,
  setPositions,
  useSerialNumber,
  setUseSerialNumber,
  serialStart,
  setSerialStart,
  serialEnd,
  setSerialEnd,
  serialPrefix,
  setSerialPrefix,
  serialSuffix,
  setSerialSuffix,
  serialDigits,
  setSerialDigits,
  printCard,
}: FileOperationsProps) {
  // Use the custom hook
  const { loadDesign, saveDesign, resetDesign } = useDesignFileOperations({
    cardRows,
    setCardRows,
    cardCols,
    setCardCols,
    showA4Outline,
    setShowA4Outline,
    cardText,
    setCardText,
    border,
    setBorder,
    textStyles,
    setTextStyles,
    cardSize,
    setCardSize,
    bgImage,
    setBgImage,
    positions,
    setPositions,
    useSerialNumber,
    setUseSerialNumber,
    serialStart,
    setSerialStart,
    serialEnd,
    setSerialEnd,
    serialPrefix,
    setSerialPrefix,
    serialSuffix,
    setSerialSuffix,
    serialDigits,
    setSerialDigits,
  });

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        onClick={printCard}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Print Card{cardRows * cardCols > 1 ? "s" : ""}
      </button>
      <button
        onClick={saveDesign}
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Save Design
      </button>
      <button
        onClick={loadDesign}
        className="bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
      >
        Load Design
      </button>
      <button
        onClick={resetDesign}
        className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Reset Design
      </button>
    </div>
  );
}
