import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./announcements.css";

function Announcements() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/admin/notifications/view", {
        headers: {
          "admin-auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <div className="Course-Summary">Loading...</div>;
  }

  return (
    <div className="announcements-page pt-3">
      <h4 className="mx-auto">Announcements</h4>

      <div className="card shadow-lg col-md-4 mx-auto p-3">
        <form>
          <h5>Enter a new announcement to make</h5>
          <div class="form-group">
            <label for="inlineFormInput">Enrollment no.</label>
            <input
              type="text"
              class="form-control"
              id="inlineFormInput"
              placeholder="IIT20XX001"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Message</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Write the message here"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <br />
      <div className="row cards-row">
        {data.map((item, key) => {
          console.log("ITEM:", item.notifs_arr);
          return (
            <div className="col-sm-4 card-col">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">
                    Enrollment No. {item.enrollment.toUpperCase()}
                  </h6>
                  <ul className="list-group">
                    {item.notifs_arr.map((notif, key2) => {
                      return (
                        <li className="list-group-item list-group-item-action list-group-item-info">
                          <p className="card-text">
                            {notif.message}
                            <br />
                            {notif.sent_time}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Announcements;
