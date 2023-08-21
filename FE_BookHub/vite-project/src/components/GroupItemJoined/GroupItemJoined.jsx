import React from "react";
import "./GroupItemJoined.css";
function GroupItemJoined() {
  return (
    <>
      <div className="group-item-joined">
        <img src="https://source.unsplash.com/random/12" alt="" />
        <div className="group-item-joined-content">
          <div className="joined-content-title">Miss Deadline 2023</div>
          <div className="joined-content-body">
            <div className="joined-content-newcomment">0 New Posts</div>
            <div className="joined-content-time-active">1 ngày trước</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupItemJoined;
