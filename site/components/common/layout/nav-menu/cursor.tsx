export default function Cursor() {
	return (
		<span
			className="w-[0.6ch] h-[1em] align-[-0.15em]
			bg-gray-900 dark:bg-[#63be45]
			animate-[blink_1.5s_steps(2,start)_infinite] hidden md:block"
		/>
	);
}
