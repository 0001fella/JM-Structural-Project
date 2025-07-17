// src/utils/exportUtils.js

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Generate PDF from table data
export function generatePDF(title = "Report", tableData = [], columns = []) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(title, 14, 22);

  autoTable(doc, {
    startY: 30,
    head: [columns],
    body: tableData,
  });

  doc.save(`${title}.pdf`);
}

// Generate Excel from table data
export function generateExcel(title = "Report", data = [], columns = []) {
  const worksheetData = [columns, ...data];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, `${title}.xlsx`);
}
