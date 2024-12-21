import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loading";
import { fetchDashboardData } from "../../ApiHandler/dashboardService";
import { useDispatch, useSelector } from "react-redux";
import { editUseData, fetchUserList } from "../../ApiHandler/userDataService";
import Pagination from "../Pagination/Pagination";
import { toast } from "react-toastify";
// import { fetchUsers } from "../../features/users/userSlice";

function StudentPage() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  // const { users, loading, error } = useSelector((state) => state?.users || {});

  const [studentDetails, setStudentDetails] = useState([]);
  const [approve, setApprove] = useState(true);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(studentDetails.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  useEffect(() => {
    setDataToDisplay(studentDetails.slice(start, end));
  }, [currentPage, start, end, studentDetails]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const EditUserData = async (updatedUser) => {
    try {
      const result = await editUseData(accessToken, updatedUser);
      if (result.success) {
        toast.success(result.message);
        if (
          result.dataList &&
          typeof result.dataList === "object" &&
          !Array.isArray(result.dataList)
        ) {
          const studentArray = new Array(result.dataList);
          setStudentDetails(studentArray);
        } else {
          setStudentDetails(result.dataList);
        }
        // navigate("/subjectDetails");
        // handleGetData();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error during data edit:", err.message);
      toast.error("An error occurred while editing the data.");
    }
  };

  const toggleClassesShow = (userId) => {
    studentDetails.map((user) => {
      if (user._id === userId) {
        const updatedUser = { ...user, classesShow: !user.classesShow };

        const userDataToSend = {
          userId: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          gender: updatedUser.gender,
          dob: updatedUser.dob,
          city: updatedUser.city,
          language: updatedUser.language,
          classesShow: updatedUser.classesShow,
          contact: {
            countryCode: updatedUser.contact.countryCode,
            mobile: updatedUser.contact.mobile,
          },
          upscNumber: updatedUser.upscNumber,
          password: updatedUser.password,
          isBlocked: updatedUser.isBlocked,
          profileImage:
            updatedUser.profileImage === null
              ? "string"
              : updatedUser.profileImage,
        };
        EditUserData(userDataToSend);
        return userDataToSend;
      }
    });
  };

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const result = await fetchUserList(accessToken);

        if (result && result.success) {
          setStudentDetails(result.dataList);
          setLoading(false);
        } else {
          setError("No data available or invalid response structure.");
        }
      } catch (err) {
        console.error("Error fetching contest data:", err);
        setError(
          err.message || "An error occurred while fetching contest data"
        );
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [accessToken]);

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);

  useEffect(() => {
    console.log(studentDetails);
  }, [accessToken, studentDetails]);

  if (loading) return <Loading />;

  return (
    <>
      <section className="shadow-md border-2 bg-white   rounded-xl">
        <div className=" px-0">
          <p className="px-4 py-2 text-2xl text-left font-medium text-gray-700 uppercase">
            Studens Details
          </p>
          <div class="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="border-b border-neutral-200  font-medium dark:border-white/10">
                <tr>
                  {[
                    "S/N",
                    "Name",
                    "Email",
                    "Gender",
                    "DOB",
                    "City",
                    "Contact",
                    "Action",
                  ].map((header, index) => (
                    <th
                      key={`${header}-${index}`}
                      scope="col"
                      className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors"
                    >
                      <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                        {header}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataToDisplay && (
                  <>
                    {dataToDisplay.length > 0 ? (
                      dataToDisplay.map((user, index) => {
                        const { email, gender, city } = user;
                        const fullName = `${user.firstName} ${user.lastName}`;
                        const dob = new Date(user.dob);
                        const formattedDob = `${String(dob.getDate()).padStart(
                          2,
                          "0"
                        )}/${String(dob.getMonth() + 1).padStart(
                          2,
                          "0"
                        )}/${dob.getFullYear()}`;
                        const mobile = `${user.contact.countryCode} ${user.contact.mobile}`;
                        return (
                          <tr
                            key={index}
                            className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600"
                          >
                            <td className="p-3 whitespace-nowrap">
                              {" "}
                              {index + 1}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              {fullName}
                            </td>
                            <td className="p-3 whitespace-nowrap">{email}</td>
                            <td className="p-3 whitespace-nowrap">{gender}</td>
                            <td className="p-3 whitespace-nowrap">
                              {formattedDob}
                            </td>
                            <td className="p-3 whitespace-nowrap">{city}</td>
                            <td className="p-3 whitespace-nowrap">{mobile}</td>

                            <td className="p-4  text-center">
                              <button
                                className={`relative flex items-center justify-center w-[120px] h-8 px-10  select-none rounded-lg text-md align-middle font-sans font-medium text-white transition-all ${
                                  user.classesShow
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-red-500 hover:bg-red-600"
                                } active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none shadow-md`}
                                type="button"
                                onClick={() => toggleClassesShow(user._id)}
                              >
                                {user.classesShow ? "Accepted" : "Rejected"}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="h-16">
                        <td colSpan={4} className="text-center">
                          No data found
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}

export default StudentPage;
