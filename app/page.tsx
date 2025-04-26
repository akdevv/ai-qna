"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MdArrowRightAlt } from "react-icons/md";
import genQuestions from "@/lib/gen-questions";
import { Spinner } from "@/components/shared/spinner";
import { Error } from "@/components/shared/error";

export default function Home() {
	const router = useRouter();
	const [topic, setTopic] = useState("history");
	const [difficulty, setDifficulty] = useState("easy");

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleStartQuiz = async () => {
		setIsLoading(true);
		setError(null);

		try {
			// if stored, then go to quiz page else generate questions
			const storedTopic = localStorage.getItem("topic");
			const storedDifficulty = localStorage.getItem("difficulty");
			const storedQuestions = localStorage.getItem("questions");
			if (
				storedTopic === topic &&
				storedDifficulty === difficulty &&
				storedQuestions
			) {
				router.push(`/quiz?topic=${topic}&difficulty=${difficulty}`);
			} else {
				const questions = await genQuestions(topic, difficulty);
				localStorage.setItem("topic", topic);
				localStorage.setItem("difficulty", difficulty);
				localStorage.setItem("questions", JSON.stringify(questions));
				router.push(`/quiz?topic=${topic}&difficulty=${difficulty}`);
			}
		} catch (error) {
			setError("Failed to fetch questions");
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<Spinner />
				<p className="mt-2 text-center">Generating questions...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<Error message={error || "Failed to fetch questions!"} />
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="mb-10">
				<h1 className="text-7xl font-bold font-bricolage text-center mb-2">
					Welcome to AI QnA
				</h1>
				<p className="text-xl text-center">
					Test your knowledge with AI-generated quizzes!
				</p>
			</div>

			{/* Topic & Difficulty Selector */}
			<div className="flex gap-4">
				<div>
					<Select
						value={topic}
						onValueChange={(topic) => setTopic(topic)}
					>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Topic" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="history">History</SelectItem>
							<SelectItem value="geography">Geography</SelectItem>
							<SelectItem value="science">Science</SelectItem>
							<SelectItem value="coding">Coding</SelectItem>
							<SelectItem value="marvel">Marvel</SelectItem>
							<SelectItem value="harry-potter">
								Harry Potter
							</SelectItem>
							<SelectItem value="sports">Sports</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div>
					<Select
						value={difficulty}
						onValueChange={(difficulty) =>
							setDifficulty(difficulty)
						}
					>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Difficulty" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="easy">Easy</SelectItem>
							<SelectItem value="medium">Medium</SelectItem>
							<SelectItem value="hard">Hard</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div>
					<Button
						className="cursor-pointer"
						onClick={handleStartQuiz}
					>
						<span>Continue</span>
						<MdArrowRightAlt />
					</Button>
				</div>
			</div>
		</div>
	);
}
