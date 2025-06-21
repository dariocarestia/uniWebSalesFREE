@echo off
setlocal

:: Get the first argument (directory)
set "phpScriptDirectory=%1"

:: Get the second argument (user)
set "unicenta_user=%2"

:: Get the third argument (pass)
set "unicenta_password=%3"

:: Build the full path for the backup SQL file
set "backupFilePath=%phpScriptDirectory%\file-db.sql"

:: Change to the MySQL bin directory
cd "C:\Program Files\MySQL\MySQL Server 5.6\bin"

:: Execute mysqldump with the backup command
mysqldump --user="%unicenta_user%" --password="%unicenta_password%" unicentaopos categories products > "%backupFilePath%"

:: Capture the error level in a variable
set backupResult=%errorlevel%

:: Check the operation status
if %backupResult% equ 0 (
    echo Backup created successfully at: %backupFilePath%
) else (
    echo Error creating the backup.
)

:: Return the error level to the calling script
exit /b %backupResult%

endlocal
