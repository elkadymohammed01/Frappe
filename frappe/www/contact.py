# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: MIT. See LICENSE

<<<<<<< HEAD
import frappe
from frappe import _
from frappe.utils import now
=======
from contextlib import suppress

import frappe
from frappe import _
from frappe.rate_limiter import rate_limit
from frappe.utils import validate_email_address
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)

sitemap = 1


def get_context(context):
	doc = frappe.get_doc("Contact Us Settings", "Contact Us Settings")

	if doc.query_options:
		query_options = [opt.strip() for opt in doc.query_options.replace(",", "\n").split("\n") if opt]
	else:
		query_options = ["Sales", "Support", "General"]

	out = {"query_options": query_options, "parents": [{"name": _("Home"), "route": "/"}]}
	out.update(doc.as_dict())

	return out


<<<<<<< HEAD
max_communications_per_hour = 1000


@frappe.whitelist(allow_guest=True)
def send_message(subject="Website Query", message="", sender=""):
	if not message:
		frappe.response["message"] = "Please write something"
		return

	if not sender:
		frappe.response["message"] = "Email Address Required"
		return

	# guest method, cap max writes per hour
	if (
		frappe.db.sql(
			"""select count(*) from `tabCommunication`
		where `sent_or_received`="Received"
		and TIMEDIFF(%s, modified) < '01:00:00'""",
			now(),
		)[0][0]
		> max_communications_per_hour
	):
		frappe.response[
			"message"
		] = "Sorry: we believe we have received an unreasonably high number of requests of this kind. Please try later"
		return

	# send email
	forward_to_email = frappe.db.get_single_value("Contact Us Settings", "forward_to_email")
	if forward_to_email:
		frappe.sendmail(recipients=forward_to_email, sender=sender, content=message, subject=subject)
=======
@frappe.whitelist(allow_guest=True)
@rate_limit(limit=1000, seconds=60 * 60)
def send_message(sender, message, subject="Website Query"):
	sender = validate_email_address(sender, throw=True)

	with suppress(frappe.OutgoingEmailError):
		if forward_to_email := frappe.db.get_single_value("Contact Us Settings", "forward_to_email"):
			frappe.sendmail(recipients=forward_to_email, reply_to=sender, content=message, subject=subject)

		frappe.sendmail(
			recipients=sender,
			content=f"<div style='white-space: pre-wrap'>Thank you for reaching out to us. We will get back to you at the earliest.\n\n\nYour query:\n\n{message}</div>",
			subject="We've received your query!",
		)

	# for clearing outgoing email error message
	frappe.clear_last_message()
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)

	# add to to-do ?
	frappe.get_doc(
		dict(
			doctype="Communication",
			sender=sender,
			subject=_("New Message from Website Contact Page"),
			sent_or_received="Received",
			content=message,
			status="Open",
		)
	).insert(ignore_permissions=True)
<<<<<<< HEAD

	return "okay"
=======
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
