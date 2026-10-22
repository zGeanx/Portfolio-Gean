import fs from "node:fs";

const configPath = ".output/server/wrangler.json";
const apiKey = process.env.RESEND_API_KEY?.trim();

if (!apiKey || !fs.existsSync(configPath)) {
  console.log("[contato] Build sem RESEND_API_KEY. O worker publicado não recebe a chave.");
  process.exit(0);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
config.vars = { ...config.vars, RESEND_API_KEY: apiKey };
fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
console.log("[contato] RESEND_API_KEY anexada ao worker para o formulário em produção.");
