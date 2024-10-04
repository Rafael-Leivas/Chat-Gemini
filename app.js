const { GoogleGenerativeAI } = require("@google/generative-ai");

const chaveAPI = new GoogleGenerativeAI("AIzaSyAgp9chmYcbsJUXhn54mR2Gp8RwgrbyXvk");
const model = chaveAPI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "por que o gremio é o maior time do sul do brasil";

async function generateText(){
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}

generateText()