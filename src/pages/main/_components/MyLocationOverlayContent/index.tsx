import THEME from "@/constants/theme"

const MyLocationOverlayContent = () => {
  return (
    <div
      style={{
        position: "relative",
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 후광 효과 (외부 원형 그라데이션) */}
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(251, 63, 17, 0.3) 0%, rgba(251, 63, 17, 0.1) 50%, transparent 100%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* 중심 빨간색 점 */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: THEME.COLORS.PRIMARY.RED,
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  )
}

export default MyLocationOverlayContent
