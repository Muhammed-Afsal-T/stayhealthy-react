import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
    const reports = [
        {
            id: 1,
            serialNumber: 1,
            doctorName: "Dr. John Doe",
            doctorSpeciality: "Cardiology",
            reportId: "report-001"
        },
        {
            id: 2,
            serialNumber: 2,
            doctorName: "Dr. Jane Smith",
            doctorSpeciality: "Dermatology", 
            reportId: "report-002"
        },
        {
            id: 3,
            serialNumber: 3,
            doctorName: "Dr. Mike Johnson",
            doctorSpeciality: "Pediatrics",
            reportId: "report-003"
        }
    ];

    // Function to handle viewing report
    const handleViewReport = (reportId) => {
        const reportUrl = `/patient_report.pdf`;
        window.open(reportUrl, '_blank');
    };

    // Function to handle downloading report
    const handleDownloadReport = (reportId, doctorName) => {
        const link = document.createElement('a');
        link.href = '/patient_report.pdf';
        link.download = `Medical_Report_${doctorName.replace(' ', '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="reports-page-container">
            <div className="reports-header">
                <h1>Medical Reports</h1>
                <p>Your medical consultation reports and prescriptions</p>
            </div>

            <div className="reports-table-container">
                {/* Table Header */}
                <div className="reports-table-header">
                    <div className="header-cell serial-number">Serial Number</div>
                    <div className="header-cell doctor-name">
                        Doctor<br />Name
                    </div>
                    <div className="header-cell doctor-speciality">Doctor Speciality</div>
                    <div className="header-cell view-report">View Report</div>
                    <div className="header-cell download-report">
                        Download<br />Report
                    </div>
                </div>

                {/* Table Rows */}
                <div className="reports-table-body">
                    {reports.map((report) => (
                        <div key={report.id} className="report-row">
                            <div className="cell serial-number">{report.serialNumber}</div>
                            <div className="cell doctor-name">{report.doctorName}</div>
                            <div className="cell doctor-speciality">{report.doctorSpeciality}</div>
                            <div className="cell view-report">
                                <button 
                                    className="view-btn"
                                    onClick={() => handleViewReport(report.reportId)}
                                >
                                    View Report
                                </button>
                            </div>
                            <div className="cell download-report">
                                <button 
                                    className="download-btn"
                                    onClick={() => handleDownloadReport(report.reportId, report.doctorName)}
                                >
                                    Download<br />Report
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* No reports message */}
            {reports.length === 0 && (
                <div className="no-reports-message">
                    <p>No medical reports available.</p>
                    <p>Your consultation reports will appear here after appointments.</p>
                </div>
            )}
        </div>
    );
};

export default ReportsLayout;