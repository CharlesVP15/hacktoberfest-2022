export interface DefaultOptions {
	uppercase: boolean
	lowercase: boolean
	numbers: boolean
	symbols: boolean
}

interface NumberOfChars {
	uppercase: number
	numbers: number
	symbols: number
}
export interface AdvancedOptions {
	using: 'minimum'
	numberOfChars: NumberOfChars
	include: string[] | []
}

export function generatePassword(length: number, options: DefaultOptions) {
	const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
	const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const NUMBERS = '0123456789'
	const SYMBOLS = '!@#$%^&*'

	let CHARS = ''

	if (options.lowercase) CHARS += LOWERCASE
	if (options.uppercase) CHARS += UPPERCASE
	if (options.numbers) CHARS += NUMBERS
	if (options.symbols) CHARS += SYMBOLS

	let password = ''

	for (let i = 0; i < length; i++) {
		password += CHARS.charAt(Math.floor(Math.random() * CHARS.length))
	}

	return password
}
