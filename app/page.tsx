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

export default function Home() {
	const router = useRouter();
	const [topic, setTopic] = useState("history");
	const [difficulty, setDifficulty] = useState("easy");

	const handleStartQuiz = () => {
		router.push(`/quiz?topic=${topic}&difficulty=${difficulty}`);
	};

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
						<SelectTrigger className="w-[180px]">
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
						<SelectTrigger className="w-[180px]">
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
