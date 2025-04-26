import { Label } from "@/components/ui/label";
import { QuestionType } from "@/types/questions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";

export default function QuestionsCard({
	questions,
}: {
	questions: QuestionType[];
}) {
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
