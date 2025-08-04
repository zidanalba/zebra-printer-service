const express = require('express');
const bodyParser = require('body-parser');
const { printZpl } = require('./zebra');
const { generateZpl } = require('./zplGenerator');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(bodyParser.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Zebra Printer API',
      version: '1.0.0',
      description: 'API for printing patient labels using Zebra ZD611R'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /print:
 *   post:
 *     summary: Print a patient label to Zebra printer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               dob:
 *                 type: string
 *               room:
 *                 type: string
 *               qrcode:
 *                 type: string
 *             required:
 *               - name
 *               - gender
 *               - dob
 *               - room
 *               - qrCode
 *     responses:
 *       200:
 *         description: Label printed successfully
 *       500:
 *         description: Failed to print
 */
app.post('/print', async (req, res) => {
  try {
    const zpl = generateZpl(req.body);
    await printZpl(zpl);

    res.json({ success: true, message: 'Print sent successfully' });
  } catch (err) {
    console.error('Print error:', err);
    res.status(500).json({ success: false, message: 'Print failed', error: err.toString() });
  }
});

app.listen(3000, () => {
  console.log('Zebra Printer service running on port 3000');
});
