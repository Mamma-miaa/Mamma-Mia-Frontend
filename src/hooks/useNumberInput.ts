import { useState } from "react"

const useNumberInput = ({ initialValue }: { initialValue?: number } = {}) => {
  const [value, setValue] = useState(initialValue || 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.match(/^\d*$/)) {
      setValue(Number(newValue))
    }
  }

  return { value, handleChange }
}

export default useNumberInput
