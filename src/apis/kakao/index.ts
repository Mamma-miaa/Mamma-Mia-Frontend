import axios from "axios";

/**
 * 카카오 로컬 API - 카테고리로 장소 검색 요청 파라미터
 * @see https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-category-request-query
 */
export interface SearchByCategoryRequest {
  /** 카테고리 그룹 코드 (필수) */
  category_group_code: string;
  /** 중심 좌표의 X값 혹은 경도(longitude) */
  x?: string;
  /** 중심 좌표의 Y값 혹은 위도(latitude) */
  y?: string;
  /** 중심 좌표로부터의 반경거리 (단위: 미터(m), 최대: 20000m) */
  radius?: number;
  /** 사각형의 지정 범위 내에서 제한 검색 (좌측 X 좌표, 좌측 Y 좌표, 우측 X 좌표, 우측 Y 좌표) */
  rect?: string;
  /** 결과 페이지 번호 (1~45 사이의 값, 기본값: 1) */
  page?: number;
  /** 한 페이지에 보여질 문서의 개수 (1~15 사이의 값, 기본값: 15) */
  size?: number;
  /** 정렬 방식 (distance 또는 accuracy, 기본값: accuracy) */
  sort?: "distance" | "accuracy";
}

export const getLocationByCategory = async (
  params: SearchByCategoryRequest
) => {
  return await axios.get(
    "https://dapi.kakao.com/v2/local/search/category.json",
    {
      params,
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
      },
    }
  );
};
