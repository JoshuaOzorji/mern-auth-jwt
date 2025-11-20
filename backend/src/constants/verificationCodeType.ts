// const enum VerificationCodeType {
// 	EmailVerification = "email_verification",
// 	PasswordReset = "password_reset",
// }

// export default VerificationCodeType;

const VerificationCodeType = {
	EmailVerification: "email_verification",
	PasswordReset: "password_reset",
} as const;

type VerificationCodeType = typeof VerificationCodeType[keyof typeof VerificationCodeType];

export default VerificationCodeType;