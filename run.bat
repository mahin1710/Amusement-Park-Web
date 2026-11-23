@echo off
title Magic Island Local Server
echo ================================================================
echo        MAGIC ISLAND — AMUSEMENT ^& WATER PARK PLATFORM
echo ================================================================
echo.
echo Checking environment...

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is not found on your system!
    echo Please download and install Node.js (version 18 or higher) from:
    echo   https://nodejs.org/
    echo.
    echo After installing Node.js, restart this file.
    echo.
    pause
    exit /b 1
)

:: Run the universal Node starter script with automatic browser opening
node scripts/start.js --open
pause
