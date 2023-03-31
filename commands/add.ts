import { ChatInputCommandInteraction } from "discord.js";
import { ingredients } from "../main.js";

export const doAdd = (interaction: ChatInputCommandInteraction) => {
  const ingredient = interaction.options.getString("ingredient").toLowerCase();

  if (ingredients.find((i) => i === ingredient)) {
    interaction.reply(`${ingredient} is already in the cabinet!`);
    return;
  }

  ingredients.push(ingredient);
  interaction.reply(`Successfully added ${ingredient} to the cabinet!`);
};
