interface QuestionType {
	question: string;
	options: string[];
	correctOption: number;
}

type UserAnswer = {
	questionIndex: number;
	answerOption: number;
};

export type { QuestionType, UserAnswer };
