/** @type {import('jest').Config} */
const config = { 
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	coverageThreshold:{
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: -20,
		}
	},    
};

module.exports = config;
