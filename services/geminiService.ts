import { GoogleGenAI, Type } from "@google/genai";
import { AIGeneratedStats } from '../types';

const schema = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: "A brief, flavorful description of the character build and its playstyle for Nin Online, written in the second person (e.g., 'You are a...')."
    },
    str: { type: Type.INTEGER, description: "Final Strength score (base 5 + allocated points)." },
    for: { type: Type.INTEGER, description: "Final Fortitude score (base 5 + allocated points)." },
    int: { type: Type.INTEGER, description: "Final Intellect score (base 5 + allocated points)." },
    agi: { type: Type.INTEGER, description: "Final Agility score (base 5 + allocated points)." },
    cha: { type: Type.INTEGER, description: "Final Chakra score (base 5 + allocated points)." },
  },
  required: ["description", "str", "for", "int", "agi", "cha"]
};

export const suggestBuild = async (prompt: string, firstMastery: string, secondMastery: string): Promise<AIGeneratedStats> => {
    try {
        // Initialize GoogleGenAI right before the call to ensure it uses the current process.env.API_KEY.
        // This is a best practice for serverless and hosted environments like Netlify.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const masteries = [firstMastery, secondMastery].filter(Boolean);
        let masteryInfo = '';
        if (masteries.length > 0) {
            masteryInfo = ` The character's chosen masteries are ${masteries.join(' and ')}.`
        }

        const fullPrompt = `You are an expert on the MMORPG 'Nin Online'. A user wants a character build suggestion for a level 60 character.${masteryInfo} In Nin Online, characters start with 5 points in each of the 5 stats: Strength, Agility, Intellect, Chakra, and Fortitude. They gain a total of 285 additional points by level 60 to distribute among these stats. Based on the user's request: "${prompt}", generate a short, flavorful description and a recommended final stat distribution. The final stats for each attribute should be the base 5 points plus the allocated points. The sum of allocated points across all five stats must equal exactly 285. Please adhere to the provided JSON schema.`;

        // Use 'gemini-3-flash-preview' for basic text/generation tasks.
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: fullPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        
        // Correctly accessing text content via the .text property.
        const jsonText = response.text.trim();
        const generatedBuild = JSON.parse(jsonText);

        // Basic validation
        if (typeof generatedBuild.description !== 'string' || typeof generatedBuild.str !== 'number') {
            throw new Error("AI returned data in an unexpected format.");
        }

        return generatedBuild as AIGeneratedStats;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Neural Architect synthesis failed. Please ensure the API_KEY environment variable is correctly set in your Netlify dashboard.");
    }
};