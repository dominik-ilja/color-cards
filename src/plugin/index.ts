import { MESSAGE_TYPES, PLUGIN_DIMENSIONS } from "@/constants";

figma.showUI(__html__, { width: 400, height: 480 });

figma.ui.onmessage = ({ type, message }) => {
  if (type === MESSAGE_TYPES.ADJUST_SIZE) {
    message.expanded ? figma.ui.resize(400, 528) : figma.ui.resize(400, 480);
  } else if (type === MESSAGE_TYPES.CREATE) {
    console.log(message);

    // init(color, colorName, size);
    // createCard();

    figma.notify("Generated Card");
  } else if (type === MESSAGE_TYPES.CLOSE) {
    figma.closePlugin("Plugin Closed");
  }
};
