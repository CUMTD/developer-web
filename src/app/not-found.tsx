export default function NotFound() {
	return (
		<div className="w-full h-full flex items-center justify-center pb-20">
			<div className="min-w-fit text-center leading-10 ">
				<h2 className="font-mono font-black  text-6xl">404: Not Found</h2>
				<p className="text-muted-foreground">The page you're looking for does not exist. It may have been moved.</p>
			</div>
		</div>
	);
}
