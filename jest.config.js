module.exports = {
	preset: "ts-jest",
	moduleNameMapper: {
		"@components/(.*)$": "<rootDir>/src/components/$1",
		"@/(.*)$": "<rootDir>/src/$1",
		"^.+\\.(css|less|scss)$": "babel-jest",
		"^axios$": "axios/dist/node/axios.cjs",
	},

	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	modulePaths: ["<rootDir>"],
	testEnvironment: "jsdom",
};
