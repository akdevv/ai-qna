import { QuestionType, UserAnswer } from "@/types/types";

export default function calculateScore(
	questions: QuestionType[],
	userAnswers: UserAnswer[]
): number {
	let score = 0;

	userAnswers.forEach((userAnswer) => {
		if (
			questions[userAnswer.questionIndex].correctOption ===
			userAnswer.answerOption
		) {
			score++;
		}
	});

	return score;
}
