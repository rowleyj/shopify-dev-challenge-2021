module.exports = {
	extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        // 'plugin:vue/recommended'
		'plugin:vue/base'
    ],
	rules: {
        "indent": [
            "error",
            "tab"
        ],
        "vue/html-indent": [
            "error",
            "tab"
        ],
        "vue/no-v-html": "error",
        "vue/require-default-prop": "error",
        // "vue/html-quotes": ["error", "double"],
        "vue/no-unused-vars": "error",
        "vue/max-attributes-per-line": [
            "error",
            {
                "singleline": 1,
                "multiline": {
                    "max": 1,
                    "allowFirstLine": false
                }
            }
        ],
        "vue/name-property-casing": [
            "error",
            "PascalCase"
        ],
        "vue/prop-name-casing": [
            "error",
            "camelCase"
        ],
        "vue/v-bind-style": [
            "error",
            "shorthand"
        ],
        "vue/v-on-style": [
            "error",
            "shorthand"
        ],
        "vue/this-in-template": [
            "error",
            "never"
        ],
        // note that we use alphabetical order since it is way easier to debug
        "vue/order-in-components": [
            "error",
            {
                "order": [
                    "computed",
                    [
                        "components",
                        "directives",
                        "filters"
                    ],
                    [
                        "delimiters",
                        "comments"
                    ],
                    "data",
                    "el",
                    "extends",
                    "functional",
                    "inheritAttrs",
                    "LIFECYCLE_HOOKS",
                    "methods",
                    "mixins",
                    "model",
                    "name",
                    "parent",
                    [
                        "props",
                        "propsData"
                    ],
                    [
                        "template",
                        "render"
                    ],
                    "renderError",
                    "watch",
                ]
            }
        ]
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
    }
}