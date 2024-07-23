export const MESSAGE_TYPES = {
  ADJUST_SIZE: "ADJUST_SIZE",
  CREATE: "CREATE",
  CLOSE: "CLOSE",
};
export const PLUGIN_DIMENSIONS = {
  HEIGHT: {
    DEFAULT: 480,
    EXPANDED: 528,
  },
  WIDTH: 400,
};

export type MessageAdjustSize = {
  pluginMessage: {
    type: "ADJUST_SIZE";
    message: {
      expanded: boolean;
    };
  };
};
export type MessageClose = {
  pluginMessage: {
    type: "CLOSE";
  };
};
export type MessageCreate = {
  pluginMessage: {
    type: "CREATE";
    message: {
      colors: any; // todo - update type
      name: string;
      selection: string[];
      size: {
        height: number;
        width: number;
      };
    };
  };
};

export type PluginMessage = MessageAdjustSize | MessageClose | MessageCreate;
