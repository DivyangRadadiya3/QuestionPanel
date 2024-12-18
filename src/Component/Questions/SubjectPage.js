import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { CurrentData, SubjectData } from "../../Context/Action/index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, fetchTotalCount } from "../../ApiHandler/getSubjectApi";
import Loading from "../Loader/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubjectPage() {
  const { _id } = useSelector((state) => state.userConfig.classesData);
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState([]);

  async function handleSubject(value) {
    dispatch(CurrentData(value));
    navigate("/subjectDetails");
  }

  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState("");

  const debounceTimeoutRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [displayedSubjects, setDisplayedSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageLimit = 2;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchSubjects(accessToken, _id, currentPage);
      setTotalData(response.subjects?.totalData);

      const newData = response?.subjects?.subject_data || [];
      const existingIds = new Set(displayedSubjects.map((item) => item._id));
      const filteredNewData = newData.filter(
        (item) => !existingIds.has(item._id)
      );
      setDisplayedSubjects(filteredNewData);
      setTotalQuestion(response?.totalQuestions);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        if (
          !loading &&
          displayedSubjects.length < totalData &&
          currentPage < pageLimit
        ) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, displayedSubjects.length, totalData, currentPage]);

  return (
    <>
      <section>
        {loading ? (
          <div className="text-center py-4">
            <Loading />
          </div>
        ) : networkError ? (
          <div className=" text-red-500 text-center py-3 px-4 rounded-md mb-4">
            <p>{networkError}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
              {displayedSubjects.map((value, index) => {
                const matchingQuestion = totalQuestion.filter(
                  (q) => q.subjectName === value.name
                );

                return (
                  <div
                    className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
                    onClick={() => handleSubject(value)}
                    key={index}
                  >
                    <div className="flex flex-row items-center justify-between">
                      <p className="font-semibold text-left text-xl uppercase text-orange-500">
                        {value.name}
                      </p>
                      <div className="pr-4">
                        <img
                          src={value?.image}
                          className="block w-24 h-20 px-5 py-2 shadow-sm rounded-md"
                          alt={value.name}
                        />
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-slate-600 text-xl capitalize">
                        Total Questions
                      </p>
                      <p className="text-2xl text-gray-800 font-medium">
                        {matchingQuestion[0]?.count || 0}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
      <ToastContainer
        draggable={false}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        theme="dark"
      />
    </>
  );
}

export default SubjectPage;
