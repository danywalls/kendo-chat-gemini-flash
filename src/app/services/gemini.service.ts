import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { marked } from 'marked';
import { GEMINI_KEY } from '../../enviroment';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  KENDO_RECOMMEND_PROMPT = `
Given a screenshot of a browser tell me which kendo ui components help me to solve,
and why can help me to build that UI.

The response a string , with the section detected , the components of kendo and a url.

Format the output as Markdown. Include headings, bold text, bullet points, and hyperlinks as appropriate.
`;

  private generativeModel = new GoogleGenerativeAI(
    GEMINI_KEY,
  ).getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  async getResponse(image: string): Promise<string> {
    console.log(image);
    const { response } = await this.generativeModel.generateContent([
      this.KENDO_RECOMMEND_PROMPT,
      image,
    ]);
    const llmResponse = response.text();
    return marked(llmResponse);
  }
}
