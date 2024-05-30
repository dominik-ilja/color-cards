import React, { useEffect, useState } from "react";
import axios from "axios";

type size = "sm" | "md" | "lg" | "xl" | "xxl";

export default function App() {
  const [isApiSelected, setIsApiSelected] = useState(false);
  const [cardSize, setCardSize] = useState<size>("md");
  const [color, setColor] = useState("#000000");
  const [colorName, setColorName] = useState("");

  useEffect(() => {
    function listener(event: MessageEvent) {
      console.log(event);
      const { type, message } = event.data.pluginMessage;
    }

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  async function onRun() {
    if (!/^#[a-fA-F0-9]{6}$/.test(color)) {
      console.log("Invalid color");
      return;
    }

    const message = {
      color: color.toLowerCase(),
      colorName,
      useAPI: isApiSelected,
      size: cardSize,
      data: null,
    };

    if (message.useAPI) {
      try {
        // API URL : https://www.thecolorapi.com/docs

        const hexCode = message.color.slice(1);
        const { data } = await axios.get(`https://www.thecolorapi.com/id?hex=${hexCode}`);

        // update message values with data
        message.color = data.hex.value.toLowerCase();
        message.colorName = data.name.value;
        message.data = data;
      } catch (error) {
        console.dir(error);
        message.data = null;
      }
    }

    parent.postMessage({ pluginMessage: { type: "run" } }, "*");
  }
  function onCancel() {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  }

  return (
    <form className="color-card" id="card-form" onSubmit={(e) => e.preventDefault()}>
      <h1 className="color-card--title">Generate Color Card</h1>
      <div className="color-card--inner">
        {/* Color Name */}
        <label className="color-card--label" htmlFor="color-name">
          Color Name
        </label>
        <input
          className="color-card--input"
          id="color-name"
          type="text"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
        />

        {/* Color Picker */}
        <label className="color-card--label" htmlFor="color">
          Color
        </label>

        <div className="color-card--group">
          <input
            className="color-card--color"
            id="color"
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value.toLowerCase());
            }}
          />
          {/* Client Side Validation of Input */}
          <input
            className="color-card--input"
            id="color-text"
            type="text"
            title="Color code must be a valid hex code Ex: #000000"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            pattern="^#[a-fA-F0-9]{6}$"
            minLength={7}
            maxLength={7}
          />
        </div>

        {/* Card Size Selection */}
        <label className="color-card--label" htmlFor="card-size">
          Card Size
        </label>
        <select
          className="color-card--select"
          name="card-size"
          id="card-size"
          value={cardSize}
          onChange={(e) => setCardSize(e.target.value as size)}
        >
          <option value="sm">Small</option>
          <option value="md">Default</option>
          <option value="lg">Large</option>
          <option value="xl">X-Large</option>
          <option value="xxl">XX-Large</option>
        </select>

        {/* Use Color Api? */}
        <label className="color-card--label" htmlFor="color-api">
          Use Color API?
        </label>
        <input
          className="color-card--check"
          id="color-api"
          type="checkbox"
          checked={isApiSelected}
          onChange={() => setIsApiSelected(!isApiSelected)}
        />
      </div>
      <button className="color-card--button" id="create" onClick={onRun}>
        Create Card
      </button>
      <button className="color-card--button" id="cancel" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
