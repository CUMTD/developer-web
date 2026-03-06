export default function Cursor() {
	return (
		<span
			aria-hidden="true"
			role="presentation"
			className="w-[0.8ch] h-[1.4em] mt-[-0.4em]
			bg-current
			cursor-blink hidden md:block"
		/>
	);
}
