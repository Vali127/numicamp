import nodemailer from "nodemailer"
import { getAdminsMail, getUsername } from "../models/administration/mailModel.js";

export async function SendMailForFeedBackNotification(req) {
    try {
        const adminsMailList = await getAdminsMail()
        const feedback_sender = await getUsername(req.user.id)
        const feedback_message = req.body.content
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASSWORD
            }
        });
        
        const mailOptions = {
            from: process.env.MAIL,
            to: adminsMailList,
            subject: "Nouvel feedback",
            html: htmlContent(feedback_sender, feedback_message)
        }
        
        await transporter.sendMail(mailOptions);
        console.log("Admin has been notified by mail !");
        
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        throw error;
    }
}

export function htmlContent(username, message) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <script src="https://unpkg.com/@phosphor-icons/web"></script>
        </head>
        <body style="margin: 0; padding: 0px; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
            <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden;">
                
                <div style="padding: 24px;">
                    <span style="display: inline-flex; align-items: center; gap: 8px; background: #e5e5e5; opacity: 0.8; color: #333; padding: 6px 14px; border-radius: 20px; font-size: 14px; font-weight: 500;">
                        <i class="ph ph-bug-beetle"></i>
                        Nouveau Feedback
                    </span>
                </div>
                
                <div style="padding: 0 24px 32px 24px;">
                    <div style="margin-bottom: 24px;">
                        <p style="margin: 0 0 4px 0; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
                            <i class="ph ph-user"></i>
                            Utilisateur
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #5773a1; font-weight: 800;">${username}</p>
                    </div>
                    
                    <div>
                        <p style="margin: 0 0 12px 0; font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
                            <i class="ph ph-chat-text"></i>
                            Message
                        </p>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; color: #333; font-size: 12px; line-height: 1.6; font-weight: 200;">
                            ${message}
                        </div>
                    </div>
                </div>
                
                <div style="padding: 20px 24px; background: #fafafa; border-top: 1px solid #eee;">
                    <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
                        Email automatique • Ne pas répondre
                    </p>
                </div>
                
            </div>
        </body>
        </html>
    `
}