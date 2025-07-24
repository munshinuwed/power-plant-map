import React from "react";

interface StateFilterProps {
  selected: string;
  onChange: (val: string) => void;
  stateList: string[];
}

const StateFilter: React.FC<StateFilterProps> = ({ selected, onChange, stateList }) => {
  return (
    <select value={selected} onChange={(e) => onChange(e.target.value)} style={{ padding: "0.5rem" }}>
      <option value="">All States</option>
      {stateList.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
};

export default StateFilter;
