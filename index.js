const express = require('express');
const path = require('path');
const app = express();
const port = 9000;

// Middleware pour vérifier les heures de travail
const checkWorkingHours = (req, res, next) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); 
    const currentHour = currentDate.getHours();

    // Du lundi (1) au vendredi (5), entre 9h et 17h
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
        next();
    } else {
        res.send('<h1>Nous sommes fermés</h1><p>Veuillez revenir du lundi au vendredi entre 9h et 17h.</p>');
    }
};

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
    res.render('home'); 
});

app.get('/services', (req, res) => {
    res.render('service'); 
});

app.get('/contact', (req, res) => {
    res.render('contact'); 
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:9000/`);
});
