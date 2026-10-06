import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
await mkdir(resolve(root, "dist/server"), { recursive: true });
await mkdir(resolve(root, "dist/.openai"), { recursive: true });
await cp(resolve(root, "worker"), resolve(root, "dist/server"), { recursive: true });
const hosting = JSON.parse(await readFile(resolve(root, ".openai/hosting.json"), "utf8"));
await writeFile(resolve(root, "dist/.openai/hosting.json"), JSON.stringify(hosting, null, 2) + "\n");
console.log("JW Hamburgueria worker built successfully.");
