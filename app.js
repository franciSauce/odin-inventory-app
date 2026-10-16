const express = require('express');
const path = require('node:path');
const { env } = require('node:process');
const { format } = require('date-fns');
const { LISTENING_PORT } = env;
require('dotenv').config();

const app = express();

