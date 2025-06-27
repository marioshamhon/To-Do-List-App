import { GoogleGenAI } from "@google/genai";
import CustomError from "../utils/CustomError";
import { NextFunction, Request, Response } from "express";
import { GEMINI_API_KEY } from "../config/env";
import { Todo } from "../helper_functions/todoHelpers";

export async function getAiSuggestion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { todosArray } = req.body;

    if (!todosArray || todosArray.length === 0) {
      const error = new CustomError("TodosArray invalid");
      error.statusCode = 400;
      throw error;
    }

    const geminiAiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const todoTextArray = todosArray.map((todo: Todo) => todo.todoText);

    const prompt = `
The user has written the following to-do list items:

${todoTextArray
  .map((text: string, index: number) => `${index + 1}. ${text}`)
  .join("\n")}

Based on these, generate a list of 5 suggested to-do items.

Return the result as a JSON array in the following format:

[
  {
    "_id": "0",
    "textSuggestion": "string",
    "isCompleted": false
  },
  ...
]

The "_id" field should be a string representing an incrementing number starting from "0". The array should contain exactly 5 objects. Ensure the response is ONLY the raw JSON array, without any explanations or extra text.
`;

    const response = await geminiAiClient.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const rawTextFromGemini =
      response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawTextFromGemini) {
      const error = new CustomError("Gemini returned no text to parse");
      error.code = 502;
      throw error;
    }

    const cleanText = rawTextFromGemini
      ?.replace(/```json/, "")
      .replace(/```/, "")
      .trim();

    const suggestions = JSON.parse(cleanText);

    res.status(200).json({
      success: true,
      message: "Successfully retrieved suggestions from Gemini AI",
      data: {
        suggestions,
      },
    });
  } catch (error) {
    next(error);
  }
}
