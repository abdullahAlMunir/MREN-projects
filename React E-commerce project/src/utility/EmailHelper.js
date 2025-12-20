import nodemailer from "nodemailer";

export async function EmailSend(EmailTo, EmailSubject, EmailText) {
    // Create transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // Google's SMTP host
        port: 465,             // Port for SSL (recommended for Gmail)
        secure: true,          // true for 465, false for other ports (TLS)
        auth: {
            user: "ku2921067",         // Your Gmail address (from .env)
            pass: "gjsg geom avax zelk"  // Your generated App Password (from .env)
        },
        // It's generally not recommended to set rejectUnauthorized to false unless absolutely necessary for debugging.
        // For Gmail, with secure: true and port 465, it should work without this.
        // tls: {
        //     rejectUnauthorized: false
        // }
    });


    let mailOptions = {
        from: `MERN Ecommerce Project <${process.env.GOOGLE_EMAIL_USER}>`, // Sender address, use your Gmail
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };


    try {
        let info = await transporter.sendMail(mailOptions);
        // console.log("Message sent: %s", info.message); // Log message ID for tracking
        return { status: "Success", data: info };
    } catch (err) {
        console.error("Error sending mail:", err);
        // Provide more specific error messages if possible
        if (err.code === 'EENVELOPE') {
            return { status: "Fail", data: "Email address format error or recipient issues." };
        } else if (err.code === 'EAUTH') {
            return { status: "Fail", data: "Authentication failed. Check your Gmail address and App Password." };
        }
        return { status: "Fail", data: err.message };
    }
}