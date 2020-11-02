import {createTransport} from 'nodemailer';
import {resolve} from 'path';
const hbs = require('nodemailer-express-handlebars');

export default{
    createEmail(){
        const transport = createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "17cc16a0d3f0b7",
            pass: "5f3d2dd0f2ed79"
            }
        });

        return transport.use('compile', hbs({
            viewEngine: 'handlebars',
            viewPaths: resolve('./src/resource/mail/'),
            extName: '.html'
        }));
    }
}