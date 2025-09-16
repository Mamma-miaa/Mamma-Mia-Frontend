import { overlay } from "overlay-kit";
import 가격대_필터링_바텀시트 from "./_components/가격대_필터링_바텀시트";

const use필터링_바텀시트 = () => {
  const open가격대_필터링_바텀시트 = () => {
    return overlay.openAsync(({ isOpen, close }) => {
      return <가격대_필터링_바텀시트 isOpen={isOpen} onClose={close} />;
    });
  };

  return {
    open가격대_필터링_바텀시트,
  };
};

export default use필터링_바텀시트;
