require('dotenv').config('./.env');

const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

const emails = [];

app.post('/register', (req, res) => {

    const { email, name, number } = req.body;

    if(emails.includes(email)){
        return res.json('Email já registrado.');;
    }

    emails.push(email);

    const message_to_user = {
        to: `${email}`,
        from: 'curso@ipkonect.com.br',
        subject: 'Cadastro IP Konect',
        html: `<p>Olá,  <strong>${name}</strong></p><p> Seu cadastro foi realizado com sucesso.
        Entre no grupo vip para receber informações sobre automação.
        </p>
        <a href="https://chat.whatsapp.com/JQksiz2A1QN9L1oiJRkOTW" target="_blank">Se junte ao grupo</a>`,
    }

    sgMail
        .send(message_to_user)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error)
        });

    const message_to_curse = {
        to: 'curso@ipkonect.com.br',
        from: 'curso@ipkonect.com.br',
        subject: 'Cadastro de usuário',
        html: `<strong>E-mail: ${email}</strong>
               <strong>Nome: ${name} </strong>
               <strong>Número: ${number}</strong>`,
    }

    sgMail
    .send(message_to_curse)
    .then(() => {
        console.log('Email sent');
    })
    .catch((error) => {
        console.error(error)
    });
    
    res.json('Email Enviado');
});

app.listen(process.env.PORT || 4000);
