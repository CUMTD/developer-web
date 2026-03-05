export default function Cursor() {
	return (
		<span
			aria-hidden="true"
			role="presentation"
			className="w-[0.6ch] h-[1em] align-[-0.15em]
			bg-current
			animate-[blink_1.5s_steps(2,start)_infinite] hidden md:block"
		/>
	);
}
