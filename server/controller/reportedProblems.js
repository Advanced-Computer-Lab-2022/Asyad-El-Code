import ReportedProblems from "../models/reportedProblems.js";
import mongoose from "mongoose";
import { validate } from "../models/reportedProblems.js";

export const createReportedProblem = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { reporterEmail, type, details } = req.body;

    try {
        const reportedProblem = await new ReportedProblems({
            reporterEmail: reporterEmail,
            type: type,
            details: details,
        });

        await reportedProblem.save();
        res.status(200).json(reportedProblem);
    } catch (error) {
        res.status(401).send({ error: err.message }); 
    }
}

export const getAllReportedProblems = async (req, res) => {
    try {
        const reportedProblems = await ReportedProblems.find();
        res.status(200).json(reportedProblems);
    } catch (error) {
        res.status(401).send({ error: err.message });
    }
}

export const getReportedProblemByReporterEmail = async (req, res) => {
    try {
        const reportedProblem = await ReportedProblems.find({ reporterEmail: req.body.reporterEmail });
        res.status(200).json(reportedProblem);
    } catch (error) {
        res.status(401).send({ error: err.message });
    }
}

export const getReportedProblem = async (req, res) => {
    try {
        const reportedProblem = await ReportedProblems.findById(req.params.id);
        res.status(200).json(reportedProblem);
    } catch (error) {
        res.status(401).send({ error: err.message });
    }
}

export const updateReportedProblem = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { reporterEmail, type, details, status } = req.body;

    try {
        const reportedProblem = await ReportedProblems.findByIdAndUpdate(
            req.params.id,
            {
                reporterEmail: reporterEmail,
                type: type,
                details: details,
                status: status,
            },
            { new: true }
        );

        res.status(200).json(reportedProblem);
    } catch (error) {
        res.status(401).send({ error: err.message });
    }
}

export const deleteReportedProblem = async (req, res) => {
    try {
        const reportedProblem = await ReportedProblems.findByIdAndRemove(req.params.id);
        res.status(200).json(reportedProblem);
    } catch (error) {
        res.status(401).send({ error: err.message });
    }
}

export const getReportedProblemByStatus = async (req, res) => {
    try {
        const reportedProblem = await ReportedProblems.find({ status: req.params.status });
        res.status(200).json(reportedProblem);
    } catch (error) {
        res.status(401).send({ error: err.message });
    }
}

export const getReportedProblemByType = async (req, res) => {
    try {
        const reportedProblem = await ReportedProblems.find({ type: req.params.type });
        res.status(200).json(reportedProblem);
    } catch (error) {
        res.status(401).send({ error: err.message });
    }
}

export const getReportedProblemByDate = async (req, res) => {
    try {
        const reportedProblem = await ReportedProblems.find({ date: req.params.date });
        res.status(200).json(reportedProblem);
    } catch (error) {
        res.status(401).send({ error: err.message });
    }
}
