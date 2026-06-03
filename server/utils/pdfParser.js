// server/utils/pdfParser.js
import PDFDocument from 'pdfkit';
import pdfParse from 'pdf-parse-fork';

export const extractTextFromBuffer = async (fileObject) => {
  if (fileObject.mimetype === 'application/pdf') {
    const parsedData = await pdfParse(fileObject.buffer);
    return parsedData.text;
  }
  return fileObject.buffer.toString('utf-8');
};

export const compileAtsPdfBuffer = (dataMatrix) => {
  return new Promise((resolve, reject) => {
    // Exact structural limits to fit on an A4 sheet cleanly
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 35, bottom: 35, left: 45, right: 45 }
    });

    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', (err) => reject(err));

    // A4 absolute printable height boundary configuration
    const maxBodyHeight = 780;

    // --- ACCURATE TYPOGRAPHY & COLOR CONFIG MATRIX ---
    const primaryColor = '#000000';   // Rich Bold Black for Headings
    const secondaryColor = '#2563EB'; // Solid Bold Blue for Section Dividers
    const bodyColor = '#1F2937';      // High-contrast Slate Gray for descriptions
    const metaColor = '#4B5563';      // Clear Slate Gray for metadata blocks

    // --- HEADER SEGMENT ---
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(22).text((dataMatrix.fullName || "PAVAN KALYAN SRINIVAS ROBBA").toUpperCase(), { tracking: 0.5 });
    doc.fillColor(secondaryColor).font('Helvetica-Bold').fontSize(11).text((dataMatrix.title || "MERN STACK DEVELOPER").toUpperCase(), { paragraphGap: 3 });
    doc.fillColor(metaColor).font('Helvetica').fontSize(9).text(dataMatrix.subtitle || "", { paragraphGap: 10 });

    // Technical Separator Vector Line
    doc.moveTo(45, doc.y).lineTo(550, doc.y).strokeColor('#D1D5DB').lineWidth(1.2).stroke();
    doc.moveDown(0.5);

    // --- EXECUTIVE SUMMARY ---
    renderSectionTitle(doc, "I. EXECUTIVE SUMMARY ARCHITECTURE", secondaryColor);
    doc.fillColor(bodyColor).font('Helvetica').fontSize(9.5).text(dataMatrix.summary || "", { leading: 13.5, paragraphGap: 10 });

    // --- CORE TECHNICAL MATRIX ---
    renderSectionTitle(doc, "II. CORE TECHNICAL SKILLS MATRIX", secondaryColor);
    const skillString = (dataMatrix.skills || []).join('   •   ');
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9.5).text(skillString, { leading: 14, paragraphGap: 10 });

    // --- PROFESSIONAL EXPERIENCE RECORD ---
    if (dataMatrix.experience && dataMatrix.experience.length > 0 && doc.y < maxBodyHeight) {
      renderSectionTitle(doc, "III. PROFESSIONAL EXPERIENCE RECORD", secondaryColor);
      dataMatrix.experience.forEach((job) => {
        if (doc.y > maxBodyHeight - 40) return;
        
        doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10.5).text(job.role, { continued: true });
        doc.fillColor(metaColor).font('Helvetica-Oblique').fontSize(9).text(`   |   ${job.company}  (${job.period})`, { paragraphGap: 4 });
        
        const bullets = job.bullets || [];
        bullets.forEach((bullet) => {
          if (doc.y > maxBodyHeight - 15) return;
          doc.fillColor(bodyColor).font('Helvetica').fontSize(9.5).text(`•  ${bullet}`, { indent: 12, leading: 13, paragraphGap: 3 });
        });
        doc.moveDown(0.4);
      });
    }

    // --- TECHNICAL INTERNSHIPS ---
    if (dataMatrix.internships && dataMatrix.internships.length > 0 && doc.y < maxBodyHeight) {
      renderSectionTitle(doc, "IV. TECHNICAL INTERNSHIPS", secondaryColor);
      dataMatrix.internships.forEach((intern) => {
        if (doc.y > maxBodyHeight - 40) return;
        
        doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10.5).text(intern.role, { continued: true });
        doc.fillColor(metaColor).font('Helvetica-Oblique').fontSize(9).text(`   |   ${intern.company}  (${intern.period})`, { paragraphGap: 4 });
        
        const bullets = intern.bullets || [];
        bullets.forEach((bullet) => {
          if (doc.y > maxBodyHeight - 15) return;
          doc.fillColor(bodyColor).font('Helvetica').fontSize(9.5).text(`•  ${bullet}`, { indent: 12, leading: 13, paragraphGap: 3 });
        });
        doc.moveDown(0.4);
      });
    }

    // --- TECHNICAL PROJECTS COMPENDIUM ---
    if (dataMatrix.projects && dataMatrix.projects.length > 0 && doc.y < maxBodyHeight) {
      renderSectionTitle(doc, "V. TECHNICAL PROJECT COMPENDIUM", secondaryColor);
      dataMatrix.projects.forEach((proj) => {
        if (doc.y > maxBodyHeight - 35) return;
        
        doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(10.5).text(proj.name, { continued: true });
        doc.fillColor(secondaryColor).font('Helvetica-Bold').fontSize(9).text(`   [${proj.tech || 'Core Stack'}]`, { paragraphGap: 4 });
        
        const projectBullets = proj.bullets || (proj.bullet ? [proj.bullet] : []);
        projectBullets.forEach((bullet) => {
          if (doc.y > maxBodyHeight - 15) return;
          doc.fillColor(bodyColor).font('Helvetica').fontSize(9.5).text(`•  ${bullet}`, { indent: 12, leading: 13, paragraphGap: 3 });
        });
        doc.moveDown(0.4);
      });
    }

    // --- CREDENTIALS & CERTIFICATIONS ---
    if (dataMatrix.certifications && dataMatrix.certifications.length > 0 && doc.y < maxBodyHeight - 25) {
      renderSectionTitle(doc, "VI. CREDENTIALS & CERTIFICATIONS", secondaryColor);
      const certString = dataMatrix.certifications.join('   |   ');
      doc.fillColor(bodyColor).font('Helvetica-Bold').fontSize(9.5).text(certString, { leading: 13.5 });
    }

    doc.end();
  });
};

const renderSectionTitle = (doc, titleText, accentColor) => {
  doc.moveDown(0.5);
  doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(11).text(titleText, { tracking: 0.5, paragraphGap: 5 });
};