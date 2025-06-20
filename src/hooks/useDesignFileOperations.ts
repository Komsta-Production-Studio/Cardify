import { useState } from 'react';
import { 
  Border, 
  CardSize, 
  CardText, 
  CardTextPosition, 
  TextStyles 
} from '@/pages';

interface DesignState {
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
}

export function useDesignFileOperations(designState: DesignState) {
  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  const loadDesign = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            try {
              const design = JSON.parse(e.target.result as string);
              
              // Update all state variables
              designState.setCardRows(design.cardRows || 1);
              designState.setCardCols(design.cardCols || 1);
              designState.setShowA4Outline(design.showA4Outline || false);
              designState.setCardText(design.cardText || designState.cardText);
              designState.setBorder(design.border || designState.border);
              designState.setTextStyles(design.textStyles || designState.textStyles);
              designState.setCardSize(design.cardSize || designState.cardSize);
              designState.setBgImage(design.bgImage || null);
              designState.setPositions(design.positions || designState.positions);
              designState.setUseSerialNumber(design.useSerialNumber || false);
              designState.setSerialStart(design.serialStart || 1);
              designState.setSerialEnd(design.serialEnd || 1);
              designState.setSerialPrefix(design.serialPrefix || "");
              designState.setSerialSuffix(design.serialSuffix || "");
              designState.setSerialDigits(design.serialDigits || 3);
            } catch (error) {
              alert("Failed to load design. Invalid file format.");
              console.error(error);
            }
            setLoading(false);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const saveDesign = () => {
    const design = {
      cardRows: designState.cardRows,
      cardCols: designState.cardCols,
      showA4Outline: designState.showA4Outline,
      cardText: designState.cardText,
      border: designState.border,
      textStyles: designState.textStyles,
      cardSize: designState.cardSize,
      bgImage: designState.bgImage,
      positions: designState.positions,
      useSerialNumber: designState.useSerialNumber,
      serialStart: designState.serialStart,
      serialEnd: designState.serialEnd,
      serialPrefix: designState.serialPrefix,
      serialSuffix: designState.serialSuffix,
      serialDigits: designState.serialDigits,
    };
    
    const blob = new Blob([JSON.stringify(design, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "card-design.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetDesign = () => {
    if (window.confirm("Are you sure you want to reset the design? This action cannot be undone.")) {
      designState.setCardRows(1);
      designState.setCardCols(1);
      designState.setShowA4Outline(true);
      designState.setCardText({
        title: "Your Card Title",
        subtitle: "Subtitle here",
        message: "Write your message here...",
        footer: "Footer text",
        serial: "Serial Number",
      });
      designState.setBorder({
        color: "#000000",
        width: 1,
        radius: 0,
        style: "solid",
      });
      designState.setTextStyles({
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
      designState.setCardSize({
        width: 500,
        height: 300,
      });
      designState.setBgImage(null);
      designState.setPositions({
        title: { x: 150, y: 100 },
        subtitle: { x: 150, y: 140 },
        message: { x: 150, y: 200 },
        footer: { x: 150, y: 220 },
        serial: { x: 20, y: 270 },
      });
      designState.setUseSerialNumber(false);
      designState.setSerialStart(1);
      designState.setSerialEnd(1);
      designState.setSerialPrefix("");
      designState.setSerialSuffix("");
      designState.setSerialDigits(3);
    }
  };

  return {
    loading,
    loadDesign,
    saveDesign,
    resetDesign
  };
}