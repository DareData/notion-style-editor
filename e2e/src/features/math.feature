Feature: Math

	Scenario: adds a new math block
		Given I open the editor page
		When I click on "math" icon in menu bar
		Then I check that editor contains math
		When I click "Retrieve Editor's text" button
		Then I check that editor retrieved text contains "$$ $$" value