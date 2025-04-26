import { PiWarningCircle } from "react-icons/pi";

export function Error({ message }: { message: string }) {
	return (
		<div className="flex flex-col items-center gap-2">
			<div className="bg-red-400 rounded-full p-2 flex items-center justify-center">
				<PiWarningCircle className="text-2xl text-white" />
			</div>
			<p className="text-center">{message}</p>
		</div>
	);
}
