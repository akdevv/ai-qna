import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
	const { topic, difficulty } = await req.json();

	if (!topic || !difficulty) {
		return NextResponse.json(
			{ error: "Topic and difficulty are required" },
			{ status: 400 }
		);
	}

	const prompt = `<|im_start|>user
	Generate 10 multiple choice questions about ${topic} at a ${difficulty} level. Each question should have exactly 4 options with only one correct answer.

	Return your response in valid JSON format like this:
	[
	{
	    "question": "question text here",
	    "options": ["option1", "option2", "option3", "option4"],
	    "correctOption": 0
	},
	...
	]

	The correctOption should be the index (0-3) of the correct answer in the options array.
	Don't include any explanations or additional text besides the JSON.
	<|im_end|>
	<|im_start|>assistant
	`;

	const response = await groq.chat.completions.create({
		model: "gemma2-9b-it",
		messages: [{ role: "user", content: prompt }],
	});

	const questions = JSON.parse(response?.choices[0].message.content || "[]");
	console.log("questions", questions);

	return NextResponse.json({
		questions,
		message: "Questions generated successfully",
		success: true,
	});
}
