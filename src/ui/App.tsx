import axios from "axios";
import React, { useEffect, useState } from "react";

import ColorCodesCheckGroup from "@/ui/components/ColorCodesCheckGroup";
import ColorGroup from "@/ui/components/ColorGroup";
import CustomName from "@/ui/components/CustomName";
import SizeSelection, { size } from "@/ui/components/SizeSelection";

import Button from "./components/Button";

type ButtonsProps = {
  onCreate: React.MouseEventHandler<HTMLButtonElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
};

function Buttons({ onCreate, onCancel }: ButtonsProps) {
  return (
    <div className="flex gap-x-3">
      <Button
        className="w-full"
        id="create"
        onClick={onCreate}
        variant="primary"
      >
        Create
      </Button>
      <Button className="w-full" id="cancel" onClick={onCancel}>
      Close
      </Button>
    </div>
  );
}

export default function App() {
  const [cardSize, setCardSize] = useState<size>("md");
  const [color, setColor] = useState("4f46e5");
  const [colorName, setColorName] = useState("");
  const [customName, setCustomName] = useState<string>("");

  /* Used to communicate with plugin code */
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
      useAPI: customName,
      size: cardSize,
      data: null,
    };

    if (message.useAPI) {
      try {
        // API URL : https://www.thecolorapi.com/docs

        const hexCode = message.color.slice(1);
        const { data } = await axios.get(
          `https://www.thecolorapi.com/id?hex=${hexCode}`,
        );

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
    <form className="p-4 m-0" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-y-6">
        <ColorGroup color={color} setColor={setColor} />

        {/* We need a way to get the selection from this component */}
        <SizeSelection />
        {/* We need a way to get the selection from this component */}
        <ColorCodesCheckGroup />

        <CustomName onCheck={() => {}} onTextChange={() => {}} />

        <Buttons onCreate={onRun} onCancel={onCancel} />
      </div>
    </form>
  );
}
