Feature: Link

	Scenario: adds a new link
		Given I open the editor page
		When I click on "link" icon in menu bar
		And I fill link text input with "facebook" text
		And I fill link href input with "https://facebook.com" text
		And I click "Save" button
		Then I check that editor contains "facebook" link with "https://facebook.com" href attribute
		When I click "Retrieve Editor's text" button
		Then I check that editor retrieved text contains "[facebook](https://facebook.com)" value
	
	Scenario: removes link
		Given I set initial editor value to "[facebook](https://facebook.com)"
		When I open the editor page
		Then I check that editor contains "facebook" link with "https://facebook.com" href attribute
		When I click on "facebook" link
		And I open edit link modal
		And I click "Remove link" button
		Then I check that editor does not contain "https://facebook.com" link
		When I click "Retrieve Editor's text" button
		Then I check that editor retrieved text contains "" value

	Scenario: edits link
		Given I set initial editor value to "[facebook](https://facebook.com)"
		When I open the editor page
		Then I check that editor contains "facebook" link with "https://facebook.com" href attribute
		When I click on "facebook" link
		And I open edit link modal
		When I fill link text input with "youtube" text
		And I fill link href input with "https://youtube.com" text
		And I click "Save" button
		Then I check that editor contains "youtube" link with "https://youtube.com" href attribute
		When I click "Retrieve Editor's text" button
		Then I check that editor retrieved text contains "[youtube](https://youtube.com)" value
		
