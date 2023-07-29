frappe.listview_settings["RQ Job"] = {
	hide_name_column: true,

	onload(listview) {
		if (!has_common(frappe.user_roles, ["Administrator", "System Manager"])) return;

<<<<<<< HEAD
		listview.page.add_inner_button(__("Remove Failed Jobs"), () => {
			frappe.confirm(__("Are you sure you want to remove all failed jobs?"), () => {
				frappe.xcall("frappe.core.doctype.rq_job.rq_job.remove_failed_jobs");
			});
		});
=======
		listview.page.add_inner_button(
			__("Remove Failed Jobs"),
			() => {
				frappe.confirm(__("Are you sure you want to remove all failed jobs?"), () => {
					frappe.xcall("frappe.core.doctype.rq_job.rq_job.remove_failed_jobs");
				});
			},
			__("Actions")
		);
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)

		if (listview.list_view_settings) {
			listview.list_view_settings.disable_count = 1;
			listview.list_view_settings.disable_sidebar_stats = 1;
		}

		frappe.xcall("frappe.utils.scheduler.get_scheduler_status").then(({ status }) => {
			if (status === "active") {
				listview.page.set_indicator(__("Scheduler: Active"), "green");
			} else {
				listview.page.set_indicator(__("Scheduler: Inactive"), "red");
<<<<<<< HEAD
=======
				listview.page.add_inner_button(
					__("Enable Scheduler"),
					() => {
						frappe.confirm(__("Are you sure you want to re-enable scheduler?"), () => {
							frappe
								.xcall("frappe.utils.scheduler.activate_scheduler")
								.then(() => {
									frappe.show_alert(__("Enabled Scheduler"));
								})
								.catch((e) => {
									frappe.show_alert({
										message: __("Failed to enable scheduler: {0}", e),
										indicator: "error",
									});
								});
						});
					},
					__("Actions")
				);
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
			}
		});

		setInterval(() => {
<<<<<<< HEAD
			if (!listview.list_view_settings.disable_auto_refresh) {
				listview.refresh();
			}
=======
			if (listview.list_view_settings.disable_auto_refresh) {
				return;
			}

			const route = frappe.get_route() || [];
			if (route[0] != "List" || "RQ Job" != route[1]) {
				return;
			}

			listview.refresh();
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
		}, 5000);
	},
};
