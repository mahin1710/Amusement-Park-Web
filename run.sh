#!/usr/bin/env bash
echo "================================================================"
echo "       MAGIC ISLAND — AMUSEMENT & WATER PARK PLATFORM"
echo "================================================================"
echo ""

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please download and install Node.js from https://nodejs.org/"
    exit 1
fi

node scripts/start.js --open
