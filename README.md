# Zebra Printer Service – Documentation

## Description
Zebra Printer Service is a lightweight local HTTP server built with Node.js that allows Zebra label printing through USB by accepting JSON payloads and converting them to ZPL (Zebra Programming Language). It's intended to be installed on a Windows PC that is physically connected to a Zebra printer.

## Prerequisites
Before running the service, ensure the following are set up :

1. Install Node.js
2. Zebra Printer Driver
   Ensure the Zebra printer is:
   - Installed correctly on Windows (you should see it in "Devices and Printers").
   - Using the ZDesigner driver (recommended).
   You can test the printer by printing a test page from Windows.
3. Enable Printer Sharing
   To make the printer accessible via a name on the local machine:
   - Go to Control Panel > Devices and Printers
   - Right-click your Zebra printer → Printer Properties
   - Go to the Sharing tab → Enable Share this printer
   - Set a simple share name "Zebra"

## Setup Instructions
1. Clone or Download the Project
   ```
   git clone https://your-repo-url.git](https://github.com/zidanalba/zebra-printer-service.git
   cd zebra-printer-service
   ```
2. Install Dependencies
   ```
   npm install
   ```

## How to Run the Service
```
node server.js
```
   
