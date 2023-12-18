import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);

  const addQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleDelete = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== questionId)
    );

    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then((data) => {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== questionId)
        );
      });
  };

  const handleUpdate = (questionId, newCorrectIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            correctIndex: newCorrectIndex,
          };
        }
        return question;
      })
    );
  };

  return (
    <div>
      <section>
        <h1>Quiz Questions</h1>
        <ul>
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      </section>
      <QuestionForm addQuestion={addQuestion} />
    </div>
  );
}

export default QuestionList;
