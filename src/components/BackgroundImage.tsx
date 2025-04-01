interface BackgroundImageProps {
  handleBgImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BackgroundImage({ handleBgImageChange }: BackgroundImageProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2">Background Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleBgImageChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}