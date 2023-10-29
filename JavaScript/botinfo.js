const Discord = require('discord.js');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { performance } = require('perf_hooks');
const os = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Grab\'s the bot information'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        try {
            const guildsCache = client.guilds.cache;
            if (!guildsCache) {
                throw new Error("Guilds cache is not available");
            }
       const discordjsVersion = Discord.version; // Get Discord.js version
       let servercount = guildsCache.reduce((a, b) => a + b.memberCount, 0);

       const dbPingStart = Date.now();
       const dbPing = Date.now() - dbPingStart;
       let totalSeconds = (client.uptime / 1000);
       let days = Math.floor(totalSeconds / 86400);
       totalSeconds %= 86400;
       let hours = Math.floor (totalSeconds / 3600);
       totalSeconds %=3600;
       let minutes = Math.floor(totalSeconds / 60);
       let seconds = Math.floor(totalSeconds % 60);


        let uptime = `${days} days,  ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

          // Get memory usage
          const memoryUsage = process.memoryUsage();
          const memoryUsed = Math.ceil(memoryUsage.rss / (1024 * 1024)); // Convert to megabytes
          const memoryTotal = Math.ceil(os.totalmem() / (1024 * 1024 * 1024)); // Convert to gigabytes

          // Calculate CPU usage
          const usage = process.cpuUsage();
          const usagePercent = Math.ceil((usage.system / usage.user) * 100);

            const embed = new EmbedBuilder()
    .setColor("DarkGrey")
    .setTitle("Xyron's Information")
    .setTimestamp()
          .addFields(
              { name: "Basic Information", value: `- Developer: \`@logicnovax\`\n- DevID: \`1163857331138875513\`\n\n- Server Count: ${interaction.client.guilds.cache.size}\n- User Count: ${servercount}\n- Prefix: \`?\`\n- Invite link: [Click Here](https://discord.com/api/oauth2/authorize?client_id=1163857331138875513&permissions=8&scope=applications.commands%20bot)\n- Docs: [Coming Soon](https://discord.gg/)\n- Bot Version: \`v1.0\`` },
              { name: "Statistics", value: `- Uptime: ${uptime}\n- API Latency: ${Math.round(interaction.client.ws.ping)}ms\n- Memory Usage: ${memoryUsed} MB\n- Memory Total: ${memoryTotal} GB\n- CPU Usage: ${usagePercent}%\n- Discord.js: \`v${discordjsVersion}\`\n- Node.js: \`v${process.version}\`` }
          );

await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply("An error occurred while fetching bot information");
        }
    },
};
