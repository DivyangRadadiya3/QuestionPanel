import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import FullTable from "../../../../Ui/Table";
import FullFeaturedCrudGrid from "../../../../Ui/FullFeaturedCrudGrid";

const EnglishQuestionPairForm = ({
  editQuestion,
  handleChange,
  handleCheck,
  options,
  handleStatementQuestionChange,
  handleAddPair,
}) => {
  return (
    <div className="space-y-4 duration-300 ease-in-out">
      <p className="text-2xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
        english question section
      </p>
      {/* Question Input */}
      <div className="space-y-2">
        <label className="text-lg font-medium text-gray-900 dark:text-white">
          Write Question
        </label>
        <input
          className="border-2 border-gray-300 hover:border-gray-400 rounded-md w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-purple-600 focus:border-purple-600"
          id="question"
          type="text"
          placeholder="Add question"
          name="englishQuestion.question"
          value={editQuestion.englishQuestion.question}
          onChange={handleChange}
        />
      </div>
      {/* Pair Questions */}
      <div className="space-y-2">
        <FullFeaturedCrudGrid
          pairQuestion={editQuestion.englishQuestion.pairQuestion}
          language={"englishQuestion"}
          onHandleChange={handleAddPair}
          questionType={"pair"}
        />
      </div>

      <div className="space-y-2">
        <label className="text-lg font-medium text-gray-900 dark:text-white">
          Enter Statement
        </label>
        <input
          className="border-2 border-gray-300 hover:border-gray-400 rounded-md w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-purple-600 focus:border-purple-600"
          id="statement"
          type="text"
          placeholder="Enter statement"
          value={editQuestion.englishQuestion.lastQuestion || ""}
          onChange={handleChange}
          name="englishQuestion.lastQuestion"
        />
      </div>
      {/* Options A, B, C, D */}
      <div className="space-y-4 p-4">
        <p className="text-xl font-medium text-gray-900 dark:text-white">
          Options
        </p>
        <div className="flex flex-row items-center space-x-3">
          {["A", "B", "C", "D"].map((option) => (
            <div key={option} className="w-1/4">
              <label
                htmlFor={`englishQuestion.options.${option}`}
                className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
              >
                Option - {option}
                <MdStar className="text-orange-400 h-3 w-3" />
              </label>
              <textarea
                rows="3"
                name={`englishQuestion.options.${option}`}
                value={editQuestion.englishQuestion.options[option] || ""} 
                onChange={handleChange} 
                className="block w-full min-h-22 max-h-22 p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                placeholder={`Option ${option}`}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Answer Section */}
      <div className="space-y-4 p-4">
        <p className="text-xl font-medium text-gray-900 dark:text-white">
          Answer
        </p>
        <div className="md:flex sm:flex text-sm font-medium text-gray-900 space-x-6 text-start dark:text-white">
          <ul className="flex items-center justify-start gap-x-6 w-full text-sm font-medium text-gray-900">
            {Object.keys(options.AnswerOption).map((key) => (
              <li key={key}>
                <div className="flex items-center ps-3">
                  <input
                    id={`radio${key}`}
                    type="radio"
                    name="englishQuestion.answer"
                    value={key}
                    checked={editQuestion.englishQuestion.answer === key}
                    onChange={(e) => handleCheck( e)} 
                    className="w-4 h-4 text-blue-600 border-gray-300 checked:bg-blue-600 checked:outline-none"
                  />
                  <label
                    htmlFor={`radio${key}`}
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Option {key}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Solution Section */}
      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          Solution
        </p>
        <textarea
          name="englishQuestion.solution"
          className="border-2 pl-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full min-h-[100px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
          placeholder="Enter solution"
          value={editQuestion.englishQuestion.solution}
          onChange={handleChange} 
        />
      </div>
    </div>
  );
};

export default EnglishQuestionPairForm;