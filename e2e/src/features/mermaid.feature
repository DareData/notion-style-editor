Feature: Mermaid

	Scenario: adds a new mermaid block
		Given I open the editor page
		When I click on "mermaid" icon in menu bar
		Then I check that editor contains mermaid