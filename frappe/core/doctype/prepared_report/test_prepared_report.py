# Copyright (c) 2018, Frappe Technologies and Contributors
# License: MIT. See LICENSE
import json
<<<<<<< HEAD

import frappe
=======
import time

import frappe
from frappe.desk.query_report import generate_report_result, get_report_doc
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
from frappe.tests.utils import FrappeTestCase


class TestPreparedReport(FrappeTestCase):
<<<<<<< HEAD
	def setUp(self):
		self.report = frappe.get_doc({"doctype": "Report", "name": "Permitted Documents For User"})
		self.filters = {"user": "Administrator", "doctype": "Role"}
		self.prepared_report_doc = frappe.get_doc(
			{
				"doctype": "Prepared Report",
				"report_name": self.report.name,
				"filters": json.dumps(self.filters),
				"ref_report_doctype": self.report.name,
			}
		).insert()

	def tearDown(self):
		frappe.set_user("Administrator")
		self.prepared_report_doc.delete()

	def test_for_creation(self):
		self.assertTrue("QUEUED" == self.prepared_report_doc.status.upper())
		self.assertTrue(self.prepared_report_doc.report_start_time)
=======
	@classmethod
	def tearDownClass(cls):
		for r in frappe.get_all("Prepared Report", pluck="name"):
			frappe.delete_doc("Prepared Report", r, force=True, delete_permanently=True)

		frappe.db.commit()

	def create_prepared_report(self, commit=False):
		doc = frappe.get_doc(
			{
				"doctype": "Prepared Report",
				"report_name": "Database Storage Usage By Tables",
			}
		).insert()

		if commit:
			frappe.db.commit()

		return doc

	def test_queueing(self):
		doc_ = self.create_prepared_report()
		self.assertEqual("Queued", doc_.status)
		self.assertTrue(doc_.queued_at)

		frappe.db.commit()
		time.sleep(5)

		doc_ = frappe.get_last_doc("Prepared Report")
		self.assertEqual("Completed", doc_.status)
		self.assertTrue(doc_.job_id)
		self.assertTrue(doc_.report_end_time)

	def test_prepared_data(self):
		doc_ = self.create_prepared_report(commit=True)
		time.sleep(5)

		prepared_data = json.loads(doc_.get_prepared_data().decode("utf-8"))
		generated_data = generate_report_result(get_report_doc("Database Storage Usage By Tables"))
		self.assertEqual(len(prepared_data["columns"]), len(generated_data["columns"]))
		self.assertEqual(len(prepared_data["result"]), len(generated_data["result"]))
		self.assertEqual(len(prepared_data), len(generated_data))
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
