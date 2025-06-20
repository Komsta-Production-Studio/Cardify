import { TextFieldName, TextStyles } from "@/pages";
import FontSelector from "./FontSelector";

interface TextStyleFieldProps {
  field: TextFieldName;
  textStyles: TextStyles;
  handleStyleChange: (field: TextFieldName, property: string, value: string) => void;
  children?: React.ReactNode;
}

export default function TextStyleFieldGroup({
  field,
  textStyles,
  handleStyleChange,
  children,
}: TextStyleFieldProps) {
  return (
    <div key={field} className="mb-4">
      {/* <label className="block capitalize mb-2">{field}:</label>
      <input
        type="text"
        value={cardText[field]}
        onChange={(e) => handleTextChange(field, e.target.value)}
        className="w-full p-2 border rounded"
      /> */}

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <label className="block text-sm">Font Size:</label>
          <input
            type="text"
            value={textStyles[field].fontSize.replace("px", "")}
            onChange={(e) => {
              let value = e.target.value;
              if (!value.endsWith("px")) {
                value = `${parseInt(value)}px`;
              }
              handleStyleChange(field, "fontSize", value);
            }}
            className="w-full p-1 border rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm">Color:</label>
          <input
            type="color"
            value={textStyles[field].color}
            onChange={(e) => handleStyleChange(field, "color", e.target.value)}
            className="w-full p-1 h-8 border rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <label className="block text-sm">Font Weight:</label>
          <select
            value={textStyles[field].fontWeight}
            onChange={(e) =>
              handleStyleChange(field, "fontWeight", e.target.value)
            }
            className="w-full p-1 border rounded text-sm"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
        </div>
        <div>
          <FontSelector
            label="Font Family:"
            value={textStyles[field].fontFamily}
            onChange={(value) => handleStyleChange(field, "fontFamily", value)}
            id={`font-family-${field}`}
          />
        </div>
      </div>
      {children}
    </div>
  );
}