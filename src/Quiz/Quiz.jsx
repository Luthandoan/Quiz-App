/* eslint-disable no-unused-vars */
import "./Quiz.css";
import React, { useState, useRef, useEffect } from "react";
import * as data from "../assets/data";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data.data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const optionArray = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    setQuestion(data.data[index]);
  }, [index]);

  const checkAnswer = (e, ans) => {
    if (!lock) {
      if (ans === question.ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        optionArray[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const resetOptions = () => {
    optionArray.forEach((option) => {
      option.current.classList.remove("correct");
      option.current.classList.remove("wrong");
    });
  };

  const nextQuestion = () => {
    if (lock) {
      resetOptions();
      if (index < data.data.length - 1) {
        setIndex((prev) => prev + 1);
        setLock(false);
      } else {
        alert(`Quiz completed! Your score is ${score}/${data.data.length}`);
        setIndex(0);
        setScore(0);
        setLock(false);
      }
    }
  };

  return (
    <div className="container">
      <h1>Quiz</h1>
      <hr />
      <h2>
        {index + 1}. {question.question}
      </h2>
      <ul>
        <li ref={Option1} onClick={(e) => checkAnswer(e, 1)}>
          {question.option1}
        </li>
        <li ref={Option2} onClick={(e) => checkAnswer(e, 2)}>
          {question.option2}
        </li>
        <li ref={Option3} onClick={(e) => checkAnswer(e, 3)}>
          {question.option3}
        </li>
        <li ref={Option4} onClick={(e) => checkAnswer(e, 4)}>
          {question.option4}
        </li>
      </ul>
      <button onClick={nextQuestion}>Next</button>
      <div className="index">
        {index + 1} of {data.data.length} questions
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default Quiz;
