import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, Events } from "discord.js";
import { UnrecognizedCommandMessage } from "../constants/const.js";
import { bot } from "../main.js";
import { doAdd } from "./add.js";
import { doCabinet } from "./cabinet.js";
import { doDrink } from "./drink.js";
import { doRemove } from "./remove.js";

// Functions called by commands

bot.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction as ChatInputCommandInteraction;

  switch (command.commandName) {
    case "add":
      doAdd(command);
      break;
    case "remove":
      doRemove(command);
      break;
    case "cabinet":
      doCabinet(command);
      break;
    case "drink":
      doDrink(command);
      break;
    default:
      command.reply(`${UnrecognizedCommandMessage} ${command.user}`);
  }
});

// Commands

export const add = new SlashCommandBuilder()
  .setName("add")
  .setDescription("Add an ingredient to the liquor cabinet")
  .addStringOption((option) =>
    option
      .setName("ingredient")
      .setDescription("Ingredient to add")
      .setRequired(true)
  );

export const remove = new SlashCommandBuilder()
  .setName("remove")
  .setDescription("Remove an ingredient from the liquor cabinet")
  .addStringOption((option) =>
    option
      .setName("ingredient")
      .setDescription("Ingredient to remove")
      .setRequired(true)
  );

export const cabinet = new SlashCommandBuilder()
  .setName("cabinet")
  .setDescription("See the current liquor cabinet");

export const drink = new SlashCommandBuilder()
  .setName("drink")
  .setDescription("Make a drink");
