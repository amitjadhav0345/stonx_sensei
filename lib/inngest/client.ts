import { Inngest} from "inngest";

export const inngest = new Inngest({
    id: 'stonx-sensei',
    name: "Stonx Sensei App",
    ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! }}
})