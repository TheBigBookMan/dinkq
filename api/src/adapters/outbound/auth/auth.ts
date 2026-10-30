import { betterAuth } from 'better-auth'
import { emailOTP } from 'better-auth/plugins'
import { pool } from '../postgres/pool'

export const auth = betterAuth({
  database: pool,
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        console.log(`[auth] sign-in code for ${email}: ${otp}`) // DEV ONLY
      },
    }),
  ],
})