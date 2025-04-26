import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_API_TOKEN);

export async function POST(req: Request) {
	console.log("Generating questions...");
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

	const response = await hf.chatCompletion({
		provider: "hf-inference",
		model: "mistralai/Mistral-7B-Instruct-v0.3",
		messages: [{ role: "user", content: prompt }],
		parameters: {
			max_new_tokens: 2048,
			temperature: 0.7,
			return_full_text: false,
		},
	});

	const questions =
		JSON.parse(response.choices[0].message.content || "[]") || [];
	return NextResponse.json({
		questions,
		message: "Questions generated successfully",
		success: true,
	});
}
