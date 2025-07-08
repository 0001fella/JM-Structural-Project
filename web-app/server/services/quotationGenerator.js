import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';

export const generateQuotationDocument = async (quotation, format) => {
  if (format === 'pdf') {
    return generatePDF(quotation);
  } else if (format === 'excel') {
    return generateExcel(quotation);
  } else {
    throw new Error('Unsupported export format');
  }
};

const generatePDF = (quotation) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    
    // Build PDF content
    doc.fontSize(20).text('Construction Quotation', { align: 'center' });
    doc.moveDown();
    
    // Add materials table
    doc.fontSize(14).text('Materials:');
    doc.moveDown();
    
    quotation.materials.forEach(item => {
      doc.text(`${item.name}: ${item.quantity} ${item.unit} @ $${item.unitRate}/unit = $${item.total}`);
      doc.moveDown(0.5);
    });
    
    // Add summary
    doc.moveDown();
    doc.fontSize(16).text(`Total: $${quotation.total.toFixed(2)}`);
    doc.fontSize(12).text(`Profit Margin: ${quotation.profitMargin}%`);
    
    doc.end();
  });
};

const generateExcel = (quotation) => {
  return new Promise(async (resolve) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Quotation');
    
    // Add headers
    worksheet.addRow(['Item', 'Quantity', 'Unit', 'Unit Price', 'Total']);
    
    // Add materials
    quotation.materials.forEach(item => {
      worksheet.addRow([
        item.name,
        item.quantity,
        item.unit,
        item.unitRate,
        item.quantity * item.unitRate
      ]);
    });
    
    // Add summary
    worksheet.addRow([]);
    worksheet.addRow(['Subtotal', '', '', '', quotation.subtotal]);
    worksheet.addRow(['Profit Margin', '', '', quotation.profitMargin + '%']);
    worksheet.addRow(['Total', '', '', '', quotation.total]);
    
    const buffer = await workbook.xlsx.writeBuffer();
    resolve(buffer);
  });
};