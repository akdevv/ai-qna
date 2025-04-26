import { QuestionType } from "@/types/questions";

const genQuestions = async (
	topic: string,
	difficulty: string
): Promise<QuestionType[]> => {
	const response = await fetch("/api/gen-questions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ topic, difficulty }),
	});

	const data = await response.json();
	return data.questions;
};

export default genQuestions;
