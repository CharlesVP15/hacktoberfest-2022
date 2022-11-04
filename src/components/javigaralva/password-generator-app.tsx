import './password-generator-app.css'

import { useState, useEffect, type ChangeEventHandler } from 'react'
import { sample } from './utils/sample'
import { ColorizedPassword } from './components/colorized-password'
import {
	UPPER_CASE_LETTERS_LIST,
	LOWER_CASE_LETTERS_LIST,
	NUMBERS_LIST,
	SYMBOLS_LIST
} from './constants/constants'

interface GeneratePasswordOptions {
	length: number
	hasUpperCaseLetters: boolean
	hasLowerCaseLetters: boolean
	hasNumbers: boolean
	hasSymbols: boolean
}
const MIN_PASSWORD_LENGTH = 1
const MAX_PASSWORD_LENGTH = 30
const DEFAULT_PASSWORD_OPTIONS: GeneratePasswordOptions = {
	length: 10,
	hasUpperCaseLetters: true,
	hasLowerCaseLetters: true,
	hasNumbers: true,
	hasSymbols: true
}

function generatePassword(options: GeneratePasswordOptions) {
	return Array.from<undefined>({ length: options.length }).reduce(
		(acc: string) => acc + getRandomCharacter(options),
		''
	)
}

function getRandomCharacter(options: GeneratePasswordOptions) {
	return getRandomCharacterPickerFunction(options)?.() ?? ''
}

function getRandomCharacterPickerFunction(options: GeneratePasswordOptions) {
	const choosableStrategy = getChoosableStrategies(options)
	return sample(choosableStrategy)
}

function getChoosableStrategies(options: GeneratePasswordOptions) {
	return [
		options.hasUpperCaseLetters ? sampleUpperCaseLetter : undefined,
		options.hasLowerCaseLetters ? sampleLowerCaseLetter : undefined,
		options.hasNumbers ? sampleNumber : undefined,
		options.hasSymbols ? sampleSymbol : undefined
	].filter(Boolean)
}

const sampleUpperCaseLetter = makeSampleCharacterFunction(UPPER_CASE_LETTERS_LIST)
const sampleLowerCaseLetter = makeSampleCharacterFunction(LOWER_CASE_LETTERS_LIST)
const sampleNumber = makeSampleCharacterFunction(NUMBERS_LIST)
const sampleSymbol = makeSampleCharacterFunction(SYMBOLS_LIST)

function makeSampleCharacterFunction(characters: string[]) {
	return () => sample(characters)
}

export default function Main() {
	const [passwordLength, setPasswordLength] = useState(DEFAULT_PASSWORD_OPTIONS.length)
	const [password, setPassword] = useState('')

	const handleGeneratePassword = () => {
		setPassword(
			generatePassword({
				...DEFAULT_PASSWORD_OPTIONS,
				length: passwordLength
			})
		)
	}

	const handleOnChangeSlider: ChangeEventHandler<HTMLInputElement> = (e) => {
		setPasswordLength(Number(e.target.value))
	}

	useEffect(() => {
		setPassword(
			generatePassword({
				...DEFAULT_PASSWORD_OPTIONS,
				length: passwordLength
			})
		)
	}, [passwordLength])

	return (
		<div className='javigaralva-no-tap-highlight w-screen h-screen bg-stone-800 select-none'>
			<div className='flex place-content-center h-screen'>
				<div className='grid min-w-100 place-items-center justify-evenly'>
					<div className='min-h-min mx-10 text-center mt-32'>
						<ColorizedPassword password={password} />
					</div>
					<div className='flex justify-center items-end min-w-full min-h-full'>
						<div className='mb-20 sm:mb-36'>
							<div className='flex flex-col place-items-center gap-10 duration-500 backdrop-blur-none backdrop-brightness-95 hover:backdrop-blur-sm hover:backdrop-brightness-105 rounded-2xl border-gray-50/20 outline-offset-0 outline-4 hover:outline-offset-4 outline-slate-300/0 hover:outline-slate-300/30 outline-dotted p-6 py-6 px-20 border-2 border-dotted'>
								<button
									className='bg-yellow-600 rounded min-w-fit font-black uppercase py-2 w-60 text-lg text-black/75 tracking-wide duration-300 hover:shadow-yellow-400/25 scale-100 hover:bg-yellow-500 active:scale-95 shadow-2xl shadow-slate-900'
									onClick={handleGeneratePassword}
								>
									Generate
								</button>
								<input
									className='w-60 h-1 outline-2 rounded-lg outline-dotted outline-offset-8 outline-slate-50/25 appearance-none cursor-pointer bg-yellow-600/50 accent-yellow-600'
									type='range'
									min={MIN_PASSWORD_LENGTH}
									max={MAX_PASSWORD_LENGTH}
									value={passwordLength}
									onChange={handleOnChangeSlider}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
