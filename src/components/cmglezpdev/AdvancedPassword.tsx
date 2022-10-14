import { ChangeEvent, useState } from 'react'
import { ButtonComponent, InputComponent, RangeInputComponent } from './basic-components'
import { usePassword } from '@hooks/cmglezpdev'

export const AdvancedPassword = () => {
	const [lengthPassword, setLenghtPassword] = useState(10)
	const [phrase, setPhrase] = useState('')
	const { password, generatePasswordByPhrase } = usePassword()

	const handleLengthControl = (e:ChangeEvent<HTMLInputElement>) => {
		setLenghtPassword(parseInt(e.target.value))
	}

	const handleGenPassword = () => {
		generatePasswordByPhrase(phrase, lengthPassword)
	}

	return (
		<div className='flex flex-col items-center'>
			<InputComponent
				value={password}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onChange={() => {}}
			/>

			<InputComponent
				value={phrase}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onChange={(e) => { setPhrase(e.target.value) }}
			/>

			<RangeInputComponent
				value={lengthPassword}
				onChange={handleLengthControl}
			/>

			<ButtonComponent
				textButton='Generate Password'
				onClick={handleGenPassword}
			/>
		</div>
	)
}
