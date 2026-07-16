"use client";

import { useState } from "react";

const questions = [
  {
    q: "What is the main objective of this experiment?",
    options: ["Observation", "Calibration", "Reaction Analysis", "Validation"],
    answer: "Reaction Analysis",
  },
  {
    q: "Which safety rule is essential first?",
    options: ["Run quickly", "Wear protection", "Skip setup", "Ignore instructions"],
    answer: "Wear protection",
  },
  {
    q: "Which step should come before recording results?",
    options: ["Reset setup", "Run procedure", "Close app", "Skip safety"],
    answer: "Run procedure",
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce(
    (acc, q, i) => (answers[i] === q.answer ? acc + 1 : acc),
    0
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">Experiment Quiz</h1>

        <div className="mt-6 space-y-5">
          {questions.map((item, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="font-medium">
                {i + 1}. {item.q}
              </p>
              <div className="mt-3 space-y-2">
                {item.options.map((op) => (
                  <label key={op} className="block">
                    <input
                      type="radio"
                      name={`q-${i}`}
                      className="mr-2"
                      onChange={() => {
                        const next = [...answers];
                        next[i] = op;
                        setAnswers(next);
                      }}
                    />
                    {op}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            className="mt-6 rounded bg-blue-600 px-5 py-3 font-medium"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-lg font-medium">
              Score: {score} / {questions.length}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}