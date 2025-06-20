
import localFont from "next/font/local";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { A4_PAPER_SIZE_IN_PIXELS } from "@/util/consts";
import BorderControl from "@/components/BorderControl";
import CardDuplication from "@/components/CardDuplication";
import CardSize from "@/components/CardSize";
import BackgroundImage from "@/components/BackgroundImage";
import TextFieldStyleEditor from "@/components/TextFieldStyleEditor";
import ShowPaperOutline from "@/components/ShowPaperOutline";
import SerialNumberControl from "@/components/SerialNumberControl";
import FileOperations from "@/components/FileOperation";
import Head from "next/head";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export type TextFieldName = 'title' | 'subtitle' | 'message' | 'footer' | 'serial';

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
    serial: "Serial Number",
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
      fontFamily: "Arial",
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
    serial: {
      fontSize: "12px",
      color: "#000000",
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
             {(Object.keys(cardText) as TextFieldName[]).map((field) => {
              if (field === "serial") return;
              return (
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
             )})}
             {/* Serial number if enabled */}
             {useSerialNumber && (
               <div
                 className="absolute pointer-events-none"
                 style={{
                   left: `${positions["serial"].x}px`,
                   top: `${positions["serial"].y}px`,
                   fontSize: textStyles["serial"].fontSize,
                   color: textStyles["serial"].color,
                   fontWeight: textStyles["serial"].fontWeight,
                   fontFamily: textStyles["serial"].fontFamily,
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
    if (bgImage && cardRef.current) {
      setTimeout(() => {
        window.print();
      }, 100);
    } else {
      window.print();
    }
  };

  return (
    <div className={`min-h-screen`}>
      <Head>
        <title>Card Designer</title>
        <meta name="author" content="Joel Olofsson" />
        <meta name="publisher" content="Joel Olofsson" />
        <meta name="copyright" content="Joel Olofsson" />
        <meta
          name="description"
          content="Cardify is a versatile web-based card design tool that allows you to create and print custom cards directly from your browser. Perfect for business cards, invitation cards, membership cards, ID badges, gift cards, and more."
        />
      </Head>
      {/* <div className="container w-full mx-auto p-4"> */}
      <div className="w-full mx-auto p-4 wrapper">
        <div className=" flex flex-col md:flex-row gap-6">
          {/* <div className="w-full md:w-1/3 p-4 rounded shadow control-panel"> */}
          <div className="grid grid-cols-2 w-1/3 control-panel gap-2 auto-rows-min auto-cols-min">
            {/* <h2 className="text-xl font-semibold mb-4">Edit controls</h2> */}

            <div className="mb-4 p-4 bg-gray-50 rounded shadow shrink">
              <CardDuplication
                cardRows={cardRows}
                cardCols={cardCols}
                limitRows={{ maxRows: maxRows, maxCols: maxCols }}
                setCardRows={setCardRows}
                setCardCols={setCardCols}
              />
            </div>

            <div className="mb-4 p-4 bg-gray-50 rounded shadow shrink">
              <BackgroundImage handleBgImageChange={handleBgImageChange} />
            </div>

            <div className="mb-4 p-4 bg-gray-50 rounded shadow col-span-2">
              <h3 className="text-lg font-medium mb-2">Card Size & Border</h3>
              <div className="flex flex-1 flex-row gap-4">
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
            </div>

            {/* <div className="mb-4 p-4 bg-gray-50 rounded shadow row-span-3">
              <h3 className="text-lg font-medium mb-2">Text Fields</h3>
              {(Object.keys(cardText) as TextFieldName[]).map((field) => {
                if (field === "serial") return;
                return (
                  <TextFieldStyleEditor
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
                );
              })}
            </div> */}

            <div className="mb-4 p-4 bg-gray-50 rounded shadow col-span-2 shrink">
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
                textStyles={textStyles}
                handleStyleChange={handleStyleChange}
              />
            </div>

            <div className="p-4 bg-gray-50 rounded shadow">
              <h3 className="text-lg font-medium mb-2">Paper Outline</h3>
              <ShowPaperOutline
                showA4Outline={showA4Outline}
                setShowA4Outline={setShowA4Outline}
              />
            </div>

            <div className="p-4 bg-gray-50 rounded shadow">
              <FileOperations
                cardRows={cardRows}
                setCardRows={setCardRows}
                cardCols={cardCols}
                setCardCols={setCardCols}
                showA4Outline={showA4Outline}
                setShowA4Outline={setShowA4Outline}
                cardText={cardText}
                setCardText={setCardText}
                border={border}
                setBorder={setBorder}
                textStyles={textStyles}
                setTextStyles={setTextStyles}
                cardSize={cardSize}
                setCardSize={setCardSize}
                bgImage={bgImage}
                setBgImage={setBgImage}
                positions={positions}
                setPositions={setPositions}
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
                printCard={printCard}
              />
            </div>
          </div>
          {/* <div className="mb-4 p-4 bg-gray-50 rounded shadow row-span-3 style-editor">
            <h3 className="text-lg font-medium mb-2">Text Fields</h3>
            {(Object.keys(cardText) as TextFieldName[]).map((field) => {
              if (field === "serial") return;
              return (
                <TextFieldStyleEditor
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
              );
            })}
          </div> */}

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
              {(Object.keys(cardText) as TextFieldName[]).map((field) => {
                if (field === "serial") return;
                return (
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
                );
              })}
              {/* Serial number if enabled */}
              {useSerialNumber && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${positions["serial"].x}px`,
                    top: `${positions["serial"].y}px`,
                    fontSize: textStyles["serial"].fontSize,
                    color: textStyles["serial"].color,
                    fontWeight: textStyles["serial"].fontWeight,
                    fontFamily: textStyles["serial"].fontFamily,
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
            <div className="p-4 text-sm text-gray-600 help-text z-1">
              <p>* Drag and drop text elements to position them on your card</p>
              <p>* Use the print button to save or print your design</p>
            </div>
          </div>
          {/* </div> */}
          <div className="mb-4 p-4 bg-gray-50 rounded shadow row-span-3 style-editor">
            <h3 className="text-lg font-medium mb-2">Text Fields</h3>
            {(Object.keys(cardText) as TextFieldName[]).map((field) => {
              if (field === "serial") return;
              return (
                <TextFieldStyleEditor
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
