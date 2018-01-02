const nodemailer = require('nodemailer');
const striptags = require('striptags');

var self = module.exports = {

    /**
     * Create a mail 
     * 
     * @param {String} to 
     * @param {String} subject 
     * @param {String} html 
     */
    createEmail(to, subject, html) {
        return new Promise((resolve, reject) => {
            let mailOptions = {
                from: 'projet645.1@gmail.com',
                to: to,
                subject: subject,
                text: striptags(html),
                html: html
            };

            self.sendEmail(self.createTransporter(), mailOptions).then(() => {
                resolve()
            })
        });
    },

    /**
     * Create the mail transporter
     */
    createTransporter() {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'san.tour.hes@gmail.com',
                pass: 'santourhes'
            }
        });
        return transporter;
    },

    /**
     * Send the mail
     * 
     * @param {transporter} transporter 
     * @param {mailOptions} mailOptions 
     */
    sendEmail(transporter, mailOptions) {
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        })

    }
}