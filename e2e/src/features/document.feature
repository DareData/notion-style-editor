Feature: Documents

	Background:
		Given I open the editor page

	Scenario: adds a new image
		When I click on "document" icon in menu bar
		And I fill add document url input with "https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" text
		And I click "Upload" button
		Then I check, if image node contains "https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" source value
		When I click "Retrieve Editor's text" button
		Then I check that editor retrieved text contains "![](https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg)" value

	Scenario: adds a new file
		When I click on "document" icon in menu bar
		And I fill add document url input with "https://www.africau.edu/images/default/sample.pdf" text
		And I click "Upload" button
		Then I check, if file node contains "sample.pdf" text
		When I click "Retrieve Editor's text" button
		Then I check that editor retrieved text contains "![](https://www.africau.edu/images/default/sample.pdf)" value