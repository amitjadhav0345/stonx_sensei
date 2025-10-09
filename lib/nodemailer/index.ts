import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE, MINIMAL_WELCOME_EMAIL_TEMPLATE , NEWS_SUMMARY_EMAIL_TEMPLATE } from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
});

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const appName = process.env.APP_NAME || 'Stonx_Sensei';
    const logoUrl = process.env.EMAIL_LOGO_URL || 'https://ik.imagekit.io/a6fkjou7d/logo.png?updatedAt=1756378431634';
    const templateName = (process.env.EMAIL_TEMPLATE || 'classic').toLowerCase();
    const baseTemplate = templateName === 'minimal' ? MINIMAL_WELCOME_EMAIL_TEMPLATE : WELCOME_EMAIL_TEMPLATE;

    const htmlTemplate = baseTemplate
        .replace(/\{\{name\}\}/g, name)
        .replace(/\{\{intro\}\}/g, intro)
        .replace(/\{\{appName\}\}/g, appName)
        .replace(/\{\{logoUrl\}\}/g, logoUrl);

    // Branding overrides per issue: replace every 'Signalist' with 'Stonx Sensei' and set address to 'Pune , Maharashtra'
    const finalHtml = htmlTemplate
        .replace(/Signalist/g, 'Stonx Sensei')
        .replace(/Signalist HQ[^<]*<br>/g, 'Pune , Maharashtra<br>');

    const fromAddress = process.env.EMAIL_FROM || process.env.NODEMAILER_EMAIL!;
    const subject = process.env.EMAIL_SUBJECT || `Welcome to ${appName} - your stock market toolkit is ready!`;

    const mailOptions = {
        from: `"${appName}" <${fromAddress}>`,
        to: email,
        subject,
        text: 'Thanks for joining Stonx Sensei',
        html: finalHtml,
    };

    await transporter.sendMail(mailOptions);
};

export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: `"StonxSensei News" <amitjad2@student.sspu.ac.in>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from Signalist`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};