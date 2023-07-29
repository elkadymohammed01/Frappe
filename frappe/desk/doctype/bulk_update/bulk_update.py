# Copyright (c) 2015, Frappe Technologies and contributors
# License: MIT. See LICENSE

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import cint


class BulkUpdate(Document):
<<<<<<< HEAD
	pass


@frappe.whitelist()
def update(doctype, field, value, condition="", limit=500):
	if not limit or cint(limit) > 500:
		limit = 500

	if condition:
		condition = " where " + condition

	if ";" in condition:
		frappe.throw(_("; not allowed in condition"))

	docnames = frappe.db.sql_list(
		f"""select name from `tab{doctype}`{condition} limit {limit} offset 0"""
	)
	data = {}
	data[field] = value
	return submit_cancel_or_update_docs(doctype, docnames, "update", data)
=======
	@frappe.whitelist()
	def bulk_update(self):
		self.check_permission("write")
		limit = self.limit if self.limit and cint(self.limit) < 500 else 500

		condition = ""
		if self.condition:
			if ";" in self.condition:
				frappe.throw(_("; not allowed in condition"))

			condition = f" where {self.condition}"

		docnames = frappe.db.sql_list(
			f"""select name from `tab{self.document_type}`{condition} limit {limit} offset 0"""
		)
		return submit_cancel_or_update_docs(
			self.document_type, docnames, "update", {self.field: self.update_value}
		)
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)


@frappe.whitelist()
def submit_cancel_or_update_docs(doctype, docnames, action="submit", data=None):
	docnames = frappe.parse_json(docnames)

	if data:
		data = frappe.parse_json(data)

	failed = []

	for i, d in enumerate(docnames, 1):
		doc = frappe.get_doc(doctype, d)
		try:
			message = ""
			if action == "submit" and doc.docstatus.is_draft():
				doc.submit()
				message = _("Submitting {0}").format(doctype)
			elif action == "cancel" and doc.docstatus.is_submitted():
				doc.cancel()
				message = _("Cancelling {0}").format(doctype)
			elif action == "update" and not doc.docstatus.is_cancelled():
				doc.update(data)
				doc.save()
				message = _("Updating {0}").format(doctype)
			else:
				failed.append(d)
			frappe.db.commit()
			show_progress(docnames, message, i, d)

		except Exception:
			failed.append(d)
			frappe.db.rollback()

	return failed


def show_progress(docnames, message, i, description):
	n = len(docnames)
	if n >= 10:
		frappe.publish_progress(float(i) * 100 / n, title=message, description=description)
