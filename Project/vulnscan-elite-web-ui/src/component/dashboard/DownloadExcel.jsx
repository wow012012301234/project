import React from 'react';
import * as XLSX from 'xlsx';
import { IoMdDownload } from "react-icons/io";
const DownloadExcel = (props) => {
    const rows = props.results.map((data,index) => ({
        "ID": index,
        "Name": data.name,
        "Risk": data.risk,
        "Description": data.description,
        "Confidence": data.confidence,
        "URL": data.url,
        "Solution": data.solution,
        "Alert": data.alert,
        "Parameter": data.param,
        "Reference": data.reference
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    // Customize the appearance of the table
    worksheet["!cols"] = [
        { wch: 20 },
        { wch: 20 },
        { wch: 15 },
        { wch: 80 },
        { wch: 15 },
        { wch: 40 },
        { wch: 80 },
        { wch: 30 },
        { wch: 20 },
        { wch: 60 }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Scan Report`);

    const handleExport = () => {
        XLSX.writeFile(workbook, `ScanReportFor_${props.target}.xlsx`);
    };

    return (
        <>
            <button type="button" className="download-btn col-lg-3 px-lg-4 py-lg-2 col-5 p-2 col-md-4 col-xl-2" onClick={handleExport}> <IoMdDownload /><span> Get Report</span></button>
          
        </>
    );
};

export default DownloadExcel;


