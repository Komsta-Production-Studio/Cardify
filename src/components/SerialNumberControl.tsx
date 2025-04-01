import { CardSize, CardTextPosition, Position } from "@/pages";
import { Dispatch, SetStateAction } from "react";
import { RangePosition } from "./Range";

interface SerialNumberControlProps {
  useSerialNumber: boolean;
  setUseSerialNumber: Dispatch<SetStateAction<boolean>>;
  serialStart: number;
  setSerialStart: Dispatch<SetStateAction<number>>;
  serialEnd: number;
  setSerialEnd: Dispatch<SetStateAction<number>>;
  serialPrefix: string;
  setSerialPrefix: Dispatch<SetStateAction<string>>;
  serialSuffix: string;
  setSerialSuffix: Dispatch<SetStateAction<string>>;
  serialDigits: number;
  setSerialDigits: Dispatch<SetStateAction<number>>;
  serialPosition: CardTextPosition;
  setSerialPosition: Dispatch<SetStateAction<CardTextPosition>>;
  cardSize: CardSize;
  cardCount: number;
}

export default function SerialNumberControl({
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
  serialPosition,
  setSerialPosition,
  cardSize,
  cardCount,
}: SerialNumberControlProps) {
  return (
    <div className="mb-4 p-3 border rounded">
      <h3 className="font-semibold mb-2">Serial Number</h3>

      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id="useSerialNumber"
          checked={useSerialNumber}
          onChange={(e) => setUseSerialNumber(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="useSerialNumber">Add serial numbers</label>
      </div>

      {useSerialNumber && (
        <>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="block text-sm mb-1">Start Number:</label>
              <input
                type="number"
                min="0"
                value={serialStart}
                onChange={(e) => setSerialStart(parseInt(e.target.value) || 0)}
                className="w-full p-1 text-sm border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">End Number:</label>
              <input
                type="number"
                min={serialStart}
                value={serialEnd}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setSerialEnd(Math.max(serialStart, value));
                }}
                className="w-full p-1 text-sm border rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="block text-sm mb-1">Prefix:</label>
              <input
                type="text"
                value={serialPrefix}
                onChange={(e) => setSerialPrefix(e.target.value)}
                className="w-full p-1 text-sm border rounded"
                placeholder="e.g. SN-"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Suffix:</label>
              <input
                type="text"
                value={serialSuffix}
                onChange={(e) => setSerialSuffix(e.target.value)}
                className="w-full p-1 text-sm border rounded"
                placeholder="e.g. -2025"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-sm mb-1">Digits (zero padding):</label>
            <input
              type="number"
              min="1"
              max="10"
              value={serialDigits}
              onChange={(e) => setSerialDigits(parseInt(e.target.value) || 1)}
              className="w-full p-1 text-sm border rounded"
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: {serialPrefix}
              {String(serialStart).padStart(serialDigits, "0")}
              {serialSuffix}
            </p>
          </div>

          <div className="text-sm text-gray-500 mb-2">
            Range: {cardCount} numbers will be generated
          </div>

          <div className="grid grid-cols-2 gap-2">
            <RangePosition 
              positions={serialPosition}
              setPositions={setSerialPosition}
              field="serial"
              cardSize={cardSize}
            />
          </div>
        </>
      )}
    </div>
  );
}
