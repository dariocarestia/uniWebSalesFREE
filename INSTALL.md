--Installation Instructions for uniWebSalesFREE:--

1. Download and Extract:
   - Download the uniWebSalesFREE package and extract its contents.

2. Database Setup:
   - Create a database for uniWebSalesFREE on your web server, and establish a MySQL user with full privileges for access and modification.
   - Ensure that the chosen database (name, username, and password) aligns with the configuration details in the next step.

3. File Configuration:
   - Locate and modify the following files:
     - `config.php` (Add your database information).
     - `Index.html` (Customize your website).
     - `/images/logo.png` (Replace with your own 90x90 pixel logo).
     - `favicon.png` (Replace with your favicon icon, 1170x1170 pixels).

4. Upload to Web Server:
   - Upload the uniWebSalesFREE files to your desired location on the web server using FTP.

5. Database Synchronization:
   - Synchronize the database from uniCenta oPOS.

Completion:
   uniWebSalesFREE is now installed. Repeat the last step whenever there are changes to prices or products in your store.


--Instructions for Database Synchronization (uniWebSalesFREE):--

1. Export Data from uniCenta oPOS:
   - Utilize the `sync-local` tool in the uniWebSalesFREE package to export essential information (tables in .sql format) from uniCenta oPOS.

   - Installation:
     - Install a local web server (e.g., XAMPP) on the PC or local network where uniCenta oPOS is located to access the database.
     - Copy the "sync-local" directory to the root folder of the local server (e.g., htdocs), start it, and access: http://localhost/sync-local/.
     - Edit `config_sync_local.php` to set your credentials (found in uniCenta oPOS under Configuration->Database Setup).
     - Click "Execute Process" to create `file-db.sql` in the "sync-local" directory.

2. Import Data to Your Website:
   - Use a tool like phpMyAdmin within your web hosting panel to import tables in .sql format (`file-db.sql`).


--Instructions for Database Synchronization (uniWebSales-Premium):--

1. Export data from uniCenta oPOS and import into your website in one simple step using the `sync-local` tool in the uniWebSales package.
   - Installation:
     - Install a local web server (e.g., XAMPP) on the PC or local network where uniCenta oPOS is located to access the database.
     - Copy the "sync-local" directory to the root folder of the local server (e.g., htdocs), start it, and access: http://localhost/sync-local/.
     - Edit `config_sync_local.php` to set your uniCenta oPOS BD (found in uniCenta oPOS under Configuration->Database Setup), and Web hosting FTP, credentials.
     - Edit `backup_task.bat` Replace whith your MySQL bin directory
     - Click "Execute Process" to perform the entire synchronization process.
