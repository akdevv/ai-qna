import React from "react";

export function Spinner({ className = "" }) {
	return (
		<div
			className={`inline-block animate-spin rounded-full border-4 border-solid border-gray-700 border-t-transparent h-8 w-8 ${className}`}
			role="status"
			aria-label="loading"
		/>
	);
}
