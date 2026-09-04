import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      subject,
      message,
    } = body;

    // Validate required fields
    if (!firstName || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "First name, email and message are required.",
        },
        { status: 400 }
      );
    }

    // Environment variables
    const titanEmail = process.env.TITAN_EMAIL;
    const titanPassword = process.env.TITAN_PASSWORD;
    const contactReceiver = process.env.CONTACT_RECEIVER;

    console.log("SMTP CONFIG CHECK:", {
      titanEmail,
      contactReceiver,
      hasPassword: !!titanPassword,
    });

    if (!titanEmail || !titanPassword || !contactReceiver) {
      console.error("Missing email environment variables");

      return NextResponse.json(
        {
          success: false,
          message: "Email configuration is missing.",
        },
        { status: 500 }
      );
    }

    // Titan SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true,
      auth: {
        user: titanEmail,
        pass: titanPassword,
      },
    });

    // Test SMTP connection
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (smtpError) {
      console.error("SMTP_VERIFY_ERROR:", smtpError);
      throw smtpError;
    }

    // Send email
    await transporter.sendMail({
      from: titanEmail,
      to: contactReceiver,
      replyTo: email,
      subject: subject
        ? `FitIQ Contact: ${subject}`
        : `New Contact Message from ${firstName}`,
      text: `
New message received from FitIQ website.

Name: ${firstName} ${lastName || ""}
Email: ${email}
Subject: ${subject || "Not specified"}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New FitIQ Contact Message</h2>

          <p>
            <strong>Name:</strong>
            ${firstName} ${lastName || ""}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Subject:</strong>
            ${subject || "Not specified"}
          </p>

          <hr />

          <p><strong>Message:</strong></p>

          <p>
            ${message.replace(/\n/g, "<br />")}
          </p>
        </div>
      `,
    });

    console.log("CONTACT_EMAIL_SENT_SUCCESSFULLY");

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("CONTACT_FORM_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}