import { SIZES } from "@/constants";

const FONT_INTER_BOLD = { family: "Inter", style: "Bold" };
const FONT_FIRA_MONO_REGULAR = { family: "Fira Mono", style: "Regular" };

function setPadding(
  el: FrameNode,
  top: number,
  right: number = top,
  bottom: number = top,
  left: number = right || top,
) {
  el.paddingTop = top;
  el.paddingRight = right;
  el.paddingBottom = bottom;
  el.paddingLeft = left;
}

async function loadFonts() {
  const fonts = [
    { family: "Inter", style: "Regular" },
    FONT_INTER_BOLD,
    FONT_FIRA_MONO_REGULAR,
  ];

  await Promise.all(fonts.map((f) => figma.loadFontAsync(f)));
}

export async function createCard(
  colors: any,
  name: string,
  selection: string[],
  size: string,
) {
  console.log(arguments);
  const fillColor: Paint[] = [
    { type: "SOLID", color: figma.util.rgb(colors.hex) },
  ];
  const textDefaultColor: Paint[] = [
    { type: "SOLID", color: figma.util.rgb("#111827") },
  ];
  const textSecondaryColor: Paint[] = [
    { type: "SOLID", color: figma.util.rgb("#6B7280") },
  ];
  const hasCmyk = selection.find((s) => s === "cmyk");

  await loadFonts();

  // Create main frame
  const frame = figma.createFrame();
  frame.x = figma.viewport.center.x;
  frame.y = figma.viewport.center.y;
  frame.name = `${name} - Color Card`;
  frame.layoutMode = "VERTICAL";
  frame.itemSpacing = 0;
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "AUTO";
  frame.fills = fillColor;
  setPadding(frame, 28, 20);

  // Create inner container
  const innerContainer = figma.createFrame();
  innerContainer.name = "Inner Container";
  innerContainer.layoutMode = "VERTICAL";
  innerContainer.primaryAxisSizingMode = "AUTO";
  innerContainer.counterAxisSizingMode = "AUTO";
  innerContainer.itemSpacing = 12;
  setPadding(innerContainer, 14, 14, 24, 14);

  // Create swatch
  const swatch = figma.createRectangle();
  swatch.name = "Swatch";
  swatch.resize(192, 192);
  swatch.fills = fillColor;

  // Create color name text
  const cardName = figma.createText();
  cardName.autoRename = false;
  cardName.name = "Name";
  cardName.characters = name;
  cardName.fontSize = 16;
  cardName.fills = textDefaultColor;
  cardName.fontName = FONT_INTER_BOLD;

  // Create color code text
  const codeContainer = figma.createFrame();
  codeContainer.layoutMode = "VERTICAL";
  codeContainer.counterAxisSizingMode = "AUTO";
  codeContainer.itemSpacing = 8;
  codeContainer.paddingTop = 4;

  const codes = selection.map((code) => {
    const el = figma.createText();

    let label = code.toUpperCase();
    let value =
      code === "hex"
        ? "#" + colors[code].toLowerCase()
        : `(${colors[code].join(", ")})`;

    if (hasCmyk) {
      label = label.padEnd(4, " ");
    }

    el.autoRename = false;
    el.characters = `${label} ${value}`;
    el.fills = textSecondaryColor;
    el.fontName = FONT_FIRA_MONO_REGULAR;
    el.fontSize = 12;
    el.name = code;

    return el;
  });

  innerContainer.appendChild(swatch);
  innerContainer.appendChild(cardName);
  codes.forEach((el) => codeContainer.appendChild(el));
  if (selection.length > 0) innerContainer.appendChild(codeContainer);
  frame.appendChild(innerContainer);

  switch (size) {
    case SIZES.SMALL:
      frame.rescale(0.8);
      break;
    case SIZES.LARGE:
      frame.rescale(1.2);
      break;
    case SIZES.XLARGE:
      frame.rescale(1.4);
      break;
    case SIZES["2XLARGE"]:
      frame.rescale(1.6);
      break;
  }
}
