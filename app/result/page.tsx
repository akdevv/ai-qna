"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Result() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const score = searchParams.get("score");

	return (
		<div className="flex flex-col items-center justify-center h-screen max-w-3xl mx-auto p-6">
			<FaCheckCircle className="text-green-600 text-6xl mb-4" />
			<h1 className="text-4xl font-bold font-bricolage mb-1 text-center">
				Congratulations on completing the test!
			</h1>
			<p className="text-2xl font-medium mb-4">
				You got <span className="font-bold">{score}</span> correct out
				of 10
			</p>
			<Button
				onClick={() => router.push("/")}
				className="mt-4 cursor-pointer"
			>
				Take Another Quiz
			</Button>
		</div>
	);
}
