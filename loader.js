/**
 * A loader class to show a modal loading indicator
 * above the current context.
 * 
 * Author: Hans Knöchel
 * 
 */
export default class Loader {

	/**
	 * The constructor of the loading indicator. It
	 * configures the native API's based on the platform.
	 * @param {Object} options The options passed to the loader.
	 * @param {Titanium.UI.View} options.view The view to show the loader on (iOS only, required)
	 * @param {String} options.title The title to show on the loader (optional). 
	 */
	constructor(options = { }) {
		this.view = options.view || new Error('Missing required "view" parameter');
		this.title = options.title || L('loading', 'Loading …');

		if (this.isAndroid) {
			this.activityIndicator = Ti.UI.Android.createProgressIndicator({
				message: this.title,
				location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
				type: Ti.UI.Android.PROGRESS_INDICATOR_INDETERMINANT,
				cancelable: false
			});
		} else {
			this.containerView = Ti.UI.createView({ backgroundColor: '#55000000', opacity: 0.0 });
			const indicatorView = Ti.UI.iOS.createBlurView({
				effect: Ti.UI.iOS.BLUR_EFFECT_STYLE_LIGHT,
				width: 200,
				height: 150,
				borderRadius: 20
			});

			this.activityIndicator = Ti.UI.createActivityIndicator({
				style: Ti.UI.ActivityIndicatorStyle.BIG,
				indicatorColor: '#000',
				opacity: 0.8,
				top: 40
			});

			const label = Ti.UI.createLabel({
				text: this.title,
				bottom: 30,
				font: {
					fontWeight: 'bold',
					fontSize: 20
				},
				opacity: 0.8
			});

			indicatorView.add(this.activityIndicator);
			indicatorView.add(label);
			this.containerView.add(indicatorView);

			this.view.add(this.containerView);
		}
	}

	/**
	 * A utility getter to determine if we are on Android or not.
	 * 
	 * @return {Boolean} Whether or not the current process runs on Android or not.
	 */
	get isAndroid() {
		return Ti.Platform.osname === 'android';
	}

	/**
	 * Shows the loader. On iOS, it uses a animation to fade in
	 * the parent view before showing the actual loader.
	 */
	show() {
		this.activityIndicator.show();

		if (!this.isAndroid) {
			this.containerView.animate({
				opacity: 1.0
			});
		}
	}

	/**
	 * Hides the loader. On iOS, it uses a animation to fade out
	 * the parent view before hiding the actual loader.
	 */
	hide() {
		this.activityIndicator.hide();

		if (!this.isAndroid) {
			this.containerView.animate({
				opacity: 0.0
			}, () => {
				this.view.remove(this.containerView);
			});
		}
	}
}
