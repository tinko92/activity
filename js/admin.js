$(document).ready(function() {
	function saveSettings() {
		OC.msg.startSaving('#activity_notifications_msg');
		var post = $('#activity_notifications').serialize();

		$.post(OC.generateUrl('/apps/activity/settings/admin'), post, function(response) {
			OC.msg.finishedSuccess('#activity_notifications_msg', response.data.message);
		});
	}

	var $activityNotifications = $('#activity_notifications');
	$activityNotifications.find('input[type=checkbox]').change(saveSettings);

	$activityNotifications.find('select').change(saveSettings);

	$activityNotifications.find('.activity_select_group').click(function() {
		var $selectGroup = '#activity_notifications .' + $(this).attr('data-select-group');
		var $filteredBoxes = $($selectGroup).not(':disabled');
		var $checkedBoxes = $filteredBoxes.filter(':checked').length;

		$filteredBoxes.prop('checked', true);
		if ($checkedBoxes === $filteredBoxes.filter(':checked').length) {
			// All values were already selected, so invert it
			$filteredBoxes.prop('checked', false);
		}

		saveSettings();
	});

	$('#activity_email_enabled').on('change', function() {
		OCP.AppConfig.setValue(
			'activity', 'enable_email',
			$(this).attr('checked') === 'checked' ? 'yes' : 'no'
		);
	});

	$('#activity_webhook_enabled').on('change', function() {
		OCP.AppConfig.setValue(
			'activity', 'enable_webhook',
			$(this).attr('checked') === 'checked' ? 'yes' : 'no'
		);
	});

	$('#activity_webhook_ssl_verification').on('change', function() {
		OCP.AppConfig.setValue(
			'activity', 'webhook_ssl_verification_enabled',
			$(this).attr('checked') === 'checked' ? 'yes' : 'no'
		);
	});

	$('#webhook_settings_form').on('submit', function(event) {
		event.preventDefault();
		OCP.AppConfig.setValue(
			'activity', 'webhook_url',
			$("#webhook_url").val()
		);
		OCP.AppConfig.setValue(
			'activity', 'webhook_token',
			$("#webhook_token").val()
		);
	});
});
