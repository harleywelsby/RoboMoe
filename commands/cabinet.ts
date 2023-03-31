import { ChatInputCommandInteraction } from "discord.js";
import { ingredients } from "../main.js";

export const doCabinet = (interaction: ChatInputCommandInteraction) => {
  const cabinet = ingredients.join(", ");
  interaction.reply(
    `Hey ${interaction.member.user}, Here's the ingredients I've got: ${cabinet}`
  );
};
