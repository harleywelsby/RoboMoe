import { ChatInputCommandInteraction } from "discord.js";
import { ingredients } from "../main.js";

export const doRemove = (interaction: ChatInputCommandInteraction) => {
  const ingredient = interaction.options.getString("ingredient").toLowerCase();

  if (!ingredients.find((i) => i === ingredient)) {
    interaction.reply(`${ingredient} isn't in the cabinet!`);
    return;
  }

  ingredients.splice(ingredients.indexOf(ingredient), 1);
  interaction.reply(`Successfully removed ${ingredient} from the cabinet!`);
};
