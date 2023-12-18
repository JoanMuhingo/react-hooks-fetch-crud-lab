import React, {useState} from "react";

function QuestionItem({ question ,onDelete ,onUpdate}) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedCorrectIndex, setSelectedCorrectIndex] =useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  const handleDelete= () => {
    onDelete(id);
  }
 const handleUpdate =(e) => {
  const newCorrectIndex = parseInt(e.target.value, 10);

  setSelectedCorrectIndex(newCorrectIndex);

  fetch(`http://localhost:4000/questions/${id}`,{
    method:'PATCH',
    headers:{
      'Content-Type': "application/json",
    },
    body:JSON.stringify({
      correctIndex: newCorrectIndex,
    }),
  })
  .then((r) => r.json())
  .then(updateQuestion =>{
    onUpdate(updateQuestion.id, newCorrectIndex);
  })
 }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
