import { CardSize, CardTextPosition } from "@/pages";
import { Dispatch, SetStateAction } from "react";

interface BaseRangeProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

function BaseRange({ label, value, min, max, onChange }: BaseRangeProps) {
  return (
    <div>
      <label className="block text-sm">{label}:</label>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue)) {
              onChange(newValue);
            }
          }}
          className="flex-grow"
        />
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue)) {
              onChange(newValue);
            }
          }}
          className="w-16 p-1 border rounded text-sm"
        />
      </div>
    </div>
  );
}


interface RangePositionProps {
  positions: CardTextPosition;
  setPositions: Dispatch<SetStateAction<CardTextPosition>>;
  field: keyof CardTextPosition;
  cardSize: CardSize;
}

export function RangePosition({
  positions,
  setPositions,
  field,
  cardSize,
}: RangePositionProps) {
  return (
    <>
      <BaseRange
        label="X Position"
        value={positions[field].x}
        min={0}
        max={cardSize.width}
        onChange={(value) => {
          setPositions({
            ...positions,
            [field]: { ...positions[field], x: value },
          });
        }}
      />
      <BaseRange
        label="Y Position"
        value={positions[field].y}
        min={0}
        max={cardSize.height}
        onChange={(value) => {
          setPositions({
            ...positions,
            [field]: { ...positions[field], y: value },
          });
        }}
      />
    </>
  );
}

interface RangeSizeProps {
  size: { width: number; height: number };
  setSize: Dispatch<SetStateAction<{ width: number; height: number }>>;
  maxSize: { width: number; height: number };
}

export function RangeSize({ size, setSize, maxSize }: RangeSizeProps) {
  return (
    <>
      <BaseRange
        label="Width"
        value={size.width}
        min={0}
        max={maxSize.width}
        onChange={(value) => {
          setSize({
            ...size,
            width: value,
          });
        }}
      />
      <BaseRange
        label="Height"
        value={size.height}
        min={0}
        max={maxSize.height}
        onChange={(value) => {
          setSize({
            ...size,
            height: value,
          });
        }}
      />
    </>
  );
}
