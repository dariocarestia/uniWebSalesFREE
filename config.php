<?php

/**
* 
* This is the configuration file for the database connection of uniWebSales.
* Please modify the section marked with '<MODIFY HERE>' to match your database configuration.
*
*/


// ** <<<MODIFY HERE********************************

//** <Database settings for uniWebSales> **

// ** hostname **
define('DB_HOST', 'localhost');

// ** The name of the database **
define('DB_NAME', 'uniwebsales');

//** Database charset to use in creating database tables **
define('DB_CHARSET', 'utf8');

//** Database username **
define('DB_USER', 'uni_user');

//** Database password **
define('DB_PASSWORD', 'UniPass@123456');

//*****UP TO HERE>>>*********************************

// *********DO NOT TOUCH THIS*************************
$hostname = defined( 'DB_HOST' ) ? DB_HOST : '';
$db_name  = defined( 'DB_NAME' ) ? DB_NAME : '';
$username = defined( 'DB_USER' ) ? DB_USER : '';
$password = defined( 'DB_PASSWORD' ) ? DB_PASSWORD : '';
// ************************************************


?>
