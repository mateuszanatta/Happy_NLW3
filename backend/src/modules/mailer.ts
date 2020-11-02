import {createTransport} from 'nodemailer';
import {resolve} from 'path';
const hbs = require('nodemailer-express-handlebars');

export default{
    createEmail(){
        const transport = createTransport({
            host: process.env.SMTP,
            port: process.env.MAIL_PORT,
            auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
            }
        });

        return transport.use('compile', hbs({
            viewEngine: 'handlebars',
            viewPaths: resolve('./src/resource/mail/'),
            extName: '.html'
        }));
    }
}