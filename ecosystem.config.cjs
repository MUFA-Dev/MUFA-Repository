module.exports = {
	apps: [
		{
			name: "MUFA_backend",
			script: "npm",
			args: "start",
			env: {
				NODE_ENV: "production",
				PORT: 3000,
			},
		},
	],
};
