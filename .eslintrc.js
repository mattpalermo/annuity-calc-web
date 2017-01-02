module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"rules": {
		"indent": ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"brace-style": ["error", "1tbs", {"allowSingleLine": true}],
		"keyword-spacing": ["error", {"before": true, "after": true}],
		"func-call-spacing": ["error", "never"],
		"space-before-blocks": ["error", "always"],
		"strict": ["error", "global"],
		"no-var": ["error"]
	}
};
