import { Configuration, OpenAIApi } from "openai";
import config from "../config/config.json" assert { type: "json" };

// Connect to OpenAI and generate a cool name for the drink
export async function generateAiName(ingredients: string) {
  const prompt = `Human: Generate a name for a cocktail with the following ingredients:\n ${ingredients} AI:`;

  const configuration = new Configuration({
    apiKey: config.OpenAiKey,
  });
  const openai = new OpenAIApi(configuration);

  const name = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["AI:"],
    })
    .then((response) => {
      const drinkName = response.data.choices[0].text.trimStart();

      // If the name has quotes, then the bot has sent other text around the name.
      // Cut out the extra text and just return the name.
      if (drinkName.includes('"')) {
        return drinkName.split('"')[1];
      }

      return drinkName;
    });

  return name.trimEnd();
}

export async function generateAiMethod(title: string, ingredients: string) {
  const prompt = `Human: How do I make a cocktail titled "${title}" with the following ingredients:\n ${ingredients}? AI:`;

  const configuration = new Configuration({
    apiKey: config.OpenAiKey,
  });
  const openai = new OpenAIApi(configuration);

  const method = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["AI:"],
    })
    .then((response) => {
      return response.data.choices[0].text.trimStart();
    });

  return method;
}
