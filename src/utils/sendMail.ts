import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import metaData from '../config/metadata';
import logger from './logger';

export default async function sendMail(user) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: metaData.email,
            pass: metaData.password
        }
    });

    const mailOptions = {
        from: metaData.email,
        to: user.company_email,
        subject: `Welcome to ${metaData.companyName} – Your Login Credentials for ${metaData.websiteName}`,
        html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 5px;">
            <div style="margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #fff;">
                <p style="text-align: center; font-size: 20px; font-weight: bold; color: #0056b3; margin-bottom: 20px;">
                    Welcome to ${metaData.companyName}!
                </p>

                <p>Dear <strong>${user.first_name} ${user.last_name}</strong>,</p>
                <p>We are excited to have you on board.</p>
                <p>You have been successfully onboarded into our system. Below are your login details for the <strong>${metaData.companyName}</strong>:</p>

                <div style="background-color: #f1f1f1; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 20px;">
                    <p><strong>Email:</strong> ${user.company_email}</p>
                    <p>
                        <strong>Temporary Password:</strong>
                        <span style="font-weight: bold; background-color: #e8e8e8; padding: 5px; border-radius: 4px; display: inline-block;">${user.password}</span>
                    </p>
                    <p>To log in, please visit:</p>
                    <a href="${metaData.websiteUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 10px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                        Login to TTS Technics
                    </a>
                </div>

                <p>For security reasons, we recommend changing your password upon first login.</p>
                <p>If you have any questions or need assistance, feel free to reach out to the IT support team at
                    <a href="mailto:${metaData.supportEmail}" style="color: #007bff;">${metaData.supportEmail}</a>.
                </p>

                <p style="margin-top: 20px; font-size: 14px; color: #555;">Looking forward to working with you!</p>
                <p style="margin-top: 10px; font-size: 14px; color: #555;">Best regards,<br>${metaData.companyName}</p>
            </div>
        </body>
        </html>
        `,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(`Error sending email: ${error}`);
                reject(false);
            } else {
                logger.info(`Email sent: ${info.response}`);
                resolve(true);
            }
        });
    });
}
