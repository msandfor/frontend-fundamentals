const pa11y = require('pa11y'),
fs = require('file-system')

const runTest = async () => {
	const results = await Promise.all([
		// Test Homepage
		pa11y(`http://localhost:8080`, {
			standard: 'WCAG2AAA',
			screenCapture: `${__dirname}/results/blog_home_desktop.png`
		}),
		// Test Homepage mobile
		pa11y(`http://localhost:8080`, {
			standard: 'WCAG2AAA',
			screenCapture: `${__dirname}/results/blog_home_mobile.png`,
			viewport: {
				width: 320,
				height: 480,
			}
		}),
		// Test Blog Post Code
		pa11y(`https://blog.amyskapers.dev/generating-ssl-certificates/`, {
			standard: 'WCAG2AAA',
			screenCapture: `${__dirname}/results/blog_post_code.png`
		}),
		// Test Blog Post Images
		pa11y(`https://blog.amyskapers.dev/fixing-spam-on-wordpress/`, {
			standard: 'WCAG2AAA',
			screenCapture: `${__dirname}/results/blog_post_images.png`
		}),
	]).catch(err => console.log(err))

	// console.log(results)
	fs.writeFile(`tests/results/pa11y.json`, JSON.stringify(results), err => console.log(err))
}

runTest()