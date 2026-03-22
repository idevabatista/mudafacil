import fs from "fs";
import path from "path";
import { tokens } from "./tokens";
import { tokenKeyToCssVar, sidebarKeyToCssVar } from "./utils";

const globalsCssPath = path.join(process.cwd(), "app", "globals.css");

function generateRootCss() {
  let cssVars = "  /* AUTO-GENERATED THEME TOKENS */\n";

  for (const [key, value] of Object.entries(tokens.colors)) {
    cssVars += `  ${tokenKeyToCssVar(key)}: ${value};\n`;
  }

  cssVars += `  --radius: ${tokens.radius};\n`;

  for (const [key, value] of Object.entries(tokens.sidebar)) {
    cssVars += `  ${sidebarKeyToCssVar(key)}: ${value};\n`;
  }

  return `/* --- DESIGN TOKENS START --- */\n@layer base {\n  :root {\n${cssVars}  }\n  .dark {\n    /* Dark variables could be mapped here *\\\n  }\n}\n/* --- DESIGN TOKENS END --- */`;
}

const isCheck = process.argv.includes("--check");

try {
  let content = fs.readFileSync(globalsCssPath, "utf-8");
  const newTokensBlock = generateRootCss();

  const startMarker = "/* --- DESIGN TOKENS START --- */";
  const endMarker = "/* --- DESIGN TOKENS END --- */";

  if (content.includes(startMarker) && content.includes(endMarker)) {
    content = content.replace(
      new RegExp(`\\/\\* --- DESIGN TOKENS START --- \\*\\/[\\s\\S]*?\\/\\* --- DESIGN TOKENS END --- \\*\\/`),
      newTokensBlock
    );
  } else {
    // Append to the end
    content = content + "\n\n" + newTokensBlock;
  }

  if (isCheck) {
    const currentContent = fs.readFileSync(globalsCssPath, "utf-8");
    if (currentContent !== content) {
      console.error("❌ globals.css desatualizado. Rode 'npm run tokens'");
      process.exit(1);
    } else {
      console.log("✅ globas.css syncado com tokens.ts");
    }
  } else {
    fs.writeFileSync(globalsCssPath, content, "utf-8");
    console.log("🚀 globals.css atualizado com sucesso a partir de tokens.ts");
  }
} catch (error) {
  console.error("Erro processando globals.css:", error);
  process.exit(1);
}
