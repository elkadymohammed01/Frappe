import json

import frappe
from frappe import _


def execute():
<<<<<<< HEAD
	frappe.reload_doc("desk", "doctype", "workspace", force=True)

	child_tables = frappe.get_all(
		"DocField",
		pluck="options",
		filters={"fieldtype": ["in", frappe.model.table_fields], "parent": "Workspace"},
	)

	for child_table in child_tables:
		if child_table != "Has Role":
			frappe.reload_doc("desk", "doctype", child_table, force=True)

	for seq, workspace in enumerate(frappe.get_all("Workspace", order_by="name asc")):
		doc = frappe.get_doc("Workspace", workspace.name)
		content = create_content(doc)
		update_workspace(doc, seq, content)
	frappe.db.commit()
=======
	for seq, workspace in enumerate(frappe.get_all("Workspace")):
		doc = frappe.get_doc("Workspace", workspace.name)
		content = create_content(doc)
		update_workspace(doc, seq, content)
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)


def create_content(doc):
	content = []
<<<<<<< HEAD
	if doc.onboarding:
=======
	if doc.get("onboarding"):
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
		content.append({"type": "onboarding", "data": {"onboarding_name": doc.onboarding, "col": 12}})
	if doc.charts:
		invalid_links = []
		for c in doc.charts:
			if c.get_invalid_links()[0]:
				invalid_links.append(c)
			else:
				content.append({"type": "chart", "data": {"chart_name": c.label, "col": 12}})
		for l in invalid_links:
			del doc.charts[doc.charts.index(l)]
	if doc.shortcuts:
		invalid_links = []
		if doc.charts:
			content.append({"type": "spacer", "data": {"col": 12}})
		content.append(
			{
				"type": "header",
<<<<<<< HEAD
				"data": {"text": doc.shortcuts_label or _("Your Shortcuts"), "level": 4, "col": 12},
=======
				"data": {"text": doc.get("shortcuts_label") or _("Your Shortcuts"), "level": 4, "col": 12},
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
			}
		)
		for s in doc.shortcuts:
			if s.get_invalid_links()[0]:
				invalid_links.append(s)
			else:
				content.append({"type": "shortcut", "data": {"shortcut_name": s.label, "col": 4}})
		for l in invalid_links:
			del doc.shortcuts[doc.shortcuts.index(l)]
	if doc.links:
		invalid_links = []
		content.append({"type": "spacer", "data": {"col": 12}})
		content.append(
			{
				"type": "header",
<<<<<<< HEAD
				"data": {"text": doc.cards_label or _("Reports & Masters"), "level": 4, "col": 12},
=======
				"data": {"text": doc.get("cards_label") or _("Reports & Masters"), "level": 4, "col": 12},
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
			}
		)
		for l in doc.links:
			if l.type == "Card Break":
				content.append({"type": "card", "data": {"card_name": l.label, "col": 4}})
			if l.get_invalid_links()[0]:
				invalid_links.append(l)
		for l in invalid_links:
			del doc.links[doc.links.index(l)]
	return content


def update_workspace(doc, seq, content):
<<<<<<< HEAD
	if not doc.title and not doc.content and not doc.is_standard and not doc.public:
		doc.sequence_id = seq + 1
		doc.content = json.dumps(content)
		doc.public = 0 if doc.for_user else 1
		doc.title = doc.extends or doc.label
=======
	if (
		not doc.title
		and (not doc.content or doc.content == "[]")
		and not doc.get("is_standard")
		and not doc.public
	):
		doc.sequence_id = seq + 1
		doc.content = json.dumps(content)
		doc.public = 0 if doc.for_user else 1
		doc.title = doc.get("extends") or doc.get("label")
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
		doc.extends = ""
		doc.category = ""
		doc.onboarding = ""
		doc.extends_another_page = 0
		doc.is_default = 0
		doc.is_standard = 0
		doc.developer_mode_only = 0
		doc.disable_user_customization = 0
		doc.pin_to_top = 0
		doc.pin_to_bottom = 0
		doc.hide_custom = 0
		doc.save(ignore_permissions=True)
