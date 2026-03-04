const { chromium } = require("playwright");
const { generateMedicalBillHTML } = require("../templates/medical-bill.template");

async function generatePDF(req, res) {
  try {
    const formData = req.body || {};

    const browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();
    const htmlContent = generateMedicalBillHTML(formData);

    await page.setContent(htmlContent, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
    });

    await browser.close();

    const safeBillNo = String(formData.billNo || "invoice").replace(/[^a-zA-Z0-9-_]/g, "");
    const filename = `medical-bill-${safeBillNo || "invoice"}-${Date.now()}.pdf`;

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=\"${filename}\"`,
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}

module.exports = { generatePDF };
