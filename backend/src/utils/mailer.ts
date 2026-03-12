import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email: string, otp: string) => {
  await resend.emails.send({
    from: "ClipMantra Support <onboarding@resend.dev>",
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h2>Password Reset Request</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
    `,
  });
};
