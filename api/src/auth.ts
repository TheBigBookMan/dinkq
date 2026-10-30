import { betterAuth } from 'better-auth'
import { emailOTP } from 'better-auth/plugins'
import { Pool } from 'pg'

export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        // DEV ONLY: swap for a real email send (Resend, SES) before real users
        console.log(`[auth] sign-in code for ${email}: ${otp}`)
      },
    }),
  ],
})