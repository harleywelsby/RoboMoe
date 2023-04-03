# Robo-Moe

It's time to get creative with your friday night drinks! To use the bot, use the commands below to set up a 'cabinet' of ingredients,
then use /drink to create a new recipe, complete with an AI-generated name, using the <a href="https://openai.com/blog/openai-api">OpenAI API</a>.

# Commands:

- /drink - Pour up a drink
- /add - Add an ingredient to the liquor cabinet
- /remove - Remove an ingredient from the liquor cabinet
- /cabinet - See the current ingredients

# Setup instructions:

- Clone the repository
- Create a bot using the <a href="https://discord.com/developers">Discord Developer Portal</a>
- Generate an <a href="https://openai.com/blog/openai-api">OpenAI API</a> key
- Rename config.example.json to config.json
- Place your bot token, bot client ID (from Discord with Developer mode on), and OpenAI API key into config.json
- `npm run start` and you're good to go!
