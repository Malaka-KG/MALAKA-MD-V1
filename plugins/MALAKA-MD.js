const { readEnv } = require("../lib/database");
const { cmd, commands } = require("../command");
let listenerRegistered = false;

const sendWelcomeMessage = async (client, groupId, participants) => {
  try {
    const groupMetadata = await client.groupMetadata(groupId);
    const groupName = groupMetadata.subject;
    const groupDescription = groupMetadata.desc || "No description available.";
    const envVars = await readEnv();

    if (!envVars.WELCOME_SET) {
      throw new Error("WELCOME_SET is not defined in the environment variables.");
    }

    let invisibleSpace = '​'.repeat(4000);
    let messageContent = `\n${envVars.WELCOME_SET}\n\n*Name :*\n${groupName}\n\n*Description :*\n${groupDescription}\n\nᴄ`;
    const mentions = participants.map(participant => '@' + participant.split('@')[0]).join("\n");
    let welcomeMessage = `*Hey 🫂♥️*\n${mentions}\n*Welcome to Group ⤵️*\n${invisibleSpace}${messageContent}`;

    await client.sendMessage(groupId, {
      image: { url: 'https://i.imgur.com/vzDwkjg.jpeg' },
      caption: welcomeMessage,
      mentions: participants
    });

    await sendGroupRulesAlert(client, participants, groupName, groupDescription);
  } catch (error) {
    console.error("Error sending welcome message:", error);
  }
};

const sendGroupRulesAlert = async (client, participants, groupName, groupDescription) => {
  try {
    const envVars = await readEnv();

    if (envVars.WELCOME_ALERT === undefined) {
      throw new Error("WELCOME_ALERT is not defined in the environment variables.");
    }

    if (envVars.WELCOME_ALERT === "true") {
      const alertMessage = `*Hey Dear 🫂❤️*\n\n*Welcome to ${groupName}*\n\n${groupDescription}\n\n*Be sure to read the group description*\n\nꜟᴄ`;

      for (const participant of participants) {
        try {
          if (!participant) {
            continue;
          }

          await client.sendMessage(participant, {
            image: { url: 'https://i.imgur.com/vzDwkjg.jpeg' },
            caption: alertMessage
          });
        } catch (error) {
          console.error("Error sending message to " + participant + ':', error);
        }
      }
    }
  } catch (error) {
    console.error("Error sending group rules alert:", error);
  }
};

const registerGroupWelcomeListener = client => {
  if (!listenerRegistered) {
    client.ev.on('group-participants.update', async event => {
      const { id: groupId, participants, action } = event;

      if (action === "add" && participants.length > 0) {
        console.log("New participants:", participants);
        await sendWelcomeMessage(client, groupId, participants);
      }
    });
    listenerRegistered = true;
  }
};

cmd({ on: "body" }, async (client, message, chat, { from, body, isOwner }) => {
  try {
    const envVars = await readEnv();

    if (envVars.WELCOME === undefined) {
      throw new Error("WELCOME is not defined in the environment variables.");
    }

    if (envVars.WELCOME === "true") {
      if (isOwner) {
        return;
      }
      registerGroupWelcomeListener(client);
    }
  } catch (error) {
    console.log(error);
    await chat.reply("Error: " + error.message);
  }
});
