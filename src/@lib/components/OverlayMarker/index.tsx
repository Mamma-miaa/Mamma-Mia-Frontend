import React from "react";

export interface OverlayMarkerProps {
  children?: React.ReactNode;
}

const OverlayMarker: React.FC<OverlayMarkerProps> = ({ children }) => {
  const size = 28;
  const triangleSize = size * 0.21; // 6px for 28px size
  const circleSize = size; // 28px for 28px size

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size + 4, // 32px total height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // Figma 디자인에 맞는 3단계 드롭 섀도우
        filter: `
          drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.08))
          drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.08))
          drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.12))
        `,
      }}
    >
      {/* 원형 상단 */}
      <div
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: "50%",
          backgroundColor: "#191919",
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>

      {/* 삼각형 하단 */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${triangleSize}px solid transparent`,
          borderRight: `${triangleSize}px solid transparent`,
          borderTop: `${triangleSize}px solid #191919`,
          position: "relative",
          top: -1, // 원과 삼각형이 겹치도록
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default OverlayMarker;
