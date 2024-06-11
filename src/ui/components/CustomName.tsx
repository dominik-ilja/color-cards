import React, { useState } from "react";

type CustomNameProps = { onCheck: Function; onTextChange: Function };

export default function CustomName({ onCheck, onTextChange }: CustomNameProps) {
  const [isApiSelected, setIsApiSelected] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <input
          className="checkbox m-0 mr-3"
          id="color-api"
          type="checkbox"
          checked={isApiSelected}
          onChange={() => setIsApiSelected(!isApiSelected)}
        />
        <label className="label" htmlFor="color-api">
          Use custom name
        </label>
      </div>
      {isApiSelected && <input type="text" className="input mt-2 w-full" />}
    </div>
  );
}
