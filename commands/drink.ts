import { ChatInputCommandInteraction } from "discord.js";
import { ingredients } from "../main.js";
import config from "../config/config.json" assert { type: "json" };
import { Configuration, OpenAIApi } from "openai";

export async function doDrink(interaction: ChatInputCommandInteraction) {
  let recipe = "";

  if (ingredients.length < 2) {
    interaction.reply(
      "I don't have enough ingredients to make a drink! Add more ingredients with /add"
    );
    return;
  }

  // Discord only gives you 3 seconds to reply to a slash command, and the AI can take some time.
  // To solve this, we post a reply immediately and then edit it when the AI is done.
  // See: https://stackoverflow.com/questions/67413046/slash-commands-unknown-interaction
  interaction.reply("Working on it! The robots are thinking...");

  // Use between 2 and 5 ingredients from the list
  const maxIngredients = ingredients.length < 5 ? ingredients.length : 5;
  const numIngredients = Math.floor(Math.random() * maxIngredients) + 2;
  const unusedIngredients = [...ingredients];

  for (let i = 0; i < numIngredients; i++) {
    // Get an ingredient and remove it from the unusedIngredients array
    const nextIngredient =
      unusedIngredients[Math.floor(Math.random() * unusedIngredients.length)];
    unusedIngredients.splice(unusedIngredients.indexOf(nextIngredient), 1);

    // Add the ingredient to the recipe
    const parts = Math.floor(Math.random() * 3) + 1;
    recipe += `${parts} part(s) ${nextIngredient}\n`;
  }

  const name = await generateName(recipe);
  const method = await generateMethod(name, recipe);

  interaction.editReply(
    `Here's your drink, ${interaction.member.user}! I call it the ${name}\n\n${recipe}\nInstructions:\n${method}`
  );
}

// Connect to OpenAI and generate a cool name for the drink
async function generateName(ingredients: string) {
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

async function generateMethod(title: string, ingredients: string) {
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
