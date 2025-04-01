import { Border } from "@/pages";

interface BorderControlProps {
  className?: string;
  border: Border;
  handleBorderChange: (property: keyof Border, value: string | number) => void;
}

export default function BorderControl({
  className = "",
  border,
  handleBorderChange,
}: BorderControlProps
) {
  return (
    <div className={"mb-4 " + className}>
      <h3 className="font-semibold mb-2">Border</h3>
      <label className="block text-sm mb-1">Border Color:</label>
      <input
        type="color"
        value={border.color}
        onChange={(e) => handleBorderChange("color", e.target.value)}
        className="w-full p-1 h-8 border rounded"
      />
      <label className="block text-sm mb-1">Border Width (px):</label>
      <input
        type="number"
        min="0"
        max="10"
        value={border.width} // Assuming border width is same as font size
        onChange={(e) => handleBorderChange("width", e.target.value)}
        className="w-full p-1 border rounded text-sm"
      />
      <label className="block text-sm mb-1">Border Radius (px):</label>
      <input
        type="number"
        min="0"
        max="50"
        value={border.radius} // Assuming border radius is same as font size
        onChange={(e) => handleBorderChange("radius", e.target.value)}
        className="w-full p-1 border rounded text-sm"
      />
      <label className="block text-sm mb-1">Border Style:</label>
      <select
        value={border.style} // Assuming border style is same as font family
        onChange={(e) => handleBorderChange("style", e.target.value)}
        className="w-full p-1 border rounded text-sm"
      >
        <option value="solid">Solid</option>
        <option value="dashed">Dashed</option>
        <option value="dotted">Dotted</option>
        <option value="double">Double</option>
        <option value="groove">Groove</option>
        <option value="ridge">Ridge</option>
        <option value="inset">Inset</option>
        <option value="outset">Outset</option>
        <option value="none">None</option>
        <option value="hidden">Hidden</option>
      </select>
    </div>
  );
}