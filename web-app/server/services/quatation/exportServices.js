const PDFDocument = require('pdfkit');
const fs = require('fs');

class ExportService {
  async generatePDF(quotation) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const filePath = `/tmp/quotation-${Date.now()}.pdf`;
      const stream = fs.createWriteStream(filePath);
      
      doc.pipe(stream);
      doc.fontSize(20).text('Construction Quotation', { align: 'center' });
      doc.moveDown();
      
      // Add project details
      doc.fontSize(12).text(`Project: ${quotation.project.name}`);
      doc.text(`Region: ${quotation.region}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();
      
      // Add cost breakdown
      doc.fontSize(14).text('Cost Breakdown:');
      quotation.items.forEach(item => {
        doc.text(`${item.material}: ${item.quantity} ${item.unit} @ ${item.unitPrice} = ${item.total}`);
      });
      
      doc.end();
      
      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    });
  }
}

module.exports = new ExportService();