Feature: Table

	Scenario: adds a new table and removes it
		Given I open the editor page
		When I click on "table" icon in menu bar
		Then I check that editor contains table
		And I check that table contains "3" rows
		And I check that table contains "3" columns
		When I click on the table
		And I click on table heading tooltip
		And I click on remove table button
		Then I check that editor does not contain table

	Scenario: adds a new table and remove row and column
		Given I open the editor page
		When I click on "table" icon in menu bar
		Then I check that editor contains table
		And I check that table contains "3" rows
		And I check that table contains "3" columns
		When I click on the table
		And I click on table row tooltip at "1"
		And I click on remove table button
		And I click on the table
		And I click on table column tooltip at "1"
		And I click on remove table button
		Then I check that table contains "2" rows
		Then I check that table contains "2" columns
