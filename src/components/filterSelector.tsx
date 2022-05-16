import React, { ReactElement } from "react";

export type FilterObject = {
  name: string;
  value: any;
};

export type FilterSelectorProps = {
  filterOptions: Array<FilterObject>;
  onSelectorChange(event: React.SyntheticEvent<HTMLSelectElement>): any; // eslint-disable-line
};

const FilterSelector = ({
  filterOptions,
  onSelectorChange,
}: FilterSelectorProps): ReactElement => (
  <div className="input-field col s12 m6 l4">
    <select className="browser-default" onChange={onSelectorChange}>
      {filterOptions.map((option: FilterObject, i: any) => (
        <option
          key={i}
          value={option.value}
        >{`${option.name} : ${option.value}`}</option>
      ))}
    </select>
  </div>
);

export default FilterSelector;
