<?php
require "config_sync_local.php";

// Path to the .bat file
$batFile = 'backup_task.bat';

// Get the current directory of this PHP script
$phpScriptDirectory = __DIR__;

// Build the command with the directory as an argument
$command = "$batFile $phpScriptDirectory $unicenta_user $unicenta_password";

// Execute the .bat file with the command
exec($command, $output, $return_var);

// Check if the execution was successful
if ($return_var === 0) {
    echo "Backup created successfully";
} else {
    echo "Error creating the backup";
    print_r($output);
}

?>
