import React from "react";
import FormInput from "../../UI/FormInput/Input";

interface FilterInputProps {
  filter: string;
  onFilterChange: (value: string) => void;
  placeholder?: string;
}

const FilterInput: React.FC<FilterInputProps> = ({
  filter,
  onFilterChange,
  placeholder = "Фильтр..."
}) => {
  return (
    <FormInput
      value={filter}
      type="text"
      label="Поиск"
      callback={onFilterChange}
    />
  );
};

export default FilterInput;
