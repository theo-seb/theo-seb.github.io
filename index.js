const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

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

const targetPath = path.join(__dirname, '/public/fr/index.html');
const resumePath = path.join(__dirname, '/resume.json');

exec(`resume export ${targetPath} --resume ${resumePath}`, (err) => {
    if (err) console.log(err);
    fs.readFile(targetPath, 'utf8', (err, htmlContent) => {
        if (err) console.log(err);
        for (const [english, french] of Object.entries(translations)) {
            htmlContent = htmlContent.replace(english, french);
        }
        fs.writeFile(targetPath, htmlContent, (err) => {
            if(err) console.log(err);
        })
    });
});