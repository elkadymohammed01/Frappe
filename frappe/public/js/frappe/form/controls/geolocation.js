frappe.provide("frappe.utils.utils");

frappe.ui.form.ControlGeolocation = class ControlGeolocation extends frappe.ui.form.ControlData {
	static horizontal = false;

	async make() {
<<<<<<< HEAD
		await frappe.require(this.required_libs);
		super.make();
	}

	make_wrapper() {
		// Create the elements for map area
		super.make_wrapper();

		let $input_wrapper = this.$wrapper.find(".control-input-wrapper");
		this.map_id = frappe.dom.get_unique_id();
		this.map_area = $(
			`<div class="map-wrapper border">
				<div id="` +
				this.map_id +
				`" style="min-height: 400px; z-index: 1; max-width:100%"></div>
			</div>`
		);
		this.map_area.prependTo($input_wrapper);
		this.$wrapper.find(".control-input").addClass("hidden");

		if (this.frm) {
			this.make_map();
		} else {
			$(document).on("frappe.ui.Dialog:shown", () => {
				this.make_map();
=======
		super.make();
		$(this.input_area).addClass("hidden");
	}

	set_disp_area(value) {
		// Create the elements for map area
		if (!this.disp_area) {
			return;
		}

		this.map_id = frappe.dom.get_unique_id();
		this.map_area = $(
			`<div class="map-wrapper border">
				<div id="${this.map_id}" style="min-height: 400px; z-index: 1; max-width:100%"></div>
			</div>`
		);

		$(this.disp_area).html(this.map_area);
		$(this.disp_area).removeClass("like-disabled-input");
		$(this.disp_area).css("display", "block");

		if (this.frm) {
			this.make_map(value);
		} else {
			$(document).on("frappe.ui.Dialog:shown", () => {
				this.make_map(value);
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
			});
		}
	}

<<<<<<< HEAD
	make_map() {
		this.bind_leaflet_map();
		this.bind_leaflet_draw_control();
		this.bind_leaflet_locate_control();
		this.bind_leaflet_refresh_button();
		this.map.setView(frappe.utils.map_defaults.center, frappe.utils.map_defaults.zoom);
	}

	format_for_input(value) {
		if (!this.map) return;
		// render raw value from db into map
		this.clear_editable_layers();
		if (value) {
			var data_layers = new L.FeatureGroup().addLayer(
				L.geoJson(JSON.parse(value), {
					pointToLayer: function (geoJsonPoint, latlng) {
						if (geoJsonPoint.properties.point_type == "circle") {
							return L.circle(latlng, { radius: geoJsonPoint.properties.radius });
						} else if (geoJsonPoint.properties.point_type == "circlemarker") {
							return L.circleMarker(latlng, {
								radius: geoJsonPoint.properties.radius,
							});
						} else {
							return L.marker(latlng);
						}
					},
				})
			);
			this.add_non_group_layers(data_layers, this.editableLayers);
			try {
				this.map.fitBounds(this.editableLayers.getBounds(), {
					padding: [50, 50],
				});
			} catch (err) {
				// suppress error if layer has a point.
			}
			this.editableLayers.addTo(this.map);
		} else {
			this.map.setView(frappe.utils.map_defaults.center, frappe.utils.map_defaults.zoom);
		}
		this.map.invalidateSize();
	}

	bind_leaflet_map() {
		var circleToGeoJSON = L.Circle.prototype.toGeoJSON;
		L.Circle.include({
			toGeoJSON: function () {
				var feature = circleToGeoJSON.call(this);
=======
	make_map(value) {
		this.bind_leaflet_map();
		if (this.disabled) {
			this.map.dragging.disable();
			this.map.touchZoom.disable();
			this.map.doubleClickZoom.disable();
			this.map.scrollWheelZoom.disable();
			this.map.boxZoom.disable();
			this.map.keyboard.disable();
			this.map.zoomControl.remove();
		} else {
			this.bind_leaflet_draw_control();
			this.bind_leaflet_event_listeners();
			this.bind_leaflet_locate_control();
			this.bind_leaflet_data(value);
		}
	}

	bind_leaflet_data(value) {
		/* render raw value from db into map */
		if (!this.map || !value) {
			return;
		}
		this.clear_editable_layers();

		const data_layers = new L.FeatureGroup().addLayer(
			L.geoJson(JSON.parse(value), { pointToLayer: this.point_to_layer })
		);
		this.add_non_group_layers(data_layers, this.editableLayers);
		this.editableLayers.addTo(this.map);
		this.fit_and_recenter_map();
	}

	/**
	 * Defines custom rules for how geoJSON data is rendered on the map.
	 *
	 * @param {Object} geoJsonPoint - The geoJSON object to be rendered on the map.
	 * @param {Object} latlng - The latitude and longitude where the geoJSON data should be rendered on the map.
	 * @returns {Object} - Returns the Leaflet layer object to be rendered on the map.
	 */
	point_to_layer(geoJsonPoint, latlng) {
		// Custom rules for how geojson data is rendered on the map
		if (geoJsonPoint.properties.point_type == "circle") {
			return L.circle(latlng, { radius: geoJsonPoint.properties.radius });
		} else if (geoJsonPoint.properties.point_type == "circlemarker") {
			return L.circleMarker(latlng, { radius: geoJsonPoint.properties.radius });
		} else {
			return L.marker(latlng);
		}
	}

	bind_leaflet_map() {
		const circleToGeoJSON = L.Circle.prototype.toGeoJSON;
		L.Circle.include({
			toGeoJSON: function () {
				const feature = circleToGeoJSON.call(this);
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
				feature.properties = {
					point_type: "circle",
					radius: this.getRadius(),
				};
				return feature;
			},
		});

		L.CircleMarker.include({
			toGeoJSON: function () {
<<<<<<< HEAD
				var feature = circleToGeoJSON.call(this);
=======
				const feature = circleToGeoJSON.call(this);
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
				feature.properties = {
					point_type: "circlemarker",
					radius: this.getRadius(),
				};
				return feature;
			},
		});

		L.Icon.Default.imagePath = "/assets/frappe/images/leaflet/";
		this.map = L.map(this.map_id);
<<<<<<< HEAD
=======
		this.map.setView(frappe.utils.map_defaults.center, frappe.utils.map_defaults.zoom);
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)

		L.tileLayer(frappe.utils.map_defaults.tiles, frappe.utils.map_defaults.options).addTo(
			this.map
		);
<<<<<<< HEAD
=======

		this.editableLayers = new L.FeatureGroup();
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
	}

	bind_leaflet_locate_control() {
		// To request location update and set location, sets current geolocation on load
		this.locate_control = L.control.locate({ position: "topright" });
		this.locate_control.addTo(this.map);
	}

	bind_leaflet_draw_control() {
<<<<<<< HEAD
		this.editableLayers = new L.FeatureGroup();

		var options = {
=======
		if (
			!frappe.perm.has_perm(this.doctype, this.df.permlevel, "write", this.doc) ||
			this.df.read_only
		) {
			return;
		}

		this.map.addControl(this.get_leaflet_controls());
	}

	get_leaflet_controls() {
		return new L.Control.Draw({
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
			position: "topleft",
			draw: {
				polyline: {
					shapeOptions: {
						color: frappe.ui.color.get("blue"),
						weight: 10,
					},
				},
				polygon: {
					allowIntersection: false, // Restricts shapes to simple polygons
					drawError: {
						color: frappe.ui.color.get("orange"), // Color the shape will turn when intersects
						message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
					},
					shapeOptions: {
						color: frappe.ui.color.get("blue"),
					},
				},
				circle: true,
				rectangle: {
					shapeOptions: {
						clickable: false,
					},
				},
			},
			edit: {
				featureGroup: this.editableLayers, //REQUIRED!!
				remove: true,
			},
<<<<<<< HEAD
		};

		// create control and add to map
		this.drawControl = new L.Control.Draw(options);
		this.map.addControl(this.drawControl);

=======
		});
	}

	bind_leaflet_event_listeners() {
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
		this.map.on("draw:created", (e) => {
			var type = e.layerType,
				layer = e.layer;
			if (type === "marker") {
				layer.bindPopup("Marker");
			}
			this.editableLayers.addLayer(layer);
			this.set_value(JSON.stringify(this.editableLayers.toGeoJSON()));
		});

		this.map.on("draw:deleted draw:edited", (e) => {
<<<<<<< HEAD
			var layer = e.layer;
=======
			const { layer } = e;
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
			this.editableLayers.removeLayer(layer);
			this.set_value(JSON.stringify(this.editableLayers.toGeoJSON()));
		});
	}

<<<<<<< HEAD
	bind_leaflet_refresh_button() {
		L.easyButton({
			id: "refresh-map-" + this.df.fieldname,
			position: "topright",
			type: "replace",
			leafletClasses: true,
			states: [
				{
					stateName: "refresh-map",
					onClick: function (button, map) {
						map._onResize();
					},
					title: "Refresh map",
					icon: "fa fa-refresh",
				},
			],
		}).addTo(this.map);
	}

=======
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
	add_non_group_layers(source_layer, target_group) {
		// https://gis.stackexchange.com/a/203773
		// Would benefit from https://github.com/Leaflet/Leaflet/issues/4461
		if (source_layer instanceof L.LayerGroup) {
			source_layer.eachLayer((layer) => {
				this.add_non_group_layers(layer, target_group);
			});
		} else {
			target_group.addLayer(source_layer);
		}
	}

	clear_editable_layers() {
		this.editableLayers.eachLayer((l) => {
			this.editableLayers.removeLayer(l);
		});
	}

<<<<<<< HEAD
	get required_libs() {
		return [
			"assets/frappe/js/lib/leaflet_easy_button/easy-button.css",
			"assets/frappe/js/lib/leaflet_control_locate/L.Control.Locate.css",
			"assets/frappe/js/lib/leaflet_draw/leaflet.draw.css",
			"assets/frappe/js/lib/leaflet/leaflet.css",
			"assets/frappe/js/lib/leaflet/leaflet.js",
			"assets/frappe/js/lib/leaflet_easy_button/easy-button.js",
			"assets/frappe/js/lib/leaflet_draw/leaflet.draw.js",
			"assets/frappe/js/lib/leaflet_control_locate/L.Control.Locate.js",
		];
=======
	fit_and_recenter_map() {
		// Spread map across the wrapper, recenter and zoom w.r.t bounds
		try {
			this.map.invalidateSize();
			this.map.fitBounds(this.editableLayers.getBounds(), {
				padding: [50, 50],
			});
		} catch (err) {
			// suppress error if layer has a point.
		}
	}

	on_section_collapse(hide) {
		!hide && this.fit_and_recenter_map();
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
	}
};
