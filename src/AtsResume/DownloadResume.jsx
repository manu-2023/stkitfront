import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useLocation } from 'react-router-dom';

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 30,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },
    header: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
        pageBreakInside: 'avoid', // Ensure sections don't split across pages
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    bullet: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,
    },
    bulletPoint: {
        marginRight: 5,
        fontWeight: 'bold',
    },
    text: {
        marginBottom: 10,
    },
    subText: {
        fontSize: 8,
    },
    skillSection: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillItem: {
        marginRight: 10,
        marginBottom: 5,
        padding: 5,
        borderRadius: 3,
    }
});

// Create the PDF document
const MyDocument = ({ data }) => (
    <Document>
        <Page style={styles.page}>
            {data.name && <Text style={styles.header}>{data.name}</Text>}
            {(data.email || data.number || data.address) && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', fontSize: '10px' }}>
                    {data.email && <Text style={[styles.text, { marginLeft: '100px', marginRight: '15px', color: 'gray' }]}> {data.email}</Text>}&nbsp;&nbsp;
                    {data.number && <Text style={[styles.text, { marginRight: '15px', color: 'gray' }]} >  •  {data.number}</Text>}&nbsp;&nbsp;
                    {data.address && <Text style={[styles.text, { marginRight: '15px', color: 'gray' }]}>  •  {data.address}</Text>}
                </View>
            )}

            {data.personalSummary && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.title}>Professional Summary</Text>
                    <Text style={{ marginTop: '-7px', marginBottom: '5px' }}>__________________________________________________________________________________________________</Text>
                    <Text style={[styles.text, { marginBottom: '-5px' ,color:'#4a4a4a'}]}>{data.personalSummary}</Text>
                </View>
            )}

            {data.workExperiences && data.workExperiences.some(experience => {
                const jobTitle = experience.jobTitle?.trim() || "";
                const company = experience.company?.trim() || "";
                const location = experience.location?.trim() || "";
                const startDate = experience.startDate?.trim() || "";
                const endDate = experience.endDate?.trim() || "";
                const description = experience.description?.trim() || "";
                return jobTitle || company || location || startDate || endDate || description;
            }) && (
                    <View style={styles.section} wrap={false}>
                        <Text style={styles.title}>WORK EXPERIENCE</Text>
                        <Text style={{ marginTop: '-7px', marginBottom: '2px' }}>__________________________________________________________________________________________________</Text>
                        {data.workExperiences.map((experience, index) => {
                            const jobTitle = experience.jobTitle?.trim() || "";
                            const company = experience.company?.trim() || "";
                            const location = experience.location?.trim() || "";
                            const startDate = experience.startDate?.trim() || "";
                            const endDate = experience.endDate?.trim() || "";
                            const description = experience.description?.trim() || "";

                            if (!jobTitle && !company && !location && !startDate && !endDate && !description) {
                                return null;
                            }

                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.section,
                                        { marginBottom: 3 }, // Reduce or eliminate margin between sections
                                    ]}
                                    wrap={false} // Ensure section doesn't split across pages
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        {jobTitle && company && (
                                            <Text
                                                style={[
                                                    styles.text,
                                                    {
                                                        flex: 1,
                                                        marginTop: 3,
                                                        fontSize: 12,
                                                        color: 'black',
                                                        fontWeight: 'bold',
                                                    },
                                                ]}
                                            >
                                                {jobTitle}{'\n'}
                                            </Text>
                                        )}
                                        {(startDate || endDate || location) && (
                                            <Text
                                                style={[
                                                    styles.subText,
                                                    {
                                                        width: 280,
                                                        marginTop: '4px',
                                                        textAlign: 'right',
                                                    },
                                                ]}
                                            >
                                                {startDate} to {endDate}, {location}
                                            </Text>
                                        )}
                                    </View>
                                    <Text style={{ marginBottom: '4px', color: '#4a4a4a', fontSize: '11px', marginTop: '-5px' }}>{company}</Text>

                                    {description && (
                                        <Text style={[styles.text, { color: '#4a4a4a', marginTop: '1px' }]}>
                                            {description.split('\n') // Split by line
                                                .map(desc => desc.trim()) // Remove extra spaces from each line
                                                .filter(desc => desc !== '') // Remove any empty lines
                                                .map((desc, i) => (
                                                    <Text key={i} style={{ marginBottom: '-40px', display: 'block', lineHeight: '18px' }}> {/* Adjust space here */}
                                                        {'• '}{desc}{'\n'}
                                                    </Text>
                                                ))}
                                        </Text>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                )}

            {data.skills && data.skills.length > 0 && data.skills.some(skill => skill.skill?.trim()) && (
                <View style={styles.section} wrap={false}>
                    <Text style={[styles.title, { marginTop: '-22px' }]}>SKILLS</Text>
                    <Text style={{ marginTop: '-7px', marginBottom: '5px' }}>__________________________________________________________________________________________________</Text>
                    <View style={[styles.skillSection, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                        {data.skills.map((skill, index) => {
                            const skillText = skill.skill?.trim();
                            return skillText ? (
                                <Text
                                    key={index}
                                    style={{
                                        color: '#4a4a4a',
                                        fontSize: 10,
                                        marginBottom: 8, // Add space between each skill
                                        lineHeight: 1,  // Adjust line height for better readability
                                    }}
                                >
                                    {skillText}
                                </Text>
                            ) : null;
                        })}
                    </View>
                </View>
            )}

            {(data.degree || data.study || data.university || data.startedYear || data.graduationYear || data.relcouse) && (
                <View style={styles.section}>
                    <Text style={[styles.title, { marginTop: '-10px' }]}>EDUCTAION</Text>
                    <Text style={{ marginTop: '-7px', marginBottom: '5px', }}>__________________________________________________________________________________________________</Text>
                    {data.degree && data.study && <Text style={[styles.text, {
                        flex: 1,
                        marginTop: 2,
                        fontSize: 11,
                        color: 'black', // Full black for title
                        fontWeight: 'bold',
                    }]}>{data.degree} in {data.study}</Text>}
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: '1px' }}> {data.university && <Text style={[styles.text, { color: '#4a4a4a', marginTop: '5px', fontSize: '10px' }]}>{data.university + " "}</Text>}
                        {data.graduationYear && <Text style={[styles.text, { color: '#4a4a4a', marginTop: '5px', fontSize: '10px' }]}> •  {data.graduationYear}</Text>}</View>

                </View>
            )}  

            {data.languages && data.languages.length > 0 && data.languages.some(language => language.language?.trim() || language.proficiency?.trim()) && (
                <View style={styles.section} wrap={false}>
                    <Text style={[styles.title, { marginTop: '-15px' }]}>LANGUAGES</Text>
                    <Text style={{ marginTop: '-7px', marginBottom: '5px', }}>__________________________________________________________________________________________________</Text>
                    {data.languages.map((language, index) => {
                        const languageText = language.language?.trim();
                        const proficiencyText = language.proficiency?.trim();
                        return (languageText || proficiencyText) ? (
                            <Text key={index} style={styles.bullet}>
                                <Text style={styles.bulletPoint}></Text>{languageText} {proficiencyText && `- ${proficiencyText}`}
                            </Text>
                        ) : null;
                    })}
                </View>
            )}
        </Page>
    </Document>
);



const DownloadResume = () => {
    const location = useLocation();
    const data = location.state || {
        name: '',
        email: '',
        number: '',
        address: '',
        personalSummary: '',
        workExperiences: [],
        skills: [],
        degree: '',
        study: '',
        university: '',
        startedYear: '',
        graduationYear: '',
        relcourse: '',
        languages: [],
    };
    const handleDownload = async () => {
        const doc = <MyDocument data={data} />;
        const blob = await pdf(doc).toBlob();

        const staticFilename = `${data.name}`;
        console.log("Saving file as:", staticFilename);
        saveAs(blob, staticFilename);
    };






    return (
        <div>
            <button onClick={handleDownload}>
                Download PDF
            </button>
        </div>
    );
};

export default DownloadResume;
