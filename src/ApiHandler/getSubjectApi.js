import axios from "axios";
import { convertUtcToIsc } from "../Utils/timeUtils";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchSubjects = async (token, classesId, page) => {
  try {
    let config = {
      method: "get",
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response1 = await axios.request(
      `${BASE_URL}/question/subject-wise-question-count`,
      config
    );
    const response2 = await axios.request(
      `${BASE_URL}/subject/all?page=${page}&limit=10&classesFilter=${classesId}`,
      config
    );

    if (response1 && response2) {
      const totalQuestions = response1?.data?.data || [];
      const subjects = response2?.data?.data || [];

      const convertedTotalQuestions = totalQuestions.map((question) => {
        const convertedQuestion = {
          ...question,
        };
        if (question.createdAt) {
          convertedQuestion.createdAt = convertUtcToIsc(question.createdAt);
        }
        if (question.updatedAt) {
          convertedQuestion.updatedAt = convertUtcToIsc(question.updatedAt);
        }
        return convertedQuestion;
      });

      const convertedSubjects = {
        ...subjects,
        subject_data: subjects.subject_data.map((subject) => {
          const convertedSubject = {
            ...subject,
          };
          if (subject.createdAt) {
            convertedSubject.createdAt = convertUtcToIsc(subject.createdAt);
          }
          if (subject.updatedAt) {
            convertedSubject.updatedAt = convertUtcToIsc(subject.updatedAt);
          }
          return convertedSubject;
        }),
      };

      return {
        totalQuestions: convertedTotalQuestions,
        subjects: convertedSubjects,
      };
    } else {
      throw new Error("Failed to fetch data from the APIs");
    }
  } catch (err) {
    console.error("Error fetching subjects:", err);
    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "An error occurred while fetching subjects"
    );
  }
};

export const fetchData = async (token, subject) => {
  try {
    let config = {
      method: "get",
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response1 = await axios.request(
      `${BASE_URL}/sub-topic/all?page=1&limit=10`,
      config
    );

    const response2 = await axios.request(
      `${BASE_URL}/subject/${subject}`,
      config
    );

    if (response1.status === 200 && response2.status === 200) {
      const subTopic = response1?.data?.data?.sub_topic_data || [];
      const subjects = response2?.data?.data || [];

      const convertedSubTopics = subTopic.map((topic) => {
        const convertedTopic = { ...topic };
        if (topic.createdAt) {
          convertedTopic.createdAt = convertUtcToIsc(topic.createdAt);
        }
        if (topic.updatedAt) {
          convertedTopic.updatedAt = convertUtcToIsc(topic.updatedAt);
        }
        return convertedTopic;
      });

      const subjectsResponseData = Array.isArray(subjects)
        ? subjects
        : subjects
        ? [subjects]
        : [];

      const convertedSubjects = subjectsResponseData.map((subjectData) => {
        const convertedSubject = { ...subjectData }; 
        if (subjectData.createdAt) {
          convertedSubject.createdAt = convertUtcToIsc(subjectData.createdAt);
        }
        if (subjectData.updatedAt) {
          convertedSubject.updatedAt = convertUtcToIsc(subjectData.updatedAt);
        }
        return convertedSubject;
      });

      
      return {
        success:true,
        subTopic: convertedSubTopics,
        subjects: convertedSubjects,
      };
    } else {
      if (response1.status !== 200) {
        console.error("Failed to fetch subtopics.");
      }
      if (response2.status !== 200) {
        console.error("Failed to fetch subjects.");
      }
    }
  } catch (error) {
    console.error("Failed to fetch data.");
    console.error("Error fetching data:", error);
  }
};
