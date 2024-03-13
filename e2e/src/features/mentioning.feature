Feature: Mentioning

	Scenario: transforms mentioning node into link
		Given I open the editor page
		When I type "@Em" value to the editor
		Then I check that mentioning list dropdown contains "Emma,Emily" options
		When I select "Emily" value from mentioning list dropdown
		When I click "Retrieve Editor's text" button
		Then I check that editor retrieved text contains "[@Emily](https://test/user/Emily)" value
