import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { RSVPValidator } from "@/app/lib/validators/rsvp";
import { ZodError } from "zod";
import { sanitizeInput } from "@/app/lib/sanitation/sanitize";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ✅ 1. Validate first
    const validatedData = RSVPValidator.parse(body);

    // ✅ 2. Sanitize AFTER validation
    const sanitizedData = {
      fullName: sanitizeInput(validatedData.fullName),
      email: validatedData.email
        ? sanitizeInput(validatedData.email)
        : undefined,
      phone: sanitizeInput(validatedData.phone),
      address: sanitizeInput(validatedData.address),
      attending: sanitizeInput(validatedData.attending),
      guests: validatedData.guests, // numbers don't need sanitization
      message: sanitizeInput(validatedData.message),
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${sanitizedData.fullName}" <${sanitizedData.email}>`,
      to: process.env.TO_EMAIL,
      subject: "Email From Marielle's Birthday Website",
      html: `
        <h3>New message from your website</h3>
        <p><strong>Name:</strong> ${sanitizedData.fullName}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
       <p><strong>Address:</strong> ${sanitizedData.address}</p>
        <p><strong>Attending:</strong> ${sanitizedData.attending}</p>
        <p><strong>How many guests:</strong> ${validatedData.guests}</p>
        <p><strong>Message:</strong><br/>${sanitizedData.message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: err.issues,
        },
        { status: 400 },
      );
    }

    console.error("Failed to enqueue email task:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
