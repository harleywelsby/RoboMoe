import { ChatInputCommandInteraction } from "discord.js";
import { ingredients } from "../main.js";

export const doDrink = (interaction: ChatInputCommandInteraction) => {
  let recipe = "";

  if (ingredients.length < 2) {
    interaction.reply(
      "I don't have enough ingredients to make a drink! Add more ingredients with /add"
    );
    return;
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

  interaction.reply(
    `Here's your drink, ${interaction.member.user}! I call it the [TODO]!\n\n${recipe}`
  );
};
