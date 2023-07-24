import { Duck } from "components/Component";
import React from "react";

export type DuckProps = {
  duck: Duck;
};

function DuckComponent({ duck }: DuckProps) {
  return (
    <div>
      <h2>{duck.name}</h2>
    </div>
  );
}

export default DuckComponent;
