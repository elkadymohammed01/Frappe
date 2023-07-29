# Copyright (c) 2015, Frappe Technologies and contributors
# License: MIT. See LICENSE

import frappe
from frappe.model.document import Document


class EmailQueueRecipient(Document):
	DOCTYPE = "Email Queue Recipient"

	def is_mail_to_be_sent(self):
		return self.status == "Not Sent"

<<<<<<< HEAD
	def is_main_sent(self):
=======
	def is_mail_sent(self):
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
		return self.status == "Sent"

	def update_db(self, commit=False, **kwargs):
		frappe.db.set_value(self.DOCTYPE, self.name, kwargs)
		if commit:
			frappe.db.commit()
