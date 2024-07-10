// import React, { useEffect, useState } from "react";
// import Documents from "./Documents";
// import axios from "axios";
// import { BASE_URL, token } from "../../utils/config";
// import Error from "../../components/Error/Error";
// import useGetProfile from "../../hooks/useFetchData";
// import Loader from "../../components/Loader/Loading";

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);

//   const { data, loading, error } = useGetProfile(
//     `${BASE_URL}/artists/profile/me`
//   );

//   console.log(data, "data");

//   return (
//     <section>
//       <div className="max-w-[1170px]  mx-2">
//         {loading && !error && <Loader />}
//         {error && !loading && <Error />}
//         {!loading && !error && <div>{data.document.number}</div>}
//       </div>
//     </section>
//   );
// };

// export default UserProfile;
