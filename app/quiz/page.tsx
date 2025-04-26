"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionType, UserAnswer } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { MdArrowRightAlt } from "react-icons/md";
import genQuestions from "@/lib/gen-questions";
import { Spinner } from "@/components/shared/spinner";
import { Error } from "@/components/shared/error";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import calculateScore from "@/lib/calculateScore";

export default function Quiz() {
	const router = useRouter();
	const searchParam = useSearchParams();
	const topic = searchParam.get("topic");
	const difficulty = searchParam.get("difficulty");

	const [questions, setQuestions] = useState<QuestionType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

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
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchQuestions();
	}, [topic, difficulty]);

	const handleCancel = () => {
		localStorage.removeItem("questions");
		localStorage.removeItem("topic");
		localStorage.removeItem("difficulty");
		router.push("/");
	};

	const handleSubmit = () => {
		if (userAnswers.length !== questions.length) {
			toast.error("Please answer all questions");
		}

		if (userAnswers.length === questions.length) {
			// clear local storage
			localStorage.removeItem("questions");
			localStorage.removeItem("topic");
			localStorage.removeItem("difficulty");

			// calculate score
			const score = calculateScore(questions, userAnswers);
			router.push(`/result?score=${score}`);
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
		<div className="p-3 max-w-4xl mx-auto">
			<div className="flex flex-col items-center justify-center">
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

			{!questions ||
				(questions.length === 0 && (
					<div className="flex flex-col items-center justify-center h-screen">
						<Spinner />
						<p className="mt-2 text-center">
							Generating questions...
						</p>
					</div>
				))}

			<div className="mt-5">
				{questions.map((question, idx) => (
					<Card key={idx} className="mb-3">
						<CardHeader>
							<CardTitle>
								<span>Q{idx + 1}.</span> {question.question}{" "}
								<span className="text-red-600">*</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<RadioGroup
								defaultValue="null"
								onValueChange={(value) => {
									if (
										!userAnswers.some(
											(answer) =>
												answer.questionIndex === idx
										)
									) {
										setUserAnswers([
											...userAnswers,
											{
												questionIndex: idx,
												answerOption: parseInt(value),
											},
										]);
									}
								}}
							>
								{question.options.map((option, idx) => (
									<div
										key={idx}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={idx.toString()}
											id={option}
										/>
										<Label htmlFor={option}>{option}</Label>
									</div>
								))}
							</RadioGroup>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="flex gap-3 justify-end mb-10 mt-5">
				<Button
					variant="outline"
					className="cursor-pointer"
					onClick={handleCancel}
				>
					Cancel
				</Button>
				<Button className="cursor-pointer" onClick={handleSubmit}>
					<span>Submit</span>
					<MdArrowRightAlt />
				</Button>
			</div>
		</div>
	);
}

