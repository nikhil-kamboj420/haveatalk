import { generateStreamToken } from "../lib/stream.js";
import { GoogleGenerativeAI } from '@google/generative-ai';
export  const  getStreamToken = async(req, res) =>{
try {
const token = await generateStreamToken(req.user.id);
res. status(200).json({token});
}
catch (error) {
console.log ("Error in getStreamToken controller:" , error.nessage);
res.status(500).json({message: "Internal Server Error"});

}}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
export const getUserMessage = async(req, res) => {
  try {
    const { message } = req.body;
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get response' });
  }
};