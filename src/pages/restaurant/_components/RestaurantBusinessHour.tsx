import type { components } from "@/apis/schema";
import { DAY_OF_WEEK } from "./RestaurantInformation";

const RestaurantBusinessHour = ({
  businessHour,
}: {
  businessHour?: components["schemas"]["GetStoreDetailResponseBusinessHour"] & {
    isToday: boolean;
  };
}) => {
  return (
    <>
      {businessHour?.dayOfWeek && DAY_OF_WEEK[businessHour.dayOfWeek].ko}{" "}
      {[businessHour?.openTime, businessHour?.closeTime].every(Boolean) ? (
        <>
          {businessHour?.openTime} ~ {businessHour?.closeTime}
        </>
      ) : (
        "-"
      )}
    </>
  );
};

export default RestaurantBusinessHour;
