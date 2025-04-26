"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Question {
	question: string;
	options: string[];
	correctOption: number;
}

export default function Quiz() {
	const searchParam = useSearchParams();
	const topic = searchParam.get("topic");
	const difficulty = searchParam.get("difficulty");

	const [questions, setQuestions] = useState<Question[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchQuestions = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("/api/generate-questions", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ topic, difficulty }),
				});
				const data = await response.json();
				console.log("data", data.questions);
				setQuestions(() => data.questions);
			} catch (error) {
				setError("Failed to fetch questions");
			} finally {
				setIsLoading(false);
			}
		};

		fetchQuestions();
	}, [topic, difficulty]);

	return (
		<div>
			<h1>Quiz</h1>
			{isLoading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{questions.length > 0 && (
				<div>
					{questions.map((question, idx) => (
						<div key={idx}>
							<p>{question.question}</p>
							{question.options.map((option, idx) => (
								<div key={idx}>{option}</div>
							))}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
