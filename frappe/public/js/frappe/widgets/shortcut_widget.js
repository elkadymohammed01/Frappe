import Widget from "./base_widget.js";

frappe.provide("frappe.utils");

export default class ShortcutWidget extends Widget {
	constructor(opts) {
		opts.shadow = true;
		super(opts);
	}

	get_config() {
		return {
			name: this.name,
			icon: this.icon,
			label: this.label,
			format: this.format,
			link_to: this.link_to,
			doc_view: this.doc_view,
			color: this.color,
			restrict_to_domain: this.restrict_to_domain,
			stats_filter: this.stats_filter,
			type: this.type,
<<<<<<< HEAD
=======
			url: this.url,
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
		};
	}

	setup_events() {
		this.widget.click((e) => {
			if (this.in_customize_mode) return;

			let route = frappe.utils.generate_route({
				route: this.route,
				name: this.link_to,
				type: this.type,
				is_query_report: this.is_query_report,
				doctype: this.ref_doctype,
				doc_view: this.doc_view,
			});

			let filters = frappe.utils.get_filter_from_json(this.stats_filter);
			if (this.type == "DocType" && filters) {
				frappe.route_options = filters;
			}

			if (e.ctrlKey || e.metaKey) {
				frappe.open_in_new_tab = true;
			}

<<<<<<< HEAD
=======
			if (this.type == "URL") {
				if (frappe.open_in_new_tab) {
					window.open(this.url, "_blank");
					frappe.open_in_new_tab = false;
				} else {
					window.location.href = this.url;
				}
				return;
			}

>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
			frappe.set_route(route);
		});
	}

	set_actions() {
		if (this.in_customize_mode) return;

<<<<<<< HEAD
		this.widget.addClass("shortcut-widget-box p-3");
=======
		this.widget.addClass("shortcut-widget-box");
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)

		let filters = frappe.utils.get_filter_from_json(this.stats_filter);
		if (this.type == "DocType" && filters) {
			frappe.db
				.count(this.link_to, {
					filters: filters,
				})
				.then((count) => this.set_count(count));
		}
	}

	set_count(count) {
		const get_label = () => {
			if (this.format) {
				return __(this.format).replace(/{}/g, count);
			}
			return count;
		};

		this.action_area.empty();
		const label = get_label();
		let color = this.color && count ? this.color.toLowerCase() : "gray";
		$(`<div class="indicator-pill ellipsis ${color}">${label}</div>`).appendTo(
			this.action_area
		);
	}
}
