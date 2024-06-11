// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 400, height: 512 });

figma.ui.onmessage = ({ type, message }) => {
  if (type === "generate") {
    let { color, colorName, size, ...other } = message;

    console.log(message);

    // use color api?
    // if (colorName.length > 0) {
    //   colorName = formatColorName(colorName);
    // }

    // init(color, colorName, size);
    // createCard();

    figma.notify("Generated Card");
  } else {
    figma.closePlugin("Plugin Closed");
  }
};
