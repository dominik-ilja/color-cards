import {
  MESSAGE_TYPES,
  type MessageCreate,
  PLUGIN_DIMENSIONS,
  type PluginMessage,
} from "@/constants";

import { createCard } from "./createCard";

figma.showUI(__html__, {
  width: PLUGIN_DIMENSIONS.WIDTH,
  height: PLUGIN_DIMENSIONS.HEIGHT.DEFAULT,
});

figma.ui.onmessage = async ({
  type,
  message,
}: PluginMessage["pluginMessage"]) => {
  if (type === MESSAGE_TYPES.ADJUST_SIZE) {
    message.expanded
      ? figma.ui.resize(
          PLUGIN_DIMENSIONS.WIDTH,
          PLUGIN_DIMENSIONS.HEIGHT.EXPANDED,
        )
      : figma.ui.resize(
          PLUGIN_DIMENSIONS.WIDTH,
          PLUGIN_DIMENSIONS.HEIGHT.DEFAULT,
        );
  } else if (type === MESSAGE_TYPES.CREATE) {
    console.log(message);
    const { colors, name, selection, size } = message;
    await createCard(colors, name, selection, size);
    figma.notify("Generated Card");
  } else if (type === MESSAGE_TYPES.CLOSE) {
    figma.closePlugin("Plugin Closed");
  }
};
