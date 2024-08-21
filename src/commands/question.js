const ExcelJS = require('exceljs');

const qaMap = new Map();

function normalizeText(text) {
    return text
        .toLowerCase() 
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^\w\s]|_/g, "") 
        .replace(/\s+/g, " ") 
        .trim(); 
}

async function loadQuestions() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('../resources/preguntas.xlsx');

    const worksheet = workbook.getWorksheet(1); 

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > 1) { 
            const question = normalizeText(row.getCell(1).text); 
            const answer = row.getCell(2).text; 
            qaMap.set(question, answer); 
        }
    });
}

loadQuestions();

module.exports = {
    description: 'Responde preguntas desde un archivo Excel',
    run: async (message) => {
        const userQuestion = normalizeText(message.content.split(' ').slice(1).join(' '));

        if (userQuestion.length < 1) {
            return message.reply('Brinda una pregunta válida.');
        }

        if (qaMap.has(userQuestion)) {
            message.reply(qaMap.get(userQuestion));
        } else {
            message.reply('Lo siento, no tengo una respuesta para esa pregunta.');
        }
    }
};
