import { FontFamily } from "@/pages";

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
}

// Font mapping to CSS classes
const fontClasses = {
  "Comic Sans MS": "var(--font-comic-sans)",
  Arial: "Arial, sans-serif",
  "Times New Roman": "Times New Roman, serif",
  "Courier New": "Courier New, monospace",
  Verdana: "Verdana, sans-serif",
};

export default function FontSelector({
  value,
  onChange,
  label,
  id,
}: FontSelectorProps) {
  // Available font options
  const fontOptions: FontFamily[] = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Comic Sans MS",
  ];

  return (
    <div className="mb-2">
      {label && <label className="block text-sm">{label}</label>}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as FontFamily)}
        className="w-full p-1 text-sm border rounded"
      >
        {fontOptions.map((font) => (
          <option
            key={font}
            value={font}
            style={{
              fontFamily: fontClasses[font as keyof typeof fontClasses],
            }}
          >
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}
