import data from './data/courseDetails.json'
import ReactDOM from 'react-dom';
import React from 'react';
import ReactFlow from 'react-flow-renderer';

function SearchingCourse(props) {
    const courseName = props.courseName;
    const courseObj = data[courseName];
    if (courseObj === undefined) {
        return <h1>Cannot find course {courseName}!</h1>
    } else {
        // console.log(courseObj);
        return <DisplayCourseDetail courseObj={courseObj} />
    }
}

function DisplayCourseDetail(props) {
    const courseObj = props.courseObj;
    return (
        <div>
            <h1>{courseObj.ID} - {courseObj.CourseName}</h1>
            <h2>Instructor: {courseObj.Instructor}</h2>
            <h2>Credit: {courseObj.Credit}</h2>
            <h2>Pre-requisite: {courseObj["Pre-requisite"]}</h2>
            <text>More information: {courseObj.Reference}</text>
        </div>
    )
}

class CourseSearcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseName: '',
            isClicked: false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name; // used to specify which of attribute of state to change
        this.setState({
            [name]: value
        });
    }
    render() {
        const interactEle =
            <div>
                <label for="course-request-input">🔍</label>
                <input
                    id="course-request-input"
                    name="courseName"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>;
        return (
            <div>
                {interactEle} <br></br>
                <SearchingCourse courseName={this.state.courseName} />
            </div>
            
        )
    }
}
ReactDOM.render(
    <CourseSearcher />,
    document.getElementById('root')
)
