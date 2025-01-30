const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors({origin: '*'}))
app.use(bodyParser.json());
