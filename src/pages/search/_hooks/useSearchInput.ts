import { useState } from "react"

const useSearchInput = ({ initialValue }: { initialValue?: string } = {}) => {
  const [inputValue, setInputValue] = useState(initialValue || "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
  }

  return { inputValue, handleChange }
}

export default useSearchInput
