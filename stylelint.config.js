module.exports = {
	"extends": "stylelint-config-standard",
	"rules": {
		"indentation": "tab",
		"font-family-name-quotes": "always-unless-keyword",
		//"declaration-block-properties-order": ...
		// Since we're using autoprefixer
		"at-rule-no-vendor-prefix": true,
		"media-feature-name-no-vendor-prefix": true,
		"property-no-vendor-prefix": true,
		"selector-no-vendor-prefix": true,
		"value-no-vendor-prefix": true,
		"no-browser-hacks": true,
		//"custom-property-empty-line-before": false, // I wish this worked
		//"comment-empty-line-before": false
	}
};
