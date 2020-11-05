const { exec } = require('child_process');
const { stdout, stderr } = require('process');
const fs = require('fs');

const translations = {
    Contact: 'Contact',
    About: 'A propos',
    Profiles: 'Réseaux sociaux',
    Work: 'Expériences',
    Education: 'Etudes',
    Skills: 'Compétences',
    Languages: 'Langues',
    Interests: "Centres d'intérêt",
};

exec('resume export ./public/index.html', (err, stdout, stderr) => {
    if (err) console.log(err);
    fs.readFile('./public/index.html', 'utf8', (err, htmlContent) => {
        if (err) console.log(err);
        for (const [english, french] of Object.entries(translations)) {
            htmlContent = htmlContent.replace(english, french);
        }
        fs.writeFile('./public/index.html', htmlContent, (err) => {
            if(err) console.log(err);
        })
    });
});