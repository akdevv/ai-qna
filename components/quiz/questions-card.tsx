import { Label } from "@/components/ui/label";
import { QuestionType } from "@/types/questions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/shared/spinner";

export default function QuestionsCard({
	questions,
}: {
	questions: QuestionType[];
}) {
	if (!questions || questions.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<Spinner />
				<p className="mt-2 text-center">Generating questions...</p>
			</div>
		);
	}

	return (
		<div>
			{questions.map((question, idx) => (
				<Card key={idx} className="mb-3">
					<CardHeader>
						<CardTitle>
							<span>Q{idx + 1}.</span> {question.question}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup defaultValue="null">
							{question.options.map((option, idx) => (
								<div
									key={idx}
									className="flex items-center space-x-2"
								>
									<RadioGroupItem
										value={option}
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
	);
}
