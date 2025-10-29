/**
 * 로컬스토리지 유틸리티 함수
 */

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 10;

/**
 * 최근 검색어를 로컬스토리지에서 가져옵니다.
 * @returns 최근 검색어 배열 (최대 5개)
 */
export const getRecentSearches = (): string[] => {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("최근 검색어를 가져오는 중 오류가 발생했습니다:", error);
    return [];
  }
};

/**
 * 최근 검색어를 로컬스토리지에 저장합니다.
 * @param searchTerm 검색어
 */
export const addRecentSearch = (searchTerm: string): void => {
  try {
    if (!searchTerm.trim()) return;

    const currentSearches = getRecentSearches();

    // 중복 제거 (기존에 있던 검색어를 제거)
    const filteredSearches = currentSearches.filter(
      (term) => term !== searchTerm.trim()
    );

    // 새로운 검색어를 맨 앞에 추가
    const newSearches = [searchTerm.trim(), ...filteredSearches];

    // 최대 개수 제한
    const limitedSearches = newSearches.slice(0, MAX_RECENT_SEARCHES);

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limitedSearches));
  } catch (error) {
    console.error("최근 검색어를 저장하는 중 오류가 발생했습니다:", error);
  }
};

/**
 * 특정 검색어를 최근 검색어에서 삭제합니다.
 * @param searchTerm 삭제할 검색어
 */
export const removeRecentSearch = (searchTerm: string): void => {
  try {
    const currentSearches = getRecentSearches();
    const filteredSearches = currentSearches.filter(
      (term) => term !== searchTerm
    );

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filteredSearches));
  } catch (error) {
    console.error("최근 검색어를 삭제하는 중 오류가 발생했습니다:", error);
  }
};

/**
 * 모든 최근 검색어를 삭제합니다.
 */
export const clearAllRecentSearches = (): void => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error("최근 검색어를 모두 삭제하는 중 오류가 발생했습니다:", error);
  }
};
