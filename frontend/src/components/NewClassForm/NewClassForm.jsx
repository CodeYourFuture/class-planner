import React, { useState } from "react";
import { connect } from "react-redux";
import { createClass } from "../../redux/actions";
import { useForm } from "react-hook-form";
import Alert from "../../components/Alert/Alarm.jsx";
import "./NewClassForm.scss";

const mapStateToProps = (state) => {
  return { getErrors: state.getErrors };
};

const NewClassForm = ({ getErrors, createClass, pageData }) => {
  const { register, handleSubmit, errors } = useForm();
  const [weekState, setWeekState] = useState({ status: "Class" });
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (data, e) => {
    data.courseCalendar_Id = pageData.course_Id;
    data.status = weekState.status === "Class" ? true : false;

    createClass(data);
    e.target.reset();
    setWeekState({ status: "Class" });
    setSubmitted(true);
  };
  return (
    <div className="new-class-container">
      <p className="new-class-title">
        {pageData.city}{" "}
        <i class="fas fa-angle-right"></i>
        {" "}
        {pageData.title}
      </p>
      <form className="new-class-form" onSubmit={handleSubmit(onSubmit)}>
        {submitted && Object.keys(getErrors).length !== 0 && (
          <Alert type={"danger"} children={getErrors.syllabusURL} />
        )}
        {submitted && Object.keys(getErrors).length === 0 && (
          <Alert type={"success"} children={"New class successfully added!"} />
        )}

        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <input
            name="date"
            type="Date"
            className={
              errors.date ? "form-control error-animation" : "form-control"
            }
            ref={register({ required: true })}
          ></input>
        </div>

        <div className="form-group">
          <label>Status:</label>
          <div>
            <input
              id="Class"
              type="radio"
              name="classstatus"
              defaultChecked
              onChange={() => setWeekState({ status: "Class" })}
            />
            <label htmlFor="Class">Class</label>
            <input
              type="radio"
              name="classstatus"
              onChange={() => setWeekState({ status: "Holiday" })}
            />
            <label htmlFor="Holiday">Holiday</label>
          </div>
        </div>
        {weekState.status === "Class" ? (
          <>
            <div className="form-group">
              <label htmlFor="ClassName">Class Name:</label>
              <input
                name="className"
                className={
                  errors.className
                    ? "form-control error-animation"
                    : "form-control"
                }
                type="text"
                placeholder="Class Name"
                ref={register({ required: true })}
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="maduleName">Module Name:</label>
              <input
                name="maduleName"
                className={
                  errors.maduleName
                    ? "form-control error-animation"
                    : "form-control"
                }
                type="text"
                placeholder="Madule Name"
                ref={register({ required: true })}
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="startTime">Start Time:</label>
              <input
                name="startTime"
                className={
                  errors.startTime
                    ? "form-control error-animation"
                    : "form-control"
                }
                type="time"
                ref={register({ required: true })}
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time:</label>
              <input
                name="endTime"
                className={
                  errors.endTime
                    ? "form-control error-animation"
                    : "form-control"
                }
                type="time"
                ref={register({ required: true })}
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="syllabusURL">Syllabus URL:</label>
              <input
                name="syllabusURL"
                className={
                  errors.syllabusURL
                    ? "form-control error-animation"
                    : "form-control"
                }
                type="text"
                placeholder="Syllabus URL"
                ref={register({ required: true })}
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="role">Schedule:</label>
              <select
                name="scheduleType"
                className="form-control"
                placeholder="Schedule"
                ref={register({ required: true })}
              >
                <option value="Education Lead Class">
                  Education Lead Class
                </option>
                <option value="Personal Development Team Lead Class">
                  Personal Development Team Lead Class
                </option>
              </select>
            </div>
          </>
        ) : (
          <div className="form-group">
            <label htmlFor="ClassName">Reason:</label>
            <input
              name="className"
              className={
                errors.className
                  ? "form-control error-animation"
                  : "form-control"
              }
              type="text"
              placeholder="Reason . . ."
              ref={register({ required: true })}
            ></input>
          </div>
        )}

        <div className="form-group">
          <input type="submit" onClick={handleSubmit}></input>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, { createClass })(NewClassForm);
