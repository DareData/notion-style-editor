Feature: Code block

	Scenario: adds a new code block
		Given I open the editor page
		When I click on "code_block" icon in menu bar
		Then I check that editor contains code block
		When I click "Retrieve Editor's text" button
		Then I check that editor retrieved text contains "``` ```" value

	Scenario: renders code block value
		Given I set initial editor value to "```\\nfunction main() { console.log('Hello milkdown!'); }\n```"
		When I open the editor page
		Then I check that editor contains code block
		And I check that code block contains "function main() { console.log('Hello milkdown!'); }" value
		When I click "Retrieve Editor's text" button
		Then I check that editor retrieved text contains "```\ function main() { console.log('Hello milkdown!'); } ```" value
