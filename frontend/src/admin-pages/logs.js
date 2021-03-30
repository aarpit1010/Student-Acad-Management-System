// import React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import "./announcements.css";

// export default function Logs() {
//   const [isLoading, setLoading] = useState(true);
//   const [logs, setLogs] = useState("");
//   useEffect(() => {
//     // asynchronous function to fetch logs
//     const fetchLogs = async () => {
//       try {
//         const logResponse = await axios.get("/admin/generatelogs", {
//           headers: {
//             "auth-token": localStorage.token,
//             "Content-Type": "application/json",
//           },
//         });
//         setLogs(logResponse.data);
//         setLoading(false);
//       } catch {
//         (err) => console.log(err);
//       }
//     };
//     fetchLogs();
//   }, []);

//   console.log(logs);
//   if (isLoading) {
//     return <div className="Course-Summary">Loading...</div>;
//   }

//   return (
//     <div className="announcements-page pt-3">
//       <h4 className="mx-auto">Log Report</h4>
//       <div className="row cards-row">
//         {logs.map((item, key) => {
//           console.log("ITEM:", item.notifs_arr);
//           return (
//             <div className="col-sm-4 card-col">
//               <div className="card">
//                 <div className="card-body">
//                   <h6 className="card-title">
//                     Enrollment No. {item.enrollment.toUpperCase()}
//                   </h6>
//                   <ul className="list-group">
//                     {item.notifs_arr.map((notif, key2) => {
//                       return (
//                         <li className="list-group-item list-group-item-action list-group-item-info">
//                           <p className="card-text">
//                             {notif.message}
//                             <br />
//                             {notif.sent_time}
//                           </p>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
