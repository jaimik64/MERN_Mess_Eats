var nodemailer = require('nodemailer');

//FIXME: Fix this process.env.MAILD and PASSWORD
const ADMINID = process.env.MAILID || 'mesheats707@gmail.com';
const PASSWORD = process.env.PASSWORD || 'cusguscgohvxqfpc';

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: ADMINID,
        pass: PASSWORD
    },
    secure: true
})


exports.signUpMail = (email, name) => {

    const mailData = {
        from: `"Mesh Eats" <${ADMINID}>`,
        to: email,
        subject: 'Welcome to MeshEats Family',
        text: "We're very happy to see you onboard",
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>MeshEats</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
                integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js"
                integrity="sha384-ODmDIVzN+pFdexxHEHFBQH3/9/vQ9uori45z4JjnFsRydbmQbmL5t1tQ0culUzyK"
                crossorigin="anonymous"></script>
            <style>
                .box {
                    border: 2px dashed black;
                    padding: 5%;
                    top: 50%;
                    left: 50%;
                    margin: 4%;
                }
        
                span {
                    display: block;
                    padding-top: 2%;
                }
            </style>
        </head>
        
        <body>
            <div class="box">
                <h2>
                    <span>Hi ${name},</span>
                    <span>Thanks for joining us at MeshEats.</span>
                    <span>We'd Love to know why you signed up for MeshEats. Your feedback helps us to make sure that we're
                        delivering exactly what users want. Just Hit reply and let us know.</span>
                    <span>Thanks!!</span>
                </h2>
            </div>
        </body>
        
        </html>`
    }

    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log("Mail Sent");
    })
}

const html = (uname,) => { }
