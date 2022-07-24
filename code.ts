const FIGMA_RGB = { r: null, g: null, b: null };
const FONT_PRIMARY = "Ubuntu Mono";
const FONT_SECONDARY = "Yuji Syuku";
const HSL = { h: null, s: null, l: null };
const ITEM_SPACING = 10;
const RGB = { r: null, g: null, b: null };
const SIZING = {
  sm: {
    colorName: {
      size: 10
    },
    colors: {
      size: 6
    },
    frame: {
      itemSpacing: 0,
      padding: [14, 10, 14, 10]
    },
    innerContainer: {
      itemSpacing: 1,
      padding: [7, 7, 28, 7],
    },
    swatch: {
      size: 96
    }
  },
  md: {
    colorName: {
      size: 16
    },
    colors: {
      size: 12
    },
    frame: {
      itemSpacing: 0,
      padding: [28, 20, 28, 20]
    },
    innerContainer: {
      itemSpacing: 3,
      padding: [14, 14, 56, 14],
    },
    swatch: {
      size: 192
    }
  },
  lg: {
    colorName: {
      size: 24
    },
    colors: {
      size: 18
    },
    frame: {
      itemSpacing: 0,
      padding: [42, 30, 42, 30]
    },
    innerContainer: {
      itemSpacing: 5,
      padding: [21, 21, 84, 21],
    },
    swatch: {
      size: 288
    }
  },
  xl: {
    colorName: {
      size: 36
    },
    colors: {
      size: 24
    },
    frame: {
      itemSpacing: 0,
      padding: [56, 40, 56, 40]
    },
    innerContainer: {
      itemSpacing: 5,
      padding: [28, 28, 112, 28],
    },
    swatch: {
      size: 384
    }
  },
  xxl: {
    colorName: {
      size: 48
    },
    colors: {
      size: 32
    },
    frame: {
      itemSpacing: 0,
      padding: [70, 50, 70, 50]
    },
    innerContainer: {
      itemSpacing: 8,
      padding: [35, 35, 140, 35],
    },
    swatch: {
      size: 480
    }
  },
};
let COLOR_NAME = null;
let HEX = null;
let SIZE = null;



function clone(val: object) {
  const type = typeof val;
  if (val === null) {
    return null;
  } else if (type === 'undefined' || type === 'number' ||
    type === 'string' || type === 'boolean') {
    return val;
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(x => clone(x));
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val);
    } else {
      let o = {};
      for (const key in val) {
        o[key] = clone(val[key]);
      }
      return o;
    }
  }
  throw 'unknown';
}

async function createCard() {
  const frame = createFrame();
  const innerContainer = createInnerContainer();
  const swatch = createSwatch();
  const colorName = await createColorName();
  const colors = await createColorElements();

  innerContainer.appendChild(swatch);
  innerContainer.appendChild(colorName);
  colors.forEach(color => innerContainer.appendChild(color));
  frame.appendChild(innerContainer);

}

async function createColorElements() {
  const { size } = SIZING[SIZE].colors;
  const colors = [
    {
      code: "hex",
      value: HEX
    },
    {
      code: "hsl",
      value: HSL
    },
    {
      code: "rgb",
      value: RGB
    }
  ];
  const textColor = "#000000";
  // console.log(colors);

  await figma.loadFontAsync({ family: FONT_SECONDARY, style: "Regular" });

  const els = await Promise.all(colors.map(async ({ code, value }) => {
    const colorName = figma.createText();


    colorName.autoRename = true;
    colorName.fontName = { family: FONT_SECONDARY, style: "Regular" };
    colorName.fontSize = size;
    setFills(colorName, textColor);


    switch (code) {
      case "rgb":
        colorName.characters = `${code.toUpperCase()} : ${value.r}, ${value.b}, ${value.g}`;
        break;

      case "hsl":
        colorName.characters = `${code.toUpperCase()} : ${value.h}, ${value.s}, ${value.l}`;
        break;

      case "hex":
        colorName.characters = `${code.toUpperCase()} : ${value}`;
        break;

      default:
        throw new Error("We shouldn't be here");
    }

    return colorName;
  }));

  // console.log("els: ", els);

  return els;
}

async function createColorName() {
  const { size } = SIZING[SIZE].colorName;
  const colorName = figma.createText();
  // console.log(colorName);

  await figma.loadFontAsync({ family: FONT_PRIMARY, style: "Regular" });

  colorName.autoRename = false;
  colorName.name = "Name";
  colorName.fontName = { family: FONT_PRIMARY, style: "Regular" };
  colorName.characters = COLOR_NAME;
  colorName.fontSize = size;
  setFills(colorName, "#000000");

  return colorName;
}

function createFrame() {
  const { itemSpacing, padding: p } = SIZING[SIZE].frame;

  const frame = figma.createFrame();
  frame.x = figma.viewport.center.x;
  frame.y = figma.viewport.center.y;
  frame.name = `${COLOR_NAME} - Color Card (${SIZE})`;
  frame.layoutMode = "VERTICAL";
  frame.itemSpacing = itemSpacing;
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "AUTO";
  setFills(frame);
  setPadding(frame, p[0], p[1], p[2], p[3]);

  return frame;
}

function createInnerContainer() {
  const { itemSpacing, padding: p } = SIZING[SIZE].innerContainer;

  const innerContainer = figma.createFrame();
  innerContainer.name = "Inner Container";
  innerContainer.layoutMode = "VERTICAL";
  innerContainer.primaryAxisSizingMode = "AUTO";
  innerContainer.counterAxisSizingMode = "AUTO";
  innerContainer.itemSpacing = itemSpacing;
  setPadding(innerContainer, p[0], p[1], p[2], p[3]);
  setFills(innerContainer, "#ffffff");

  return innerContainer;
}

function createSwatch() {
  const size = SIZING[SIZE].swatch.size;
  const swatch = figma.createRectangle();
  swatch.name = "Swatch";
  swatch.resize(size, size);
  setFills(swatch);

  return swatch;
}

function formatColorName(name: string) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

function generateFigmaRGB(hex: string) {
  const { r, g, b } = hexToRgb(hex);

  return {
    r: r / 255,
    g: g / 255,
    b: b / 255

  };
}

function hexToHSL(hex: string) {
  // Convert hex to RGB first
  let rSTR = "0", gSTR = "0", bSTR = "0";
  if (hex.length == 4) {
    rSTR = "0x" + hex[1] + hex[1];
    gSTR = "0x" + hex[2] + hex[2];
    bSTR = "0x" + hex[3] + hex[3];
  } else if (hex.length == 7) {
    rSTR = "0x" + hex[1] + hex[2];
    gSTR = "0x" + hex[3] + hex[4];
    bSTR = "0x" + hex[5] + hex[6];
  }
  // Then to HSL
  const r = Number(rSTR) / 255;
  const g = Number(gSTR) / 255;
  const b = Number(bSTR) / 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  console.log(h, s, l);

  return { h, s, l };
}

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function init(color: string, name: string, size: string) {
  setFigmaRGB(color);
  setRGB(color);
  setHSL(color);
  setHex(color);
  setColorName(name);
  SIZE = size;
}

function setColorName(name: string) {
  COLOR_NAME = name === "" ? "Name" : name;
}

function setFigmaRGB(color: string) {
  const { r, g, b } = generateFigmaRGB(color);
  FIGMA_RGB.r = r;
  FIGMA_RGB.g = g;
  FIGMA_RGB.b = b;
}

function setFills(el, hex = null) {
  // console.log("hex: ", hex);

  const { r, g, b } = hex === null ? FIGMA_RGB : generateFigmaRGB(hex);
  // console.log("rgb: ", r, g, b);

  const fills = clone(el.fills);


  fills[0].color.r = r;
  fills[0].color.b = b;
  fills[0].color.g = g;
  el.fills = fills;
  // console.log(fills);
  // console.log("el: ", el.name);

}

function setHex(color: string) {
  HEX = color;

  // #000000 -> {r: "00", b: "00", g: "00"}
  // const hex = color.slice(1); // remove hash at beginning of hex

  // for (let i = 0; i < hex.length; i++) {
  //   const char = hex[i];
  //   if (i < 2) {
  //     // target r
  //     HEX.r = HEX.r === null ? char : HEX.r += char;
  //   }
  //   else if (i < 4) {
  //     // target g
  //     HEX.g = HEX.g === null ? char : HEX.g += char;

  //   }
  //   else {
  //     // target b
  //     HEX.b = HEX.b === null ? char : HEX.b += char;

  //   }
  // }

}

function setHSL(color: string) {
  const { h, s, l } = hexToHSL(color);

  HSL.h = h;
  HSL.s = s;
  HSL.l = l;
}

function setPadding(el, top: number, right: number = top, bottom: number = top, left: number = right || top) {
  el.paddingTop = top;
  el.paddingRight = right;
  el.paddingBottom = bottom;
  el.paddingLeft = left;
}

function setRGB(color: string) {
  const { r, g, b } = hexToRgb(color);
  RGB.r = r;
  RGB.g = g;
  RGB.b = b;
}

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 400, height: 335 });

figma.ui.onmessage = ({ type, message }) => {

  if (type === "generate") {
    let { color, colorName, size, ...other } = message;

    // use color api?
    if (colorName.length > 0) {
      colorName = formatColorName(colorName);
    }

    init(color, colorName, size);
    createCard();


    figma.notify("Generated Card");
  }
  else {
    figma.closePlugin("Plugin Closed");
  }

};
