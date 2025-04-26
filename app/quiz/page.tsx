"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionType } from "@/types/questions";
import { useSearchParams } from "next/navigation";
import { MdArrowRightAlt } from "react-icons/md";
import QuestionsCard from "@/components/quiz/questions-card";
import genQuestions from "@/lib/gen-questions";
import { Spinner } from "@/components/shared/spinner";
import { Error } from "@/components/shared/error";

export default function Quiz() {
	const searchParam = useSearchParams();
	const topic = searchParam.get("topic");
	const difficulty = searchParam.get("difficulty");

	const [questions, setQuestions] = useState<QuestionType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		const fetchQuestions = async () => {
			try {
				if (!topic || !difficulty) {
					setError("Topic and difficulty are required");
					return;
				}

				// check if questions are in local storage
				const storedQuestions = localStorage.getItem("questions");
				if (storedQuestions) {
					setQuestions(JSON.parse(storedQuestions));
				} else {
					const questions = await genQuestions(topic, difficulty);
					localStorage.setItem(
						"questions",
						JSON.stringify(questions)
					);
					setQuestions(questions);
				}
			} catch (error) {
				setError("Failed to fetch questions");
			} finally {
				setIsLoading(false);
			}
		};
		fetchQuestions();
	}, [topic, difficulty]);

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
		<div className="p-3 max-w-4xl mx-auto">
			<div className="flex flex-col items-center justify-center mb-5">
				<h1 className="text-4xl font-bold font-bricolage">
					Your quiz on{" "}
					{topic ? (
						<span>
							{topic.charAt(0).toUpperCase() + topic.slice(1)}
						</span>
					) : (
						<span>Topic</span>
					)}
				</h1>
				<p className="text-sm text-gray-500">
					You will be given {questions?.length} questions to answer.
				</p>
			</div>

			<QuestionsCard questions={questions} />

			<div className="flex gap-3 justify-end mb-10 mt-5">
				<Button variant="outline" className="cursor-pointer">
					Cancel
				</Button>
				<Button className="cursor-pointer">
					<span>Submit</span>
					<MdArrowRightAlt />
				</Button>
			</div>
		</div>
	);
}

