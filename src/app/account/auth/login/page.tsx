import { LoginForm } from "@common/auth/login-form";

type LoginFormProps = Readonly<{
	searchParams: Promise<{ redirectUrl?: string }>;
}>;

export default async function Page({ searchParams }: LoginFormProps) {
	const { redirectUrl } = await searchParams;
	const redirect = redirectUrl && redirectUrl.length > 0 ? redirectUrl : "/account";

	return (
		<div className="flex  w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm redirectUrl={redirect} />
			</div>
		</div>
	);
}
