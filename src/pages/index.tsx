
import localFont from "next/font/local";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { A4_PAPER_SIZE_IN_PIXELS } from "@/util/consts";
import BorderControl from "@/components/BorderControl";
import CardDuplication from "@/components/CardDuplication";
import CardSize from "@/components/CardSize";
import BackgroundImage from "@/components/BackgroundImage";
import TextStyleField from "@/components/TextStyleField";
import ShowPaperOutline from "@/components/ShowPaperOutline";
import SerialNumberControl from "@/components/SerialNumberControl";

const comicSans = localFont({
  src: "../../public/ComicSansMS.ttf",
  variable: "--font-comic-sans",
  display: "swap",
});

type FontSize = `${number}px`;
type Color = `#${string}`;
type FontWeight = "normal" | "bold";
export type FontFamily =
  | "Arial"
  | "Times New Roman"
  | "Courier New"
  | "Verdana"
  | "Comic Sans MS";

export interface TextStyle {
  fontSize: FontSize;
  color: Color;
  fontWeight: FontWeight;
  fontFamily: FontFamily;
};

export interface Border {
  color: Color;
  width: number;
  radius: number;
  style: string;
}

export interface CardSize {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export type TextFieldName = 'title' | 'subtitle' | 'message' | 'footer';

export type PositionTextFieldName = "title" | "subtitle" | "message" | "footer" | "serial";

export type TextStyles = {
  [key in TextFieldName]: TextStyle;
};

export type CardText = {
  [key in TextFieldName]: string;
};

export type CardTextPosition = {
  [key in PositionTextFieldName]: Position;
};


export default function Home() {
  const [cardRows, setCardRows] = useState<number>(1);
  const [cardCols, setCardCols] = useState<number>(1);

  const [showA4Outline, setShowA4Outline] = useState<boolean>(true);
  const [cardText, setCardText] = useState<CardText>({
    title: "Your Card Title",
    subtitle: "Subtitle here",
    message: "Write your message here...",
    footer: "Footer text",
  });

  const [border, setBorder] = useState<Border>({
    color: "#000000",
    width: 1,
    radius: 0,
    style: "solid",
  });

  const [textStyles, setTextStyles] = useState<TextStyles>({
    title: {
      fontSize: "24px",
      color: "#000000",
      fontWeight: "bold",
      fontFamily: comicSans.className as FontFamily,
    },
    subtitle: {
      fontSize: "18px",
      color: "#333333",
      fontWeight: "normal",
      fontFamily: "Arial",
    },
    message: {
      fontSize: "14px",
      color: "#555555",
      fontWeight: "normal",
      fontFamily: "Arial",
    },
    footer: {
      fontSize: "12px",
      color: "#888888",
      fontWeight: "normal",
      fontFamily: "Arial",
    },
  });

  const [cardSize, setCardSize] = useState<CardSize>({
    width: 500,
    height: 300,
  });
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [positions, setPositions] = useState<CardTextPosition>({
    title: { x: 150, y: 100 },
    subtitle: { x: 150, y: 140 },
    message: { x: 150, y: 200 },
    footer: { x: 150, y: 220 },
    serial: { x: 20, y: 270 },
  });

  const cardRef = useRef<HTMLDivElement>(null);


   const calculateMaxCards = () => {
     const maxCols = Math.floor(
       (A4_PAPER_SIZE_IN_PIXELS.width) /
         (cardSize.width)
     );
     const maxRows = Math.floor(
       (A4_PAPER_SIZE_IN_PIXELS.height) /
         (cardSize.height)
     );
     return { maxRows, maxCols };
   };

   const { maxRows, maxCols } = calculateMaxCards();

   const [useSerialNumber, setUseSerialNumber] = useState<boolean>(false);
   const [serialStart, setSerialStart] = useState<number>(1);
   const [serialEnd, setSerialEnd] = useState<number>(cardRows * cardCols);
   const [serialPrefix, setSerialPrefix] = useState<string>("");
   const [serialSuffix, setSerialSuffix] = useState<string>("");
   const [serialDigits, setSerialDigits] = useState<number>(3);
  //  const [serialPosition, setSerialPosition] = useState<Position>({
  //    x: 20,
  //    y: 270,
  //  });

   const renderCardDuplicates = () => {
     const cards = [];
     let serialCounter = serialStart;

     for (let row = 0; row < cardRows; row++) {
       for (let col = 0; col < cardCols; col++) {
         // Skip if this is the original card position (0,0)

         // Generate the serial number for this card
         const serialNumber = useSerialNumber
           ? `${serialPrefix}${String(serialCounter).padStart(
               serialDigits,
               "0"
             )}${serialSuffix}`
           : null;

         // Increment the counter for the next card
         if (useSerialNumber) {
           serialCounter++;
         }

         if (row === 0 && col === 0) continue;

         //  const xPos = col * (cardSize.width);
         //  const yPos = row * (cardSize.height);

         cards.push(
           <div
             key={`card-${row}-${col}`}
             className="relative bg-gray-100 shadow overflow-hidden card-duplicate card-printable"
             style={{
               height: `${cardSize.height}px`,
               width: `${cardSize.width}px`,
               //  left: `${xPos}px`,
               //  top: `${yPos}px`,
               backgroundImage: bgImage ? `url(${bgImage})` : "none",
               backgroundSize: "cover",
               backgroundPosition: "center",
               border: `${border.width}px ${border.style} ${border.color}`,
               borderRadius: `${border.radius}px`,
             }}
           >
             {(Object.keys(cardText) as TextFieldName[]).map((field) => (
               <div
                 key={field}
                 className="absolute pointer-events-none"
                 style={{
                   left: `${positions[field].x}px`,
                   top: `${positions[field].y}px`,
                   ...textStyles[field],
                 }}
               >
                 {cardText[field]}
               </div>
             ))}
             {/* Serial number if enabled */}
             {useSerialNumber && (
               <div
                 className="absolute pointer-events-none"
                 style={{
                   left: `${positions["serial"].x}px`,
                   top: `${positions["serial"].y}px`,
                   fontSize: "12px",
                   color: "#000000",
                   fontWeight: "normal",
                   fontFamily: "Arial",
                 }}
               >
                 {serialNumber}
               </div>
             )}
           </div>
         );
       }
     }

     return cards;
   };
  

  // const handleCardSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   const [width, height] = value.split("x").map((v) => parseInt(v.trim()));
  //   if (!isNaN(width) && !isNaN(height)) {
  //     setCardSize({ width, height });
  //   }
  // };


  const handleTextChange = (field: string, value: string) => {
    setCardText({
      ...cardText,
      [field]: value,
    });
  };

  const handleStyleChange = (
      field: TextFieldName,
      property: string,
      value: string
    ) => {
      setTextStyles({
        ...textStyles,
        [field]: {
          ...textStyles[field],
          [property]: value,
        },
      });
    };

  const handleBgImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target) return;

        setBgImage(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: string) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (!cardRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;

    setPositions({
      ...positions,
      [draggedItem]: { x, y },
    });

    setDraggedItem(null);
  };

  const handleBorderChange = (
    property: keyof Border,
    value: string | number
  ) => {
    setBorder({
      ...border,
      [property]: value,
    });
  }

  const printCard = () => {
    // window.print();
    // Add a small delay to ensure styles are applied before printing
    // setTimeout(() => {
    //   window.print();
    // }, 1000);

    // If there's a background image, temporarily add it as a real image for printing
    // if (bgImage && cardRef.current) {
    //   const tempImg = document.createElement("img");
    //   tempImg.src = bgImage;
    //   tempImg.className =
    //     "absolute top-0 left-0 w-full h-full object-cover print-bg-image";
    //   tempImg.style.zIndex = "0";
    //   cardRef.current.appendChild(tempImg);

    //   setTimeout(() => {
    //     window.print();
    //     // Remove the temp image after printing
    //     if (cardRef.current && tempImg.parentNode === cardRef.current) {
    //       cardRef.current.removeChild(tempImg);
    //     }
    //   }, 100);
    // } else {
    //   window.print();
    // }

    if (bgImage && cardRef.current) {
      // const cardWidth = cardRef.current.offsetWidth;
      // const cardHeight = cardRef.current.offsetHeight;
      // const aspectRatio = cardWidth / cardHeight;

      // const tempImg = document.createElement("img");
      // tempImg.src = bgImage;
      // tempImg.className = "absolute top-0 left-0 print-bg-image";
      // tempImg.style.width = `${cardWidth}px`;
      // tempImg.style.height = `${cardHeight}px`;
      // tempImg.style.zIndex = "-1";
      // cardRef.current.appendChild(tempImg);

      // Create a print wrapper to center the card on the page
      // const printWrapper = document.createElement("div");
      // printWrapper.className = "print-wrapper";
      // document.body.appendChild(printWrapper);

      setTimeout(() => {
        window.print();

        // Clean up
        // if (cardRef.current && tempImg.parentNode === cardRef.current) {
        //   cardRef.current.removeChild(tempImg);
        // }
        // if (printWrapper.parentNode) {
        //   document.body.removeChild(printWrapper);
        // }
      }, 100);
    } else {
      window.print();
    }
  };

  return (
    <div className={`min-h-screen`}>
      {/* <div className="container w-full mx-auto p-4"> */}
      <div className="container w-full mx-auto p-4">
        <div className=" flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 bg-white p-4 rounded shadow control-panel">
            <h2 className="text-xl font-semibold mb-4">Edit controls</h2>

            <CardDuplication
              cardRows={cardRows}
              cardCols={cardCols}
              limitRows={{ maxRows: maxRows, maxCols: maxCols }}
              setCardRows={setCardRows}
              setCardCols={setCardCols}
            />
            <div className="flex flex-1 flex-row gap-4 mb-4">
              <BorderControl
                className="flex-1"
                border={border}
                handleBorderChange={handleBorderChange}
              />
              <CardSize
                className="flex-1"
                cardSize={cardSize}
                setCardSize={setCardSize}
              />
            </div>

            <BackgroundImage handleBgImageChange={handleBgImageChange} />

            {(Object.keys(cardText) as TextFieldName[]).map((field) => (
              <TextStyleField
                key={field}
                field={field}
                cardText={cardText}
                textStyles={textStyles}
                handleTextChange={handleTextChange}
                handleStyleChange={handleStyleChange}
                positions={positions}
                setPositions={setPositions}
                cardSize={cardSize}
              />
            ))}

            <SerialNumberControl
              useSerialNumber={useSerialNumber}
              setUseSerialNumber={setUseSerialNumber}
              serialStart={serialStart}
              setSerialStart={setSerialStart}
              serialEnd={serialEnd}
              setSerialEnd={setSerialEnd}
              serialPrefix={serialPrefix}
              setSerialPrefix={setSerialPrefix}
              serialSuffix={serialSuffix}
              setSerialSuffix={setSerialSuffix}
              serialDigits={serialDigits}
              setSerialDigits={setSerialDigits}
              serialPosition={positions}
              setSerialPosition={setPositions}
              cardSize={cardSize}
              cardCount={cardRows * cardCols}
            />

            <ShowPaperOutline
              showA4Outline={showA4Outline}
              setShowA4Outline={setShowA4Outline}
            />

            <button
              onClick={printCard}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Print Card{cardRows * cardCols > 1 ? "s" : ""}
            </button>
          </div>

          <div
            className="flex flex-wrap flex-row place-content-start card-wrapper"
            style={{
              width: A4_PAPER_SIZE_IN_PIXELS.width,
              height: A4_PAPER_SIZE_IN_PIXELS.height,
            }}
          >
            {/* <div className="w-full md:w-2/3 card-wrapper"> */}
            {showA4Outline && (
              <div
                className="absolute border-2 border-gray-300 border-dashed rounded bg-gray-50 outline-paper"
                style={{
                  width: `${A4_PAPER_SIZE_IN_PIXELS.width}px`,
                  height: `${A4_PAPER_SIZE_IN_PIXELS.height}px`,
                  zIndex: 0,
                }}
              >
                <div className="absolute top-2 left-2 text-xs text-gray-400">
                  A4 Paper Size
                </div>
              </div>
            )}

            <div
              ref={cardRef}
              // className="relative w-full aspect-[7/5] bg-gray-100 rounded shadow overflow-hidden card-printable"
              className="relative bg-gray-100 shadow overflow-hidden card-printable"
              style={{
                height: `${cardSize.height}px`,
                width: `${cardSize.width}px`,
                backgroundImage: bgImage ? `url(${bgImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: `${border.width}px ${border.style} ${border.color}`,
                borderRadius: `${border.radius}px`,
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {(Object.keys(cardText) as TextFieldName[]).map((field) => (
                <div
                  key={field}
                  className="absolute cursor-move"
                  style={{
                    left: `${positions[field].x}px`,
                    top: `${positions[field].y}px`,
                    ...textStyles[field],
                  }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, field)}
                >
                  {cardText[field]}
                </div>
              ))}
              {/* Serial number if enabled */}
              {useSerialNumber && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${positions["serial"].x}px`,
                    top: `${positions["serial"].y}px`,
                    fontSize: "12px",
                    color: "#000000",
                    fontWeight: "normal",
                    fontFamily: "Arial",
                  }}
                >
                  {`${serialPrefix}${String(serialStart).padStart(
                    serialDigits,
                    "0"
                  )}${serialSuffix}`}
                </div>
              )}
            </div>
            {/* Duplicated cards */}
            {renderCardDuplicates()}
            <div className="mt-4 text-sm text-gray-600">
              <p>* Drag and drop text elements to position them on your card</p>
              <p>* Use the print button to save or print your design</p>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
