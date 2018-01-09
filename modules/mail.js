const nodemailer = require('nodemailer');
const striptags = require('striptags');

var self = module.exports = {

    /**
     * @description Create a mail and send it
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

            self._sendEmail(self._createTransporter(), mailOptions).then(() => {
                resolve()
            })
        });
    },

    /**
     * @description Create the mail transporter
     */
    _createTransporter() {
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
     * @description Send the mail
     * @param {transporter} transporter 
     * @param {mailOptions} mailOptions 
     */
    _sendEmail(transporter, mailOptions) {
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