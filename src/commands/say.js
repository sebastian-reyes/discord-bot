module.exports = {
    description: 'Repite los mensajes',
    run: async (message) => {
        const args = message.content.split(' ').slice(1).join(' ');
        if(args.length < 1) return message.reply('Brinda un mensaje válido.');
        message.reply(args);
    }
}