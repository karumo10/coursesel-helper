import data from './data/courseDetails.json'
import ReactDOM from 'react-dom';
import React from 'react';
import ReactFlow from 'react-flow-renderer';
import './index.css';

// courseObj => <div>course element</div>
function DisplayCourseDetail(props) {
    const courseObj = props.courseObj;
    return (
        <div class="course">
            <h1>{courseObj.ID} - {courseObj.CourseName}</h1>
            <h2>Instructor: {courseObj.Instructor}</h2>
            <h2>Credit: {courseObj.Credit}</h2>
            <h2>Pre-requisite: {courseObj["Pre-requisite"]}</h2>
            <a href={courseObj.Reference}>▶More...</a>
        </div>
    )
}

// courseName => courseObj
function SearchingCourse(props) {
    const courseName = props.courseName;
    const courseObj = data[courseName];
    if (courseObj === undefined) {
        return <h1>Cannot find course {courseName}!</h1>
    } else {
        return <DisplayCourseDetail courseObj={courseObj} />
    }
}



// queryName => <div>quested courseObjs elements</div>
function SearchingCoursesFuzzily(props) {
    const queryName = props.queryName;
    const allCoursesArray = (Object.entries(data)); // return [[key1, value1], [key2, value2]...]
    const courseArray = allCoursesArray.filter(x => x[0].includes(queryName));
    const notFound = courseArray.length == 0;
    if (!notFound) {
        return (
            <div class="showing-courses">
                {courseArray.map(course => <DisplayCourseDetail courseObj={course[1]} />)}
            </div>  
        )
    } else {
        return (
            <div class="not-found">
                <ul>Sorry, but no courses found. Please ensure you:
                    <li>    Use capital letter</li>
                    <li>    Spell correctly</li>
                    Or probably this course has not be included by this website yet.
                </ul>
            </div>
        )
    }
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
            <div class="searchingBox">
                <label id="searching-hint" for="course-request-input">🔍</label>
                <input
                    id="course-request-input"
                    name="courseName"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>;
        return (
            <div class="left">
                {interactEle} 
                <SearchingCoursesFuzzily queryName={this.state.courseName}/>
            </div>
            
        )
    }
}
ReactDOM.render(
    <CourseSearcher />,
    document.getElementById('root')
)
