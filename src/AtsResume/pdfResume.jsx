import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Loading from "../Loading/loading";
import { useNavigate } from "react-router-dom";
export default function PdfResume() {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [personalSummary, setPersonalSummary] = useState('');
    const [workExperiences, setWorkExperiences] = useState([{ jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' }]);
    const [skills, setSkills] = useState([{ skill: '' }]);
    const [titleInfo, setTitleInfo] = useState(null);
    const [university,setUniversity]=useState('')
    const [degree, setDegree] = useState('');
    const [study, setStudy] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [certificate, setCertificate] = useState('');
    const [languages, setLanguages] = useState([{ language: "", proficiency: "" }]);
    const [projects, setProjects] = useState('')
    const navigate = useNavigate()


    // Function to handle adding a new language field
    const addLanguage = () => {
        setLanguages([...languages, { language: "", proficiency: "" }]);
    };

    // Function to handle input changes for languages
    const handleLanguageChange = (index, field, value) => {
        const updatedLanguages = [...languages];
        updatedLanguages[index][field] = value;
        setLanguages(updatedLanguages);
    };

    // Function to remove a language field
    const removeLanguage = (index) => {
        setLanguages(languages.filter((_, i) => i !== index));
    };

    // const languages = [
    //     "Assamese", "Bengali", "Bodo", "Dogri", "English", "Gujarati", "Hindi", "Kannada", "Kashmiri", "Konkani", "Maithili",
    //     "Malayalam", "Manipuri", "Marathi", "Nepali", "Odia", "Punjabi", "Sanskrit", "Santali", "Sindhi", "Tamil",
    //     "Telugu", "Urdu", "Bengali", "Gujarati", "Hindi", "Kannada", "Kashmiri", "Konkani", "Maithili", "Malaysian",
    //     "Malyalam", "Manipuri", "Nepali", "Odia", "Punjabi", "Sanskrit", "Santali", "Sindhi", "Tamil", "Telugu", "Urdu"
    // ];


    const show = (index) => {
        const titleInfoMap = [
            {
                title: 'This is Personal Info',
                instructions: [
                    'Include your full name, contact information (phone number, email), and address (e.g,. Bengaluru, Karnataka).', ' ',
                ]
            },
            {
                title: 'This is Professional Summary',
                instructions: [
                    'For Freshers: Write a brief paragraph about your career aspirations, your key skills (such as programming languages, soft skills), and what kind of role you are looking for.', ' ',
                    'For Experienced: Summarize your professional experience, key accomplishments, skills, and the types of roles you’ve handled. Mention any leadership roles or projects you’ve led.'
                ]
            },
            {
                title: 'This is Work Experience',
                instructions: [
                    'For Freshers: Include any internships, academic projects that are relevant to the job you’re applying for. Mention your role, the company/organization, and key tasks.', '',
                    'For Experienced: List your previous jobs, including company names, your role, key responsibilities, achievements, and the dates you worked there. Be sure to highlight accomplishments that show your impact in previous roles.','',
                    '(Note) : Note: Each time you press \'Enter\' or create a new line in description, it will be treated as a separate point.'
                ]
            },
            {
                title: 'Education',
                instructions: [
                    'Provide details about your educational qualifications, focusing on your highest degree.',
                    '',
                    
                    'Why it matters:',
                    'Your education showcases your foundational knowledge and specialized skills, aligning with the role you are applying for.',
                    '',
                    'Tips:',
                    '- Always write full forms (e.g., Bachelor of Technology).',
                    '- Mention your field of study (e.g., Computer Science & Engineering).',
                    '- Tailor your listed qualifications based on the job you are applying for.'
                ]
            }

            , {
                title: 'Skills',
                instructions: [
                    'Add specific skills relevant to the domain you are applying for.','',
                    'Eg.',
                    'Technical Skills:',
                    'Programming languages (e.g., Python, Java, JavaScript, C++)', '',

                    'Soft Skills:',
                    'Communication skills', '',
                    "Note: Add Techincal skills such as 'Skill 1', 'Skill 2', etc."


                ]
            }
            ,
            {
                title: 'Languages',
                instructions: [
                    'Add the languages you are proficient in and specify your level of proficiency for each language.',
                    '',
                    'Eg.',
                    'English (Fluent)',
                    'Spanish (Intermediate)',
                    'French (Beginner)',
                    '',
                    'Why it is important:',
                    'Language skills demonstrate your ability to communicate effectively with diverse teams or clients, especially in international or multicultural environments.',
                    'It can be crucial for roles that require interaction with clients or teams from different countries or if the job demands understanding documentation in multiple languages.'
                ]
            },
            {
                title: 'Certificates',
                instructions: [
                    'List any certificates or online courses you have completed.',
                    '',
                    'Examples:',
                    'Java Programming Certificate (Udemy)',
                    'Web Development Course (Coursera)',
                    'Data Science Certificate (edX)',
                    '',
                    'Why it matters:',
                    'Certificates show your skills and dedication to learning, making you stand out to employers.','',
                    "(Note) After adding each certificate, please press Enter."
                ]
            },
            {
                title: 'Projects',
                instructions: [
                    'Describe any significant projects you have worked on.',
                    '',
                    'Examples:',
                    'E-commerce Website: Built using MERN stack with payment gateway integration.',
                    'Attendance System: Developed a React app for managing student attendance with real-time analytics.',
                    'Portfolio Website: Designed a responsive portfolio using HTML, CSS, and JavaScript.',
                    '',
                    'Why it matters:',
                    'Projects demonstrate your practical experience, problem-solving skills, and ability to apply knowledge effectively.'
                ]
            },
            {
                title: 'Awards',
                instructions: [
                    'List any awards or recognitions you have received.',
                    '',
                    'Examples:',
                    'Best Developer Award: Recognized for outstanding performance in a hackathon.',
                    'Employee of the Month: Awarded for exceptional contributions to the team.',
                    'Dean’s List: Achieved for maintaining excellent academic performance.',
                    '',
                    'Why it matters:',
                    'Awards highlight your achievements and show your dedication, excellence, and ability to stand out among peers.'
                ]
            }




        ];
        setTitleInfo(titleInfoMap[index]);
    };

    const handleChange = (index, field, value, state, setter) => {
        const newState = [...state];
        newState[index][field] = value;
        setter(newState);
    };

    const addExperience = () => {
        setWorkExperiences([...workExperiences, { jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' }]);
    };

    const removeExperience = (index) => {
        const newExperiences = workExperiences.filter((_, i) => i !== index);
        setWorkExperiences(newExperiences);
    };

    const addSkill = () => {
        setSkills([...skills, { skill: '' }]);
    };

    const removeSkill = (index) => {
        const newSkills = skills.filter((_, i) => i !== index);
        setSkills(newSkills);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);


    const downloadResume = (e) => {
        e.preventDefault()
        
        navigate('/ats-resume/build-pdf-resume/download-resume',
            {
                state: {
                    name, email, address, number, personalSummary, workExperiences, skills, titleInfo,university, degree, study, graduationYear, certificate, achievements, languages, projects
                }
            }
        )
    };


    return (
        loading ? (<Loading />) :
            (
                <div id="scrollable-container">
                    <div id='resume-build-bg'>
                        <Row>
                            <Col md={5}>
                                <div>
                                    <h4 id='resume-main-heading' onClick={() => { show(0) }}> Personal<span style={{ color: '#0074e1' }}> Information</span></h4>
                                    <form id='card-form'>
                                        <input type='text' className="form form-control"
                                            id='resume-text-box'
                                            onChange={(e) => { setName(e.target.value) }}
                                            placeholder="Full Name..." />
                                        <input type='tel' className="form form-control"
                                            id='resume-text-box'
                                            onChange={(e) => { setNumber(e.target.value) }}
                                            placeholder="Contact Number..." />
                                        <input type='email' className="form form-control"
                                            id='resume-text-box'
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            placeholder="E-Mail ID..." />
                                        <input type='text' className="form form-control"
                                            id='resume-text-box'
                                            onChange={(e) => { setAddress(e.target.value) }}
                                            placeholder="Address..." />
                                        <h4 id='resume-heading' onClick={() => { show(1) }}> Professional<span style={{ color: '#0074e1' }}> Summary</span></h4>


                                        <textarea rows='10' cols='50' className='form form-control'
                                            placeholder="Enter a brief personal summary, including your key skills, experience, and career goals."
                                            onChange={(e) => { setPersonalSummary(e.target.value) }}
                                            id='resume-text-area' />

                                        <h4 id='resume-heading-eductaion' onClick={() => { show(3) }}> <span style={{ color: '#0074e1' }}> Education</span></h4>

                                        <input type='text' className="form form-control"
                                            id='resume-text-box-education'
                                            onChange={(e) => { setUniversity(e.target.value) }}
                                            placeholder="University / Institute..." />

                                        <input type='text' className="form form-control"
                                            id='resume-text-box-education'
                                            onChange={(e) => { setDegree(e.target.value) }}
                                            placeholder="Degree / Qualification..." />

                                        <input type='text' className="form form-control"
                                            id='resume-text-box-education'
                                            onChange={(e) => { setStudy(e.target.value) }}
                                            placeholder="Field of Study..." />

                                        

                                        <input type='text' className="form form-control"
                                            id='resume-text-box-education'
                                            onChange={(e) => { setGraduationYear(e.target.value) }}
                                            placeholder="Graduation Year e.g,.(Sept-2005)" />

                                       



                                        <h4 id='resume-main-language'> Add your<span style={{ color: '#0074e1' }} onClick={() => { show(5) }}> Frequent languages</span></h4>

                                        <div id="language-main">
                                            {languages.map((lang, index) => (
                                                <div key={index} style={{ marginBottom: "10px" }}>
                                                    <input
                                                        type="text"
                                                        id='resume-text-box-languages'
                                                        className="form form-control"


                                                        placeholder="Language"
                                                        value={lang.language}
                                                        onChange={(e) => handleLanguageChange(index, "language", e.target.value)}
                                                        style={{ marginRight: "10px" }}
                                                    />
                                                    <select
                                                        value={lang.proficiency}
                                                        className="form form-control"
                                                        id='resume-text-box-languages'


                                                        onChange={(e) => handleLanguageChange(index, "proficiency", e.target.value)}
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        <option value="" disabled enabled>Select Proficiency</option>
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Intermediate">Intermediate</option>
                                                        <option value="Advanced">Advanced</option>
                                                        <option value="Fluent">Fluent</option>
                                                    </select>
                                                    {languages.length > 1 && (
                                                        <button type="button" className="btn" id='lang-btn-remove' onClick={() => removeLanguage(index)}>
                                                            Remove
                                                        </button>

                                                    )}

                                                </div>
                                            ))}
                                            <button type="button" className="btn" id='lang-btn-add' onClick={addLanguage}>
                                                Add Language
                                            </button>
                                        </div>


                                    </form>
                                </div>
                            </Col>
                            <Col md={5}>
                                <h4 id='resume-main-heading'> Work<span style={{ color: '#0074e1' }} onClick={() => { show(2) }}> Experience</span></h4>
                                {workExperiences.map((experience, index) => (
                                    <div key={index} className="work-experience-section">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id='resume-text-box-work'
                                            placeholder="Job Title/Role"
                                            value={experience.jobTitle}
                                            onChange={(e) => handleChange(index, 'jobTitle', e.target.value, workExperiences, setWorkExperiences)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            id='resume-text-box-work'
                                            placeholder="Company/Organization Name"
                                            value={experience.company}
                                            onChange={(e) => handleChange(index, 'company', e.target.value, workExperiences, setWorkExperiences)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            id='resume-text-box-work'
                                            placeholder="Location"
                                            value={experience.location}
                                            onChange={(e) => handleChange(index, 'location', e.target.value, workExperiences, setWorkExperiences)}
                                        />
                                        <label className="label-for-dates">Start date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id='resume-text-box-work'
                                            placeholder="Start Date"
                                            value={experience.startDate}
                                            onChange={(e) => handleChange(index, 'startDate', e.target.value, workExperiences, setWorkExperiences)}
                                        />
                                        <label className="label-for-dates">End date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id='resume-text-box-work'
                                            placeholder="End Date"
                                            value={experience.endDate}
                                            onChange={(e) => handleChange(index, 'endDate', e.target.value, workExperiences, setWorkExperiences)}
                                        />
                                        <textarea
                                            rows='10' cols='50'
                                            className="form-control"
                                            id='resume-text-area-work'
                                            placeholder="Description/Responsibilities"
                                            value={experience.description}
                                            onChange={(e) => handleChange(index, 'description', e.target.value, workExperiences, setWorkExperiences)}
                                        />
                                        {workExperiences.length > 1 && (
                                            <button className="btn" id='add-exp-btn-remove' onClick={() => removeExperience(index)}>
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button className="btn" id='add-exp-btn' onClick={addExperience}>
                                    Add Experience
                                </button>

                                <h4 id='resume-main-heading'><span style={{ color: '#0074e1', marginTop: '20px' }} onClick={() => { show(4) }}> Skills</span></h4>

                                {skills.map((skill, index) => (
                                    <div key={index} className="skills-section">
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id='resume-text-box-work'

                                            placeholder="Skill..."
                                            value={skill.skill}
                                            onChange={(e) => handleChange(index, 'skill', e.target.value, skills, setSkills)}
                                        />
                                        {skills.length > 1 && (
                                            <button className="btn btn-outline" id='add-skill-btn-remove' onClick={() => removeSkill(index)}>
                                                Remove Skill
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button className="btn btn-outline" id='add-skill-btn' onClick={addSkill}>
                                    Add Skill
                                </button>
                                <br></br>
                                <h4 id='resume-main-heading'><span style={{ color: '#0074e1', marginTop: '20px' }} onClick={() => { show(6) }}> Courses & Certificates</span></h4>
                                <textarea rows='5' cols='50' className='form form-control'
                                    placeholder="Courses / Certificates..."
                                    onChange={(e) => { setCertificate(e.target.value) }}
                                    id='resume-text-area-certificate' />
                                <br></br>
                                <h4 id='resume-main-heading'><span style={{ color: '#0074e1', marginTop: '20px' }} onClick={() => { show(7) }}> Projects</span></h4>
                                <textarea rows='5' cols='50' className='form form-control'
                                    placeholder="Projects..."
                                    onChange={(e) => { setProjects(e.target.value) }}
                                    id='resume-text-area-certificate' />
                                <br></br>

                                <h4 id='resume-main-heading'><span style={{ color: '#0074e1', marginTop: '20px' }} onClick={() => { show(8) }}> Link</span></h4>
                                <textarea rows='5' cols='50' className='form form-control'
                                    placeholder="Awards or Achivements..."
                                    onChange={(e) => { setAchievements(e.target.value) }}
                                    id='resume-text-area-certificate' />
                                <br></br>
                            </Col>
                            <Col md={2}>
                                <div id='bg-resume-dev'>
                                    <p>For any queries,<span style={{ fontSize: '20px' }}>click on the particular title to get more details.</span></p>
                                    {titleInfo && (
                                        <p id='typewriter' key={titleInfo.title}>
                                            {titleInfo.instructions.map((line, index) => (
                                                <span key={index}>{line}<br /></span>
                                            ))}
                                        </p>
                                    )}
                                </div>
                            </Col>
                            <Button id='resume-submit' onClick={downloadResume}>Get in PDF</Button>
                        </Row>

                    </div>
                </div>
            )
    );
}
