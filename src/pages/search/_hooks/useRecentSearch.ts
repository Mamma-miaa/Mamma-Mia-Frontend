import { useState } from "react";
import {
  getRecentSearches,
  addRecentSearch,
  removeRecentSearch,
  clearAllRecentSearches,
} from "@/utils/localStorage";
import { useNavigate } from "react-router-dom";

const useRecentSearch = () => {
  const [recentSearch, setRecentSearch] = useState<string[]>(
    getRecentSearches()
  );
  const navigate = useNavigate();

  // 검색어 저장 함수
  const handleSearch = (query: string) => {
    if (query.trim()) {
      addRecentSearch(query);
      setRecentSearch(getRecentSearches());
      navigate(`/search/result?query=${query}`);
    }
  };

  // 개별 검색어 삭제 함수
  const handleRemoveSearch = (searchTerm: string) => {
    removeRecentSearch(searchTerm);
    setRecentSearch(getRecentSearches());
  };

  // 전체 검색어 삭제 함수
  const handleClearAll = () => {
    clearAllRecentSearches();
    setRecentSearch([]);
  };

  // 검색어 클릭 시 검색 실행
  const handleSearchClick = (searchTerm: string) => {
    handleSearch(searchTerm);
  };

  return {
    recentSearch,
    handleSearch,
    handleRemoveSearch,
    handleClearAll,
    handleSearchClick,
  };
};

export default useRecentSearch;
