const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const language = process.argv[2];

const translationWords = {
    Contact: 'Contact',
    About: 'À propos',
    Profiles: 'Réseaux sociaux',
    Work: 'Expériences',
    Education: 'Études',
    Skills: 'Compétences',
    Languages: 'Langues',
    Interests: "Centres d'intérêt",
    Courses: 'Cours',
    Phone: 'Téléphone'
};

const translationDates = {
    Jan: 'Janvier',
    Feb: 'Février',
    Mar: 'Mars',
    Apr: 'Avril',
    May: 'Mai',
    Jun: 'Juin',
    Jul: 'Juillet',
    Aug: 'Août',
    Sep: 'Septembre',
    Oct: 'Octobre',
    Nov: 'Novembre',
    Dec: 'Décembre',
    Present: `Aujourd'hui`,
};

const translations = { ...translationWords, ...translationDates };

const targetPath = path.join(__dirname, `/docs/${language}/index.html`);
const resumePath = path.join(__dirname, `/resume_${language}.json`);

exec(`resume export ${targetPath} --resume ${resumePath}`, (err) => {
    if (err) console.log(err);
    if (language === 'fr') {
        fs.readFile(targetPath, 'utf8', (err, htmlContent) => {
            if (err) console.log(err);
            for (const [english, french] of Object.entries(translations)) {
                htmlContent = htmlContent.replace(new RegExp(english, 'g'), french);
            }
            fs.writeFile(targetPath, htmlContent, (err) => {
                if(err) console.log(err);
            })
        });
    }
});