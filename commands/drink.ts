import { ChatInputCommandInteraction } from "discord.js";
import { ingredients } from "../main.js";
import { generateAiName, generateAiMethod } from "../util/aiInterface.js";
import config from "../config/config.json" assert { type: "json" };
import names from "../config/names.json" assert { type: "json" };

export async function doDrink(interaction: ChatInputCommandInteraction) {
  let recipe = "";

  if (ingredients.length < 2) {
    interaction.reply(
      "I don't have enough ingredients to make a drink! Add more ingredients with /add"
    );
    return;
  }

  if (config.UseAI) {
    // Discord only gives you 3 seconds to reply to a slash command, and the AI can take some time.
    // To solve this, we post a reply immediately and then edit it when the AI is done.
    // See: https://stackoverflow.com/questions/67413046/slash-commands-unknown-interaction
    interaction.reply("Working on it! The robots are thinking...");
  }

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

  if (config.UseAI) {
    const name = await generateAiName(recipe);
    const method = await generateAiMethod(name, recipe);
    interaction.editReply(
      `Here's your drink, ${interaction.member.user}! I call it the ${name}\n\n${recipe}\nInstructions:\n${method}`
    );
  } else {
    interaction.reply(
      `Here's your drink, ${
        interaction.member.user
      }! I call it the ${generateName()}\n\n${recipe}`
    );
  }
}

async function generateName() {
  const name = `${names[Math.floor(Math.random() * names.Names.length)]} ${
    names[Math.floor(Math.random() * names.Names.length)]
  }`;
  return name;
}
