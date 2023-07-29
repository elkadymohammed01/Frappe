import click


def execute():
	click.secho(
		"Event Streaming is moved to a separate app in version 15.\n"
<<<<<<< HEAD
		"When upgrading to Ehsan version-15, Please install the 'Event Streaming' app to continue using them: https://github.com/frappe/event_streaming",
=======
		"When upgrading to Frappe version-15, Please install the 'Event Streaming' app to continue using them: https://github.com/frappe/event_streaming",
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
		fg="yellow",
	)
