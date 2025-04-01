
interface Limit {
  maxRows: number;
  maxCols: number;
}

interface CardDuplicationProps {
  cardRows: number;
  cardCols: number;
  limitRows: Limit;
  setCardRows: (rows: number) => void;
  setCardCols: (cols: number) => void;
}

export default function CardDuplication({
  cardRows,
  cardCols,
  limitRows,
  setCardRows,
  setCardCols,
}: CardDuplicationProps) 
{
  const { maxRows, maxCols } = limitRows;
  return (
    <div className="mb-4 border-t pt-4 mt-4">
      <h3 className="font-semibold mb-2">Card Duplication</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Rows (max {maxRows}):</label>
          <input
            type="number"
            min="1"
            max={maxRows}
            value={cardRows}
            onChange={(e) =>
              setCardRows(
                Math.min(maxRows, Math.max(1, parseInt(e.target.value) || 1))
              )
            }
            className="w-full p-1 border rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Columns (max {maxCols}):
          </label>
          <input
            type="number"
            min="1"
            max={maxCols}
            value={cardCols}
            onChange={(e) =>
              setCardCols(
                Math.min(maxCols, Math.max(1, parseInt(e.target.value) || 1))
              )
            }
            className="w-full p-1 border rounded text-sm"
          />
        </div>

        {/* <div className="col-span-2">
                  <label className="block text-sm mb-1">Spacing (px):</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={cardSpacing}
                    onChange={(e) =>
                      setCardSpacing(Math.max(0, parseInt(e.target.value) || 0))
                    }
                    className="w-full p-1 border rounded text-sm"
                  />
                </div> */}
      </div>
      <span>Rows and columns are based on the cards size</span>
    </div>
  );
}