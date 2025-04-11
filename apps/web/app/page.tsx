import CreateRoom from "@/components/create-room";

export default function Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center space-y-8 max-w-md mx-auto text-center">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Welcome to ISS
					</h1>
					<p className="text-gray-500 dark:text-gray-400 md:text-xl">
						Connect with others through seamless video conferencing
					</p>
				</div>

				<CreateRoom />
			</div>
		</main>
	);
}
