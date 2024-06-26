const db = require("../models");

exports.getReports = async (req, res) => {
  try {
    const reports = await db.Report.findAll();
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Error fetching reports" });
  }
};

exports.getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await db.Report.findByPk(id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ error: "Error fetching report" });
  }
};

exports.submitReport = async (req, res) => {
  try {
    const {
      date,
      serviceType,
      subServiceDay,
      subService,
      section,
      supervisor,
      location,
      challenges,
      solution,
      personnelCount,
      volunteerCount,
      equipmentDetails,
      remarks,
    } = req.body;

    const report = await db.Report.create({
      date,
      serviceType,
      subServiceDay,
      subService,
      section,
      supervisor,
      location,
      challenges,
      solution,
      personnelCount,
      volunteerCount,
      equipmentDetails,
      remarks,
    });

    res.status(201).json(report);
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Error creating report" });
  }
};

exports.editReport = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      date,
      serviceType,
      subServiceDay,
      subService,
      section,
      supervisor,
      location,
      challenges,
      solution,
      personnelCount,
      volunteersCount,
      equipmentDetails,
      remarks,
    } = req.body;

    const report = await db.Report.findByPk(id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    report.date = date;
    report.serviceType = serviceType;
    report.subServiceDay = subServiceDay;
    report.subService = subService;
    report.section = section;
    report.supervisor = supervisor;
    report.location = location;
    report.challenges = challenges;
    report.solution = solution;
    report.personnelCount = personnelCount;
    report.volunteersCount = volunteersCount;
    report.equipmentDetails = equipmentDetails;
    report.remarks = remarks;

    await report.save();
    res.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ error: "Error updating report" });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await db.Report.findByPk(id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    await report.destroy();
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ error: "Error deleting report" });
  }
};

exports.getReportCount = async (req, res) => {
  try {
    const reportCount = await db.Report.count();
    res.json({ reportCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSectionReports = async (req, res) => {
  try {
    const { section } = req.params;
    const reports = await db.Report.findAll({ where: { section } });
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteAllReports = async (req, res) => {
  try {
    await db.Report.destroy({ where: {} });
    res.json({ message: "All reports deleted successfully" });
  } catch (error) {
    console.error("Error deleting reports:", error);
    res.status(500).json({ error: "Error deleting reports" });
  }
};

exports.searchReports = async (req, res) => {
  try {
    const { query } = req.query;
    const reports = await db.Report.findAll({
      where: {
        [Op.or]: [
          { date: { [Op.like]: `%${query}%` } },
          { serviceType: { [Op.like]: `%${query}%` } },
          { subServiceDay: { [Op.like]: `%${query}%` } },
          { subService: { [Op.like]: `%${query}%` } },
          { section: { [Op.like]: `%${query}%` } },
          { supervisor: { [Op.like]: `%${query}%` } },
          { location: { [Op.like]: `%${query}%` } },
          { challenges: { [Op.like]: `%${query}%` } },
          { solution: { [Op.like]: `%${query}%` } },
          { personnelCount: { [Op.like]: `%${query}%` } },
          { volunteersCount: { [Op.like]: `%${query}%` } },
          { equipmentDetails: { [Op.like]: `%${query}%` } },
          { remarks: { [Op.like]: `%${query}%` } },
        ],
      },
    });
    res.json(reports);
  } catch (error) {
    console.error("Error searching reports:", error);
    res.status(500).json({ error: "Error searching reports" });
  }
};
